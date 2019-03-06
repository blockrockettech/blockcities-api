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
        // console.log(tokenBaseURI);
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

    async tokenDetails(network = 1, tokenId) {
        console.log(`Find token details for [${tokenId}] on network [${network}]`);

        const token = connectToBlockCities(network);

        // Get token attributes
        const {
            _exteriorColorway,
            _windowColorway,
            _city,
            _base,
            _body,
            _roof,
            _special,
            _architect
        } = await token.attributes(tokenId);

        // Get token URI
        const tokenURI = await token.tokenURI(tokenId);
        console.log(tokenURI);

        // Get metadata
        const metadata = await lookupMetadata(tokenURI[0]);

        // Build full details response
        return {
            exteriorColorway: _exteriorColorway,
            windowColorway: _windowColorway,
            city: _city,
            base: _base,
            body: _body,
            roof: _roof,
            special: _special,
            architect: _architect,
            ...metadata
        };
    }

}


module.exports = new BlockcitiesContractService();
