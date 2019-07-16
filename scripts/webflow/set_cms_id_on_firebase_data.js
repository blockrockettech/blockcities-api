const _ = require('lodash');

const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(require('../../functions/_keys/block-cities-firebase-adminsdk.json')),
    databaseURL: 'https://block-cities.firebaseio.com'
});
require('../../functions/services/firebase.service').firestore(admin);

const blockcitiesDataService = require('../../functions/services/blockcities.data.service');
const webflowDataService = require('../../functions/services/webflow/webflowDataService');
const config = require('../../functions/services/config');

void async function () {

    const NETWORK = 1;

    try {

        ////////////////////////
        // Load all CMS Items //
        ////////////////////////

        let items = await webflowDataService.getCollectionItems(config.webflow.collections.buildings);
        console.log(items.total);

        let currentOffset = 0;
        let foundItems = [];

        while (foundItems.length !== items.total) {
            items = await webflowDataService.getCollectionItems(config.webflow.collections.buildings, 100, currentOffset);
            foundItems = foundItems.concat(items.items);
            currentOffset += 100;
            console.log(currentOffset, foundItems.length, items.total);
        }

        // _id	String	Unique identifier for the Item
        // _cid	String	Unique identifier for the Collection the Item belongs within

        ///////////////////////////////////
        // Force set against new DB item //
        ///////////////////////////////////

        const {tokenIdPointer} = await blockcitiesDataService.tokenPointers(NETWORK);
        console.log(`Total tokens ${tokenIdPointer}`);

        const failures = [];

        for (let i = 0; i <= tokenIdPointer; i++) {

            // Find the webflow data
            const webflowItem = _.find(foundItems, (item) => item['token-id'] === i);
            if (webflowItem) {

                // Force update the building in our DB
                await blockcitiesDataService.forceSetWebflowIdOnBuildingData(NETWORK, i, webflowItem._id);
            } else {

                // record the failure
                failures.push(i);
            }
        }

        console.log(`Finished:
            Processed [${tokenIdPointer}] buildings
            Failed CMS lookups [${failures}]
        `);

        process.exit();
    } catch (e) {
        console.error(e);
        process.exit();
    }
}();
