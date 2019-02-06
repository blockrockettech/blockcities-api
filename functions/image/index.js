const imageBuilderService = require('../services/imageBuilder.service');

module.exports = {

    async generateTokenImage (request, response) {

        const tokenId = request.params.tokenId;
        if (!tokenId) {
            return response.status(400).json({
                failure: `Token ID not provided`
            });
        }

        const network = request.params.network;

        const image = await imageBuilderService.generateTokenImage(network, tokenId);

        return response
            .contentType('image/svg+xml')
            .send(image);
    },

    async generateTestImage (request, response) {
        const image = await imageBuilderService.generateTestImage({
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
