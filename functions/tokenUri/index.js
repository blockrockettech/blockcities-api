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

    async tokenMetadata (request, response) {

        const tokenId = request.params.tokenId;
        if (!tokenId) {
            return response.status(400).json({
                failure: `Token ID not provided`
            });
        }

        const network = request.params.network;

        const tokenBaseURI = await blockcitiesContractService.tokenBaseURI(network);
        const tokenAttrs = await blockcitiesContractService.tokenAttributes(network, tokenId);

        if (tokenAttrs._special.toNumber() !== 0) {

            return response.status(200).json({
                name: `${specialMapping[tokenAttrs._special.toNumber()].name}`,
                description: `${specialMapping[tokenAttrs._special.toNumber()].city}`,
                image: `${tokenBaseURI[0]}${tokenId}/image`
            });
        }

        return response.status(200).json({
            name: `building ${tokenId}`,
            description: `building ${tokenId}`,
            image: `${tokenBaseURI[0]}${tokenId}/image`
        });
    },

    async lookupTokenDetails (request, response) {

        const tokenId = request.params.tokenId;
        if (!tokenId) {
            return response.status(400).json({
                failure: `Token ID not provided`
            });
        }

        const network = request.params.network;

        const tokenDetails = await blockcitiesContractService.tokenDetails(network, tokenId);
        console.log(tokenDetails);

        return response.status(200).json(tokenDetails);
    }
};
