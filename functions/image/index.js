const imageBuilderService = require('../services/imageBuilder.service');

module.exports = {

    async generateTokenImage(request, response) {

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
    }

};
