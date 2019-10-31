const {
    connectToFoamMainnet,
} = require('./abi/networks');

const axios = require('axios');

const TOTAL_FOAM_TREASURE_HUNT_BUILDINGS = 10;

class FoamContractService {

    async tokensOfOwner(network = 1, owner) {
        const token = connectToFoamMainnet();

        const ownerPromises = [];
        for (let i = 1; i <= TOTAL_FOAM_TREASURE_HUNT_BUILDINGS; i++) {
            ownerPromises.push(token.ownerOf(i));
        }

        let ownerArray = await Promise.all(ownerPromises);

        const uriPromises = [];
        for (let i = 1; i <= TOTAL_FOAM_TREASURE_HUNT_BUILDINGS; i++) {
            uriPromises.push(token.tokenURI(i));
        }

        let uriArray = await Promise.all(uriPromises);

        const ipfsPromises = [];
        for (let i = 1; i <= TOTAL_FOAM_TREASURE_HUNT_BUILDINGS; i++) {
            ipfsPromises.push(axios.get(uriArray[i - 1][0]));
        }

        let ipfsPromisesArray = await Promise.all(ipfsPromises);

        ownerArray = ownerArray.map((value, index) => {
            return {
                tokenId: (index + 1),
                owner: value[0],
                tokenUri: uriArray[index][0],
                ipfs: ipfsPromisesArray[index].data,
            };
        });

        return ownerArray;
    }

}

module.exports = new FoamContractService();
