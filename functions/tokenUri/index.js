const _ = require('lodash');

const blockcitiesContractService = require('../services/blockcities.contract.service');

module.exports = {

    async tokenPointers(request, response) {
        const network = request.params.network;
        const tokenPointers = await blockcitiesContractService.tokenPointers(network);
        console.log(tokenPointers);
        return response.status(200).json(tokenPointers);
    },

    async tokenMetadata(request, response) {

        const tokenId = request.params.tokenId;
        if (!tokenId) {
            return response.status(400).json({
                failure: `Token ID not provided`
            });
        }

        const network = request.params.network;

        const tokenBaseURI = await blockcitiesContractService.tokenBaseURI(network);
        console.log(tokenBaseURI);

        return response.status(200).json({
            name: `building ${tokenId}`,
            description: `building ${tokenId}`,
            image: `${tokenBaseURI[0]}/token/${tokenId}/image`
        });
    },

    async lookupTokenDetails(request, response) {

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
