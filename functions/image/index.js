const imageBuilderService = require('../services/imageBuilder.service');
const blockcitiesContractService = require('../services/blockcities.contract.service');

module.exports = {

    async generateTokenImage (request, response) {

        try {
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
            tokenDetails.building = tokenDetails.city;

            const image = await imageBuilderService.generateImage(tokenDetails);

            return response
                .contentType('image/svg+xml')
                .send(image);
        } catch (e) {
            console.error(e);
        }
    },

    async generateTestImage (request, response) {
        try {
            console.log(request.params);
            const image = await imageBuilderService.generateImage({
                building: parseInt(request.params.building),
                base: parseInt(request.params.base),
                body: parseInt(request.params.body),
                roof: parseInt(request.params.roof),
                exteriorColorway: parseInt(request.params.exterior),
                windowColorway: parseInt(request.params.windows)
            });

            return response
                .contentType('image/svg+xml')
                .send(image);
        } catch (e) {
            console.error(e);
        }
    }
};
