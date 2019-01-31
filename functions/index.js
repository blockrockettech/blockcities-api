const functions = require('firebase-functions');

const cors = require('cors');
const express = require('express');
const app = express();

// Automatically allow cross-origin requests
app.use(cors({origin: true}));

app.get('/:id/image/random', async (request, response) => {
    return require('./image').generateRandomSVG(request, response);
});

app.get('/:id/image', async (request, response) => {
    return require('./image').generateRandomSVG(request, response);
});

app.get('/:base/:body/:roof/image', async (request, response) => {
    return require('./image').generateSVG(request, response);
});

app.get('/image/process', async (request, response) => {
    return require('./image').processSVG(request, response);
});

app.get('/stitch', async (request, response) => {
    return require('./image').processAndStack(request, response);
});

// Notes:
//  - I think we should version the tokens URI lookups to help migrations and changes
//  - Reason as once the image generated we may want to cache it and serve this direct from the API
//  - V2 may then be a more advanced version etc and would reduce the testing surface needed for changes
//  - It would me that the token URI hash we set in the contract is `/v1/:tokenId`

// Token URI looking defined in the contract
app.get('/network/5777/token/:tokenId', async (request, response) => {
    return require('./tokenUri').tokenMetadata(5777, request, response);
});

// A more detailed lookup method for pulling back all details for a token
app.get('/network/5777/token/:tokenId/details', async (request, response) => {
    return require('./tokenUri').lookupTokenDetails(5777, request, response);
});


// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);

