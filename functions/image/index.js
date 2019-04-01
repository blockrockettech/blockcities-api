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

            if (tokenDetails.special !== 0) {
                // console.log(`Loading special for Token ID:`, tokenDetails.special.toNumber());
                const specialSvg = await imageBuilderService.loadSpecial(tokenDetails.special);
                return response
                    .contentType('image/svg+xml')
                    .send(specialSvg);
            }

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
            // console.log(request.params);
            const image = await imageBuilderService.generateImage({
                building: parseInt(request.params.building),
                base: parseInt(request.params.base),
                body: parseInt(request.params.body),
                roof: parseInt(request.params.roof),
                exteriorColorway: parseInt(request.params.exterior)
            });

            return response
                .contentType('image/svg+xml')
                .send(image);
        } catch (e) {
            console.error(e);
        }
    },

    async generateTestImages (request, response) {
        try {

            function getRandomArbitrary(max) {
                return Math.floor(Math.random() * max);
            }

            const allBases = [];
            for (let x = 0; x < parseInt(request.params.baseNo); x++) {
                for (let y = 0; y < parseInt(request.params.bodyNo); y++) {
                    for (let z = 0; z < parseInt(request.params.roofNo); z++) {
                        allBases.push(imageBuilderService.generateImage({
                            building: parseInt(request.params.building),
                            base: x,
                            body: y,
                            roof: z,
                            exteriorColorway: getRandomArbitrary(20)
                        }));
                    }
                }
            }

            const buildings = await Promise.all(allBases);

            return response
                .contentType('text/html')
                .send(buildings.reduce((p, b) => p + b, ''));
        } catch (e) {
            console.error(e);
        }
    },
};
