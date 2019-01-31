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
        const token = connectToBlockCities(network);
        const tokenBaseURI = await token.tokenBaseURI();
        console.log(tokenBaseURI);
        return tokenBaseURI;
    }

    async tokenDetails(network = 1, tokenId) {
        console.log(`looking up:`, tokenId);

        const token = connectToBlockCities(network);

        // get token attributes
        const {
            _city,
            _base,
            _baseExteriorColorway,
            _baseWindowColorway,
            _body,
            _bodyExteriorColorway,
            _bodyWindowColorway,
            _roof,
            _roofExteriorColorway,
            _roofWindowColorway,
            _architect
        } = await token.attributes(tokenId);

        // get token URI
        const tokenURI = await token.tokenURI(tokenId);
        console.log("tokenURI", tokenURI);

        // get metadata
        const metadata = await lookupMetadata(tokenURI[0]);
        console.log("metadata", metadata);

        return {
            city: _city,
            base: _base,
            baseExteriorColorway: _baseExteriorColorway,
            baseWindowColorway: _baseWindowColorway,
            body: _body,
            bodyExteriorColorway: _bodyExteriorColorway,
            bodyWindowColorway: _bodyWindowColorway,
            roof: _roof,
            roofExteriorColorway: _roofExteriorColorway,
            roofWindowColorway: _roofWindowColorway,
            architect: _architect,
            ...metadata
        };
    }

}


module.exports = new BlockcitiesContractService();
