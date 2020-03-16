const _ = require('lodash');

const imageBuilderService = require('../../services/imageBuilder.service');
const blockCitiesDataService = require('../../services/blockcities.data.service');
const foamContractService = require('../../services/foam.contract.service');
const openSeaService = require('../../services/openSea.service');

const { convert } = require('convert-svg-to-png');
const { backgroundColorwaySwitch } = require('../../services/metadata/background-colours');

const token = require('express').Router({ mergeParams: true });

const PAD_DEFAULT = 300;

// Gets all token pointers form the contract
token.get('/pointers', async (request, response) => {
    try {
        const { network } = request.params;
        const tokenPointers = await blockCitiesDataService.tokenPointers(network);
        return response.status(200).json(tokenPointers);
    } catch (e) {
        console.error(e);
    }
});

// Token URI looking defined in the contract
token.get('/:tokenId', async (request, response) => {

    try {
        const { tokenId, network } = request.params;

        const metadata = await blockCitiesDataService.tokenMetadata(network, tokenId);

        return response
            .status(200)
            .set('Cache-Control', 'public, max-age=864000')
            .json(metadata);
    } catch (e) {
        console.error(e);
    }
});

// Refresh the open sea token metadata
token.get('/:tokenId/opensea/refresh', async (request, response) => {
    const { tokenId, network } = request.params;

    const results = await openSeaService.refreshTokenMetaData(network, tokenId);

    return response.status(200).json(results);
});

// A more detailed lookup method for pulling back all details for a token
token.get('/:tokenId/details', async (request, response) => {
    try {
        const { tokenId, network } = request.params;

        const tokenDetails = await blockCitiesDataService.tokenDetails(network, tokenId);
        const metaData = await blockCitiesDataService.tokenMetadata(network, tokenId);
        const owner = await blockCitiesDataService.ownerOfToken(network, tokenId);

        return response.status(200).json({ ...tokenDetails, ...metaData, tokenId, owner });

    } catch (e) {
        console.error(e);
    }
});

// Getting account owned tokens
token.get('/account/:owner/tokens', async (request, response) => {
    try {
        const { owner, network } = request.params;

        const tokens = await blockCitiesDataService.tokensOfOwner(network, owner);

        const mappedTokens = await Promise.all(_.map(tokens[0], async (tokenId) => {
            const tokenDetails = await blockCitiesDataService.tokenDetails(network, tokenId);
            const metaData = await blockCitiesDataService.tokenMetadata(network, tokenId);

            return { ...tokenDetails, ...metaData, tokenId: tokenId };
        }));

        return response.status(200).json(mappedTokens);
    } catch (e) {
        console.error(e);
    }
});

// Getting architected buildings for an account from a given timestamp
token.get('/account/:address/architected/:from', async (request, response) => {
    try {
        const { address, network, from } = request.params;
        if (!from) {
            return response.status(500)
                .json({
                    msg: 'Please supply a from timestamp'
                });
        }

        const buildings = await blockCitiesDataService.getArchitectedBuildingsForAddress(network, address, from);
        return response.status(200).json({
            count: buildings.length,
            buildings
        });
    } catch (e) {
        console.error(e);
    }
});

// Getting account owned tokens (created in FOAM)
token.get('/foam/:owner/tokens', async (request, response) => {
    try {
        const { owner, network } = request.params;

        const tokens = await foamContractService.tokensOfOwner(network, owner);

        return response.status(200).json(tokens);
    } catch (e) {
        console.error(e);
    }
});

// The image generator
token.get('/image/:tokenId.png', async (request, response) => {
    try {
        const tokenId = request.params.tokenId;
        const network = request.params.network;

        const tokenDetails = await blockCitiesDataService.tokenDetails(network, tokenId);
        const { canvasHeight } = await imageBuilderService.generateImageStats(tokenDetails);

        response
            .contentType('image/png')
            .set('Cache-Control', 'public, max-age=864000');

        if (tokenDetails.special !== 0) {
            const specialSvg = await imageBuilderService.loadSpecialPureSvg(tokenDetails.special);
            const specialPng = await convert(specialSvg, {
                height: canvasHeight * 2,
                puppeteer: { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
            });
            return response.send(specialPng);
        }

        const image = await imageBuilderService.generatePureSvg(tokenDetails);
        const png = await convert(image, {
            height: canvasHeight * 2,
            puppeteer: { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
        });
        return response.send(png);
    } catch (e) {
        console.error(e);
    }
});

token.get('/:tokenId/image', async (request, response) => {
    try {
        const tokenId = request.params.tokenId;
        const network = request.params.network;

        // cache for 1 week
        // TIP: use PURGE to clear via postman if needed
        response
            .contentType('image/svg+xml')
            .set('Cache-Control', 'public, max-age=864000');

        const tokenDetails = await blockCitiesDataService.tokenDetails(network, tokenId);

        if (tokenDetails.special !== 0) {
            // console.log(`Loading special for Token ID:`, tokenDetails.special.toNumber());
            const specialSvg = await imageBuilderService.loadSpecialPureSvg(tokenDetails.special);

            return response.send(specialSvg);
        }

        const image = await imageBuilderService.generatePureSvg(tokenDetails);

        return response.send(image);
    } catch (e) {
        console.error(e);
    }
});

// The image generator with bg
token.get('/image-bg/:tokenId.png', async (request, response) => {
    try {
        const tokenId = request.params.tokenId;
        const network = request.params.network;

        const tokenDetails = await blockCitiesDataService.tokenDetails(network, tokenId);
        const { canvasHeight } = await imageBuilderService.generateImageStats(tokenDetails);

        response
            .contentType('image/png')
            .set('Cache-Control', 'public, max-age=864000');

        const viewportBackground = backgroundColorwaySwitch(tokenDetails.backgroundColorway).hex;

        if (tokenDetails.special !== 0) {
            const specialSvg = await imageBuilderService.loadSpecialPureSvg(tokenDetails.special, viewportBackground, true);
            const specialPng = await convert(specialSvg, {
                height: canvasHeight * 2,
                puppeteer: { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
            });
            return response.send(specialPng);
        }

        const image = await imageBuilderService.generatePureSvg(tokenDetails, viewportBackground, PAD_DEFAULT);
        const png = await convert(image, {
            height: canvasHeight * 2,
            puppeteer: { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
        });
        return response.send(png);
    } catch (e) {
        console.error(e);
    }
});

token.get('/:tokenId/image-bg', async (request, response) => {
    try {
        const tokenId = request.params.tokenId;
        const network = request.params.network;

        // cache for 1 week
        // TIP: use PURGE to clear via postman if needed
        response
            .contentType('image/svg+xml')
            .set('Cache-Control', 'public, max-age=864000');

        const tokenDetails = await blockCitiesDataService.tokenDetails(network, tokenId);
        const viewportBackground = backgroundColorwaySwitch(tokenDetails.backgroundColorway).hex;

        if (tokenDetails.special !== 0) {
            const specialSvg = await imageBuilderService.loadSpecialPureSvg(tokenDetails.special, viewportBackground, true);

            return response.send(specialSvg);
        }

        const image = await imageBuilderService.generatePureSvg(tokenDetails, viewportBackground, PAD_DEFAULT);

        return response.send(image);
    } catch (e) {
        console.error(e);
    }
});

// The image generator with no concrete
token.get('/image-zero-concrete/:tokenId.png', async (request, response) => {
    try {
        const tokenId = request.params.tokenId;
        const network = request.params.network;

        const tokenDetails = await blockCitiesDataService.tokenDetails(network, tokenId);
        const { canvasHeight } = await imageBuilderService.generateImageStats(tokenDetails);

        response
            .contentType('image/png')
            .set('Cache-Control', 'public, max-age=864000');

        if (tokenDetails.special !== 0) {
            const specialSvg = await imageBuilderService.loadSpecialPureSvg(tokenDetails.special);
            const specialPng = await convert(specialSvg, {
                height: canvasHeight * 2,
                puppeteer: { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
            });
            return response.send(specialPng);
        }

        const image = await imageBuilderService.generatePureSvg(tokenDetails, null, 0, true);
        const png = await convert(image, {
            height: canvasHeight * 2,
            puppeteer: { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
        });
        return response.send(png);
    } catch (e) {
        console.error(e);
    }
});

token.get('/:tokenId/image-zero-concrete', async (request, response) => {
    try {
        const tokenId = request.params.tokenId;
        const network = request.params.network;

        // cache for 1 week
        // TIP: use PURGE to clear via postman if needed
        response
            .contentType('image/svg+xml');
        // .set('Cache-Control', 'public, max-age=864000');

        const tokenDetails = await blockCitiesDataService.tokenDetails(network, tokenId);

        if (tokenDetails.special !== 0) {
            // console.log(`Loading special for Token ID:`, tokenDetails.special.toNumber());
            const specialSvg = await imageBuilderService.loadSpecialPureSvg(tokenDetails.special);

            return response.send(specialSvg);
        }

        const image = await imageBuilderService.generatePureSvg(tokenDetails, null, 0, true);

        return response.send(image);
    } catch (e) {
        console.error(e);
    }
});


module.exports = token;
