const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(require('./_keys/block-cities-firebase-adminsdk.json')),
    databaseURL: 'https://block-cities.firebaseio.com'
});

const {address} = require('./services/abi/networks');

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

/**
 * A set of cron style jobs which trigger a particular operation
 */
exports.blockCitiesMainnetScheduler = functions.pubsub.schedule('every 5 minutes')
    .onRun(async (context) => {
        console.log('Running mainnet scheduler');
        await require('./services/events/events.service').processEventsForAddress(address.blockCities.mainnet);
    });

exports.blockCitiesRopstenScheduler = functions.pubsub.schedule('every 5 minutes')
    .onRun(async (context) => {
        console.log('Running ropsten scheduler');
        await require('./services/events/events.service').processEventsForAddress(address.blockCities.ropsten);
    });

exports.blockCitiesRinkebyScheduler = functions.pubsub.schedule('every 5 minutes')
    .onRun(async (context) => {
        console.log('Running rinkeby scheduler');
        await require('./services/events/events.service').processEventsForAddress(address.blockCities.rinkeby);
    });

/**
 * Triggered when a new event is added to the DB
 */
exports.newEventTrigger =
    functions.firestore
        .document('/events/{network}/data/{hash}')
        .onWrite(async (change, context) => {
            const get = require('lodash/get');

            const {network, hash} = context.params;
            const document = change.after.exists ? change.after.data() : null;

            console.info(`Event - onWrite @ [/events/${network}/data/${hash}]`, document);

            const event = get(document, 'event');

            // Handle differing events
            switch (event) {
                // default ERC721 events
                case 'Transfer':
                case 'Approval': {
                    const tokenId = get(document, 'returnValues.tokenId');
                    const from = get(document, 'returnValues.from');
                    const to = get(document, 'returnValues.to');

                    console.log(`Incoming token ID [${tokenId}] for event [${event}] from [${from}] to [${to}]`);

                    await require('./services/blockcities.data.service').updateBuildingData(network, tokenId);

                    break;
                }
            }
        });
