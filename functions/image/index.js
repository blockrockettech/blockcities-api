const imageBuilderService = require('../services/imageBuilder.service');
const blockcitiesContractService = require('../services/blockcities.contract.service');

module.exports = {

    async generateTokenImage (request, response) {

        const cityMapping = (id) => {
            if (id < 2) {
                return 4;
            }
            if (id < 3) {
                return 7;
            }
            return 11;
        };

        const tokenId = request.params.tokenId;
        if (!tokenId) {
            return response.status(400).json({
                failure: `Token ID not provided`
            });
        }

        const network = request.params.network;
        if (!network) {
            return response.status(400).json({
                failure: `Network not provided`
            });
        }

        const tokenDetails = await blockcitiesContractService.tokenDetails(network, tokenId);
        tokenDetails.size = cityMapping(tokenDetails.city);

        const image = await imageBuilderService.generateImage(tokenDetails);

        return response
            .contentType('image/svg+xml')
            .send(image);
    },

    async generateTestImage (request, response) {
        const image = await imageBuilderService.generateImage({
            size: parseInt(request.params.size),
            base: parseInt(request.params.base),
            body: parseInt(request.params.body),
            roof: parseInt(request.params.roof),
            exteriorColorway: parseInt(request.params.exterior),
            windowColorway: parseInt(request.params.windows)
        });

        return response
            .contentType('image/svg+xml')
            .send(image);
    }
};
