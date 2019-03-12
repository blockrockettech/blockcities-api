const _ = require('lodash');

const blockcitiesContractService = require('../services/blockcities.contract.service');
const specialMapping = require('./special-data-mapping');

module.exports = {

    async tokenPointers (request, response) {
        const network = request.params.network;
        const tokenPointers = await blockcitiesContractService.tokenPointers(network);
        console.log(tokenPointers);
        return response.status(200).json(tokenPointers);
    },

    async _metadata (network, tokenId) {

        const tokenBaseURI = await blockcitiesContractService.tokenBaseURI(network);
        const tokenAttrs = await blockcitiesContractService.tokenAttributes(network, tokenId);

        if (tokenAttrs._special.toNumber() !== 0) {
            return {
                name: `${specialMapping[tokenAttrs._special.toNumber()].name}`,
                description: `${specialMapping[tokenAttrs._special.toNumber()].city}`,
                image: `${tokenBaseURI[0]}${tokenId}/image`
            };
        }

        return {
            name: `building ${tokenId}`,
            description: `building ${tokenId}`,
            image: `${tokenBaseURI[0]}${tokenId}/image`
        };
    },

    async tokenMetadata (request, response) {

        const tokenId = request.params.tokenId;
        const network = request.params.network;

        return response.status(200).json(this._metadata(network, tokenId));
    },

    async lookupTokenDetails (request, response) {

        const tokenId = request.params.tokenId;
        const network = request.params.network;

        const tokenDetails = await blockcitiesContractService.tokenDetails(network, tokenId);
        const metaData = await this._metadata(network, tokenId);

        return response.status(200).json({...tokenDetails, ...metaData, tokenId});
    },

    async lookupTokenDetailsForOwner (request, response) {

        const owner = request.params.owner;
        const network = request.params.network;

        const tokens = await blockcitiesContractService.tokensOfOwner(network, owner);

        const mappedTokens = await Promise.all(_.map(tokens[0], async (t) => {
            const tokenDetails = await blockcitiesContractService.tokenDetails(network, t);
            const metaData = await this._metadata(network, t);

            return {...tokenDetails, ...metaData, tokenId: t};
        }));

        return response.status(200).json(mappedTokens);
    }
};
