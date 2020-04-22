const {
    connectToBlockCities,
    connectToBlockCitiesWebSocketWeb3,
    connectToCityBuildingValidator,
    getBlockCitiesNftDeploymentBlockForNetwork,
    web3HttpInstance
} = require('./abi/networks');

const {ethers, utils} = require('ethers');
const {getWallet} = require('./provider');

const contracts = require('blockcities-contract-artifacts').contracts;

const moment = require('moment');

class BlockcitiesContractService {

    async tokenBaseURI(network = 1) {
        console.log(`Find base token URI on network [${network}]`);

        const token = connectToBlockCities(network);
        const tokenBaseURI = await token.tokenBaseURI();
        return tokenBaseURI;
    }

    async tokenPointers(network = 1) {
        const token = connectToBlockCities(network);
        const totalBuildings = await token.totalBuildings();
        const tokenIdPointer = await token.tokenIdPointer();

        return {
            totalBuildings: totalBuildings[0],
            tokenIdPointer: tokenIdPointer[0]
        };
    }

    async tokensOfOwner(network = 1, owner) {
        const token = connectToBlockCities(network);
        const tokensOfOwner = await token.tokensOfOwner(owner);

        return tokensOfOwner;
    }

    async ownerOfToken(network = 1, tokenId) {
        const token = connectToBlockCities(network);
        const owner = await token.ownerOf(tokenId);

        return owner[0];
    }

    async tokenDetails(network = 1, tokenId) {
        console.log(`Find token details for [${tokenId}] on network [${network}]`);

        const token = connectToBlockCities(network);

        // Get token attributes
        const {
            _exteriorColorway,
            _backgroundColorway,
            _city,
            _building,
            _base,
            _body,
            _roof,
            _special,
            _architect
        } = await token.attributes(tokenId);

        // Build full details response
        return {
            exteriorColorway: _exteriorColorway.toNumber(),
            backgroundColorway: _backgroundColorway.toNumber(),
            city: _city.toNumber(),
            building: _building.toNumber(),
            base: _base.toNumber(),
            body: _body.toNumber(),
            roof: _roof.toNumber(),
            special: _special.toNumber(),
            architect: _architect,
            tokenId: tokenId,
        };
    }

    async birthEventForToken(network, tokenId) {
        console.log(`Finding birth event for token [${tokenId}] on network [${network}]`);

        const contract = connectToBlockCitiesWebSocketWeb3(network);
        const web3Instance = web3HttpInstance(network);
        const deploymentBlock = getBlockCitiesNftDeploymentBlockForNetwork(network);

        return new Promise((resolve, reject) => {

            const handler = function (error, events) {
                if (!error) {
                    // console.log(events);
                    if (events.length !== 1) {
                        reject(new Error(`Found multiple BuildingMinted events for token ID [${tokenId}]`));
                    } else {
                        const creationEvent = events[0];

                        // We need to then look up block to get a valid timestamp
                        web3Instance.eth.getBlock(creationEvent.blockNumber)
                            .then((block) => {
                                resolve({
                                    blockNumber: creationEvent.blockNumber,
                                    blockHash: creationEvent.blockHash,
                                    transactionHash: creationEvent.transactionHash,
                                    blockTimestamp: block.timestamp,
                                    blockTimestampPretty: moment.unix(block.timestamp).format('MMM. D YYYY'),
                                });
                            });
                    }
                } else {
                    console.log(error);
                    reject(error);
                }
            };

            contract.getPastEvents(
                'BuildingMinted',
                {
                    filter: {
                        _tokenId: tokenId
                    },
                    fromBlock: deploymentBlock,
                    toBlock: 'latest'
                },
                handler
            );
        });
    }

    async validatorRotation(network) {
        try {
            console.log(`Finding rotation on network [${network}]`);

            const contract = connectToCityBuildingValidator(network);
            const buildingMappingsArray = await contract.buildingMappingsArray();
            const exteriorMappingsArray = await contract.exteriorMappingsArray();

            const promises = buildingMappingsArray[0].map(async (building) => {

                const buildingBaseMappingsArray = await contract.buildingBaseMappingsArray(building);
                const buildingBodyMappingsArray = await contract.buildingBodyMappingsArray(building);
                const buildingRoofMappingsArray = await contract.buildingRoofMappingsArray(building);

                return {
                    'building': building.toString(),
                    'base': buildingBaseMappingsArray['0'].map(val => val.toString()),
                    'body': buildingBodyMappingsArray['0'].map(val => val.toString()),
                    'roof': buildingRoofMappingsArray['0'].map(val => val.toString()),
                    'exteriors': exteriorMappingsArray['0'].map(val => val.toString()),
                };
            });

            return Promise.all(promises);
        } catch (e) {
            console.error(e);
        }
    }

    async updateRotation(network, rotation) {
        try {
            console.log(`Updating rotation on network [${network}]`);

            const address = contracts.addresses.CityBuildingValidator(network).address;
            const abi = contracts.addresses.CityBuildingValidator(network).abi;
            const signer = getWallet(network);

            const contract = new ethers.Contract(
                address,
                abi,
                signer,
            );

            return await contract.updateRotation(utils.bigNumberify(rotation), {
                gasLimit: 400000,
                gasPrice: 14000000000,
            });
        } catch (e) {
            console.error(e);
        }
    }

    async rotate(network) {
        try {
            console.log(`Updating rotation on network [${network}]`);

            // FIXME need this somewhere better...
            const rotationMappings = {};
            rotationMappings['4'] = 1;
            rotationMappings['1'] = 9;

            const contractEthJs = connectToCityBuildingValidator(network);
            const currentRotation = await contractEthJs.rotation();
            const currentRotationInt = parseInt(currentRotation[0].toString(10));

            console.log(`Current rotation ${currentRotationInt} on network [${network}]`);
            console.log(`Rotation max ${rotationMappings[network.toString()]} on network [${network}]`);
            let newRotationInt = currentRotationInt + 1;
            if (newRotationInt > rotationMappings[network.toString()]) {
               newRotationInt = 0;
            }
            console.log(`New rotation ${newRotationInt} on network [${network}]`);

            const address = contracts.addresses.CityBuildingValidator(network).address;
            const abi = contracts.addresses.CityBuildingValidator(network).abi;
            const signer = getWallet(network);

            const contract = new ethers.Contract(
                address,
                abi,
                signer,
            );

            console.log(`Rotating to ${newRotationInt} on network [${network}]`);
            return await contract.updateRotation(utils.bigNumberify(newRotationInt.toString()), {
                gasLimit: 100000,
                gasPrice: 14000000000, // 14 gwei
            });
        } catch (e) {
            console.error(e);
        }
    }
}


module.exports = new BlockcitiesContractService();
