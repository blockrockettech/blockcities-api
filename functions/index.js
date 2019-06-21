const functions = require('firebase-functions');

const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

// Notes:
//  - I think we should version the tokens URI lookups to help migrations and changes
//  - Reason as once the image generated we may want to cache it and serve this direct from the API
//  - V2 may then be a more advanced version etc and would reduce the testing surface needed for changes
//  - It would me that the token URI hash we set in the contract is `/v1/:tokenId`

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

// Gets all token pointers form the contract
app.get('/network/:network/token/pointers', async (request, response) => {
    return require('./api/tokenUri').tokenPointers(request, response);
});

// Token URI looking defined in the contract
app.get('/network/:network/token/:tokenId', async (request, response) => {
    return require('./api/tokenUri').tokenMetadata(request, response);
});

// Refresh the token metadata
app.get('/network/:network/token/:tokenId/refresh', async (request, response) => {
    return require('./api/tokenUri').refreshTokenMetaData(request, response);
});

// A more detailed lookup method for pulling back all details for a token
app.get('/network/:network/token/:tokenId/details', async (request, response) => {
    return require('./api/tokenUri').lookupTokenDetails(request, response);
});

// A more detailed lookup method for pulling back all details for a token
app.get('/network/:network/tokens/:owner/details', async (request, response) => {
    return require('./api/tokenUri').lookupTokenDetailsForOwner(request, response);
});

// The image generator
app.get('/network/:network/token/image/:tokenId.png', async (request, response) => {
    return require('./api/image').generateTokenImagePng(request, response);
});

app.get('/network/:network/token/:tokenId/image', async (request, response) => {
    return require('./api/image').generateTokenImageSvg(request, response);
});

// The image tester
app.get('/building/:building/base/:base/body/:body/roof/:roof/exterior/:exterior/windows/:windows', async (request, response) => {
    return require('./api/image').generateTestImage(request, response);
});

app.get('/buildings/:building/:baseNo/:bodyNo/:roofNo', async (request, response) => {
    return require('./api/image').generateTestImages(request, response);
});

// Used for admin app - listing out specials we current can mint
app.get('/config/buildings/specials', async (request, response) => {
    response
        .status(200)
        .json(require('./services/metadata/special-data-mapping.js'))
});

// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);

