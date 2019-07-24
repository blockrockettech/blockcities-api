const _ = require('lodash');

const imageBuilderService = require('../../services/imageBuilder.service');
const blockCitiesDataService = require('../../services/blockcities.data.service');
const openSeaService = require('../../services/openSea.service');

const token = require('express').Router({mergeParams: true});

// Gets all token pointers form the contract
token.get('/pointers', async (request, response) => {
    const {network} = request.params;
    const tokenPointers = await blockCitiesDataService.tokenPointers(network);
    return response.status(200).json(tokenPointers);
});

// Token URI looking defined in the contract
token.get('/:tokenId', async (request, response) => {

    const {tokenId, network} = request.params;

    const metadata = await blockCitiesDataService.tokenMetadata(network, tokenId);

    return response.status(200).json(metadata);
});

// Refresh the open sea token metadata
token.get('/:tokenId/opensea/refresh', async (request, response) => {
    const {tokenId, network} = request.params;

    const results = await openSeaService.refreshTokenMetaData(network, tokenId);

    return response.status(200).json(results);
});

// A more detailed lookup method for pulling back all details for a token
token.get('/:tokenId/details', async (request, response) => {
    const {tokenId, network} = request.params;

    const tokenDetails = await blockCitiesDataService.tokenDetails(network, tokenId);
    const metaData = await blockCitiesDataService.tokenMetadata(network, tokenId);
    const owner = await blockCitiesDataService.ownerOfToken(network, tokenId);

    return response.status(200).json({...tokenDetails, ...metaData, tokenId, owner});
});

// Getting account owned tokens
token.get('/account/:owner/tokens', async (request, response) => {
    const {owner, network} = request.params;

    const tokens = await blockCitiesDataService.tokensOfOwner(network, owner);

    const mappedTokens = await Promise.all(_.map(tokens[0], async (tokenId) => {
        const tokenDetails = await blockCitiesDataService.tokenDetails(network, tokenId);
        const metaData = await blockCitiesDataService.tokenMetadata(network, tokenId);

        return {...tokenDetails, ...metaData, tokenId: tokenId};
    }));

    return response.status(200).json(mappedTokens);
});

// The image generator
token.get('/image/:tokenId.png', async (request, response) => {
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

        const tokenDetails = await blockCitiesDataService.tokenDetails(network, tokenId);

        if (tokenDetails.special !== 0) {
            console.log(`Loading special for Token ID:`, tokenDetails.special);
            const specialPng = await imageBuilderService.loadSpecial(tokenDetails.special, 'png');
            return response
                .contentType('image/png')
                .send(specialPng);
        }

        const image = await imageBuilderService.generateImage(tokenDetails, 'png');

        return response
            .contentType('image/png')
            .send(image);
    } catch (e) {
        console.error(e);
    }
});

token.get('/:tokenId/image', async (request, response) => {
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

        const tokenDetails = await blockCitiesDataService.tokenDetails(network, tokenId);

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
});

module.exports = token;
