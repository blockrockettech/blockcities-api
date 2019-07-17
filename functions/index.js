const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(require('./_keys/block-cities-firebase-adminsdk.json')),
    databaseURL: 'https://block-cities.firebaseio.com'
});

const {address} = require('./services/abi/networks');
const blockCitiesDataService = require('./services/blockcities.data.service');

const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());

// TODO refactor below endpoints into proper express routers and service classes

// A more detailed lookup method for pulling back all details for a token
app.get('/network/:network/tokens/:owner/details', async (request, response) => {
    const {owner, network} = request.params.owner;

    const tokens = await blockCitiesDataService.tokensOfOwner(network, owner);

    const mappedTokens = await Promise.all(_.map(tokens[0], async (tokenId) => {
        const tokenDetails = await blockCitiesDataService.tokenDetails(network, tokenId);
        const metaData = await blockCitiesDataService.tokenMetadata(network, tokenId);

        return {...tokenDetails, ...metaData, tokenId: tokenId};
    }));

    return response.status(200).json(mappedTokens);
});

const events = require('./api/events');
const configs = require('./api/configs');
const builder = require('./api/builder');
const token = require('./api/token');
const buildings = require('./api/buildings');

app.use('/configs', configs);
app.use('/builder', builder);
app.use('/events', events);

// All methods under /token will hit the blockchain directly
app.use('/network/:network/token', token);

// All methods under /buildings will use our DB
app.use('/network/:network/buildings', buildings);

// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);

/**
 * A set of cron style jobs which trigger a particular operation
 */
exports.blockCitiesMainnetScheduler = functions.pubsub.schedule('every 1 minutes')
    .onRun(async (context) => {
        console.log('Running mainnet scheduler');
        await require('./services/events/events.service').processEventsForAddress(address.blockCities.mainnet);
    });

exports.blockCitiesRopstenScheduler = functions.pubsub.schedule('every 1 minutes')
    .onRun(async (context) => {
        console.log('Running ropsten scheduler');
        await require('./services/events/events.service').processEventsForAddress(address.blockCities.ropsten);
    });

exports.blockCitiesRinkebyScheduler = functions.pubsub.schedule('every 1 minutes')
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
                case 'Transfer': {
                    const tokenId = get(document, 'returnValues.tokenId');
                    const from = get(document, 'returnValues.from');
                    const to = get(document, 'returnValues.to');

                    console.log(`Incoming token ID [${tokenId}] for event [${event}] from [${from}] to [${to}]`);

                    await require('./services/blockcities.data.service').updateBuildingData(network, tokenId);

                    break;
                }
            }
        });

/**
 * Webflow CMS task queue - rate limit of 60 API calls a minute so we use a queue to remove duplicate calls and throttle without our limits
 */
exports.webflowCmsScheduler = functions.pubsub.schedule('every 2 minutes')
    .onRun(async (context) => {
        console.log('Running webflow CMS Queue');

        const webflowUpdateQueue = require('./services/webflow/webflowUpdateQueue.service');

        const tokenIds = await webflowUpdateQueue.getNextBatchToUpdate(60);

        const updates = _.map(tokenIds, async (tokenId) => {
            return webflowUpdateQueue.processTokenUpdate(tokenId);
        });

        await Promise.all(updates);

        console.log(`Processed a total of [${tokenIds.length}]`);

    });
