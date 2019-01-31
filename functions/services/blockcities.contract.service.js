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
        console.log(tokenBaseURI);
        return tokenBaseURI;
    }

    async tokenDetails(network = 1, tokenId) {
        console.log(`Find token details for [${tokenId}] on network [${network}]`);

        const token = connectToBlockCities(network);

        // Get token attributes
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

        // Get token URI
        const tokenURI = await token.tokenURI(tokenId);

        // Get metadata
        const metadata = await lookupMetadata(tokenURI[0]);

        // Build full details response
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
