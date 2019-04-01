const {connectToBlockCities} = require("./abi/networks");

const axios = require('axios');

const lookupMetadata = async (tokenUri) => {
    const tokenMeta = await axios.get(tokenUri);
    const meta = tokenMeta.data;
    return {
        tokenUri,
        ...meta
    };
};

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
        const cityPointer = await token.cityPointer();
        const tokenIdPointer = await token.tokenIdPointer();

        return {
            totalBuildings: totalBuildings[0],
            cityPointer: cityPointer[0],
            tokenIdPointer: tokenIdPointer[0]
        };
    }

    async tokensOfOwner(network = 1, owner) {
        const token = connectToBlockCities(network);
        const tokensOfOwner = await token.tokensOfOwner(owner);

        // console.log(tokensOfOwner);

        return tokensOfOwner;
    }

    async tokenAttributes(network = 1, tokenId) {
        console.log(`Find token attrs for [${tokenId}] on network [${network}]`);

        const token = connectToBlockCities(network);

        // Get token attributes
        const tokenAttrs = await token.attributes(tokenId);

        return {
            ...tokenAttrs
        };
    }


    async tokenDetails(network = 1, tokenId) {
        console.log(`Find token details for [${tokenId}] on network [${network}]`);

        const token = connectToBlockCities(network);

        // Get token attributes
        const {
            _exteriorColorway,
            _windowColorway,
            _city,
            _building,
            _base,
            _body,
            _roof,
            _special,
            _architect
        } = await token.attributes(tokenId);
        
        console.log('building', _building);

        // Get token URI
        const tokenURI = await token.tokenURI(tokenId);

        // Build full details response
        return {
            exteriorColorway: _exteriorColorway.toNumber(),
            windowColorway: _windowColorway.toNumber(),
            city: _city.toNumber(),
            building: _building.toNumber(),
            base: _base.toNumber(),
            body: _body.toNumber(),
            roof: _roof.toNumber(),
            special: _special.toNumber(),
            architect: _architect,
        };
    }

}


module.exports = new BlockcitiesContractService();
