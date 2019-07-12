const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(require('./_keys/block-cities-firebase-adminsdk.json')),
    databaseURL: "https://block-cities.firebaseio.com"
});

const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());

// TODO refactor below endpoints into proper express routers and service classes

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

const events = require('./api/events');
const configs = require('./api/configs');
const builder = require('./api/builder');

app.use('/configs', configs);
app.use('/builder', builder);
app.use('/events', events);

// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);

exports.scheduledFunctionPlainEnglish = functions.pubsub.schedule('every 5 minutes')
    .onRun((context) => {
        
    });
