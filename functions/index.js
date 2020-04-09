const _ = require('lodash');
const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(require('./_keys/block-cities-firebase-adminsdk.json')),
    databaseURL: 'https://block-cities.firebaseio.com',
    storageBucket: "block-cities.appspot.com"

});

const contracts =  require('blockcities-contract-artifacts').contracts;

const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());

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

// All methods under /buildings will use our internal DB
app.use('/network/:network/buildings', buildings);

const runtimeOpts = {
    memory: '2GB',
    timeoutSeconds: 60
};

// Expose Express API as a single Cloud Function:
exports.api = functions.runWith(runtimeOpts).https.onRequest(app);

/**
 * A set of cron style jobs which trigger a particular operation
 */
exports.blockCitiesMainnetScheduler = functions.pubsub.schedule('every 5 minutes')
    .onRun(async (context) => {
        console.log('Running mainnet scheduler');
        await require('./services/events/events.service').processEventsForAddress(contracts.addresses.BlockCities(1).address);
    });

exports.blockCitiesRopstenScheduler = functions.pubsub.schedule('every 5 minutes')
    .onRun(async (context) => {
        console.log('Running ropsten scheduler');
        await require('./services/events/events.service').processEventsForAddress(contracts.addresses.BlockCities(3).address);
    });

exports.blockCitiesRinkebyScheduler = functions.pubsub.schedule('every 5 minutes')
    .onRun(async (context) => {
        console.log('Running rinkeby scheduler');
        await require('./services/events/events.service').processEventsForAddress(contracts.addresses.BlockCities(4).address);
    });

/**
 * Triggered when a new event is added to the DB
 */
exports.newEventTrigger =
    functions.firestore
        .document('/events/{network}/data/{hash}')
        .onWrite(async (change, context) => {
            const get = require('lodash/get');

            const { network, hash } = context.params;
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
// exports.webflowCmsScheduler = functions.pubsub.schedule('every 2 minutes')
//     .onRun(async (context) => {
//         console.log('Running webflow CMS Queue');

//         const webflowUpdateQueue = require('./services/webflow/webflowUpdateQueue.service');

//         const tokenIds = await webflowUpdateQueue.getNextBatchToUpdate(30);

//         const updates = _.map(tokenIds, async (tokenId) => {
//             return webflowUpdateQueue.processTokenUpdate(tokenId);
//         });

//         await Promise.all(updates);

//         console.log(`Processed a total of [${tokenIds.length}]`);

//     });
