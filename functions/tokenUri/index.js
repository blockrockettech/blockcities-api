const _ = require('lodash');

const blockcitiesContractService = require('../services/blockcities.contract.service');

module.exports = {

    // TODO switch network for multiple end points
    async tokenMetadata(network = 1, request, response) {

        const tokenId = request.params.tokenId;
        if (!tokenId) {
            return response.status(400).json({
                failure: `Token ID not provided`
            });
        }

        const tokenBaseURI = await blockcitiesContractService.tokenBaseURI(network);
        console.log(tokenBaseURI);

        return response.status(200).json({
            name: `building ${tokenId}`,
            description: `building ${tokenId}`,
            image: `${tokenBaseURI[0]}/${tokenId}/image`
        });
    },

    async lookupTokenDetails(network = 1, request, response) {

        const tokenId = request.params.tokenId;
        if (!tokenId) {
            return response.status(400).json({
                failure: `Token ID not provided`
            });
        }

        const tokenDetails = await blockcitiesContractService.tokenDetails(network, tokenId);
        console.log(tokenDetails);

        return response.status(200).json(tokenDetails);
    }
};
