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

        let myFoamBuildings = ownerArray.filter(foamBuilding => owner.toLowerCase() === foamBuilding[0].toLowerCase());
        if (myFoamBuildings.length > 0) {
            myFoamBuildings = myFoamBuildings.map(async (foamBuilding, index) => {

                const tokenUri = (await token.tokenURI((index + 1)))[0];
                console.log(tokenUri);
                const ipfs = (await axios.get(tokenUri)).data;
                console.log(ipfs);
                return {
                    tokenId: (index + 1),
                    owner: foamBuilding[0],
                    tokenUri: tokenUri,
                    ipfs: ipfs,
                }
            });

            return Promise.all(myFoamBuildings);
        }

        return [];
    }

}

module.exports = new FoamContractService();
