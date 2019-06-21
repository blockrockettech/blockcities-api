const _ = require('lodash');

const blockCitiesDataService = require('../../services/blockcities.data.service');
const openSeaService = require('../../services/openSea.service');

module.exports = {

    async tokenPointers(request, response) {
        const network = request.params.network;
        const tokenPointers = await blockCitiesDataService.tokenPointers(network);
        return response.status(200).json(tokenPointers);
    },

    async tokenMetadata(request, response) {

        const tokenId = request.params.tokenId;
        const network = request.params.network;

        const metadata = await blockCitiesDataService.metadata(network, tokenId);

        return response.status(200).json(metadata);
    },

    async lookupTokenDetails(request, response) {

        const tokenId = request.params.tokenId;
        const network = request.params.network;

        const tokenDetails = await blockCitiesDataService.tokenDetails(network, tokenId);
        const metaData = await blockCitiesDataService.metadata(network, tokenId);
        const owner = await blockCitiesDataService.ownerOfToken(network, tokenId);

        return response.status(200).json({...tokenDetails, ...metaData, tokenId, owner});
    },

    async refreshTokenMetaData(request, response) {
        const tokenId = request.params.tokenId;
        const network = request.params.network;

        const results = await openSeaService.refreshTokenMetaData(network, tokenId);

        return response.status(200).json(results);
    },

    async lookupTokenDetailsForOwner(request, response) {

        const owner = request.params.owner;
        const network = request.params.network;

        const tokens = await blockCitiesDataService.tokensOfOwner(network, owner);

        const mappedTokens = await Promise.all(_.map(tokens[0], async (tokenId) => {
            const tokenDetails = await blockCitiesDataService.tokenDetails(network, tokenId);
            const metaData = await blockCitiesDataService.metadata(network, tokenId);

            return {...tokenDetails, ...metaData, tokenId: tokenId};
        }));

        return response.status(200).json(mappedTokens);
    }
};
