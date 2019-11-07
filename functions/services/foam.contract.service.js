const {
    connectToFoamMainnet,
} = require('./abi/networks');

const axios = require('axios');

const dot = (ethAccount) => ethAccount.substr(0, 4) + '...' + ethAccount.substr(ethAccount.length - 4, ethAccount.length);

const TOTAL_FOAM_TREASURE_HUNT_BUILDINGS = 10;

class FoamContractService {

    async tokensOfOwner(network = 1, owner) {
        const token = connectToFoamMainnet();

        const ownerPromises = [];
        for (let i = 1; i <= TOTAL_FOAM_TREASURE_HUNT_BUILDINGS; i++) {
            ownerPromises.push(token.ownerOf(i));
        }

        let ownerArray = await Promise.all(ownerPromises);

        let myFoamBuildings = ownerArray.filter(foamBuilding => owner.toLowerCase() === foamBuilding[0].toLowerCase());

        if (myFoamBuildings.length > 0) {
            myFoamBuildings = myFoamBuildings.map(async (foamBuilding, index) => {
                const tokenId = index + 1;
                const tokenUri = (await token.tokenURI(tokenId))[0];
                const ipfs = (await axios.get(tokenUri)).data;
                return {
                    tokenId: tokenId,
                    owner: foamBuilding[0],
                    ownerShort: dot(foamBuilding[0]),
                    tokenUri: tokenUri,
                    ipfs: ipfs,
                    bcUri: `https://www.blockcities.co/building-0-${tokenId}?owner=${dot(foamBuilding[0])}`,
                }
            });

            return Promise.all(myFoamBuildings);
        }

        return [];
    }

}

module.exports = new FoamContractService();
