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

    try {
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

        _.forEach(foundItems, (item) => {
            console.log(`Found item with slug [${item._id}] [${item._cid}] [${item['token-id']}] [${item.slug}]`);
        });

        process.exit();
    } catch (e) {
        console.error(e);
        process.exit();
    }
}();
