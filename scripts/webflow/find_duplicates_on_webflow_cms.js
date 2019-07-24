const _ = require('lodash');

const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(require('../../functions/_keys/block-cities-firebase-adminsdk.json')),
    databaseURL: 'https://block-cities.firebaseio.com'
});
require('../../functions/services/firebase.service').firestore(admin);

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

        let tokenIdToItems = {};
        let duplicates = [];

        _.forEach(foundItems, (item) => {

            const tokenId = item['token-id'];

            if (!tokenIdToItems[tokenId]) {
                tokenIdToItems[tokenId] = item;
            } else {
                duplicates.push({
                    tokenId,
                    webflowItemId: item._id,
                    webflowCollectionId: item._cid,
                    slug: item.slug,
                });
            }
        });

        console.log(`Finished:
            Processed [${foundItems.length}] items
            Duplicates found [${JSON.stringify(duplicates)}]
        `);

        process.exit();
    } catch (e) {
        console.error(e);
        process.exit();
    }
}();
