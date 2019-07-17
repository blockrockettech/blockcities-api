const _ = require('lodash');

const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(require('../../functions/_keys/block-cities-firebase-adminsdk.json')),
    databaseURL: 'https://block-cities.firebaseio.com'
});
require('../../functions/services/firebase.service').firestore(admin);

const webflowDataService = require('../../functions/services/webflow/webflowDataService');

void async function () {

    try {

        ////////////////////////
        // Load all CMS Items //
        ////////////////////////

        const itemsToRemove = [{
            'tokenId': 1371,
            'webflowItemId': '5d1282a3bd7b5653ecfe70c1',
            'webflowCollectionId': '5cf917a298b9ff812bfc64d1',
            'slug': '1371'
        }, {
            'tokenId': 1362,
            'webflowItemId': '5d12827e1d41bd22d5ca1703',
            'webflowCollectionId': '5cf917a298b9ff812bfc64d1',
            'slug': '1362'
        }, {
            'tokenId': 1359,
            'webflowItemId': '5d128272bd7b5622adfe5d86',
            'webflowCollectionId': '5cf917a298b9ff812bfc64d1',
            'slug': '1359'
        }];

        const removals = _.map(itemsToRemove, ({webflowItemId, webflowCollectionId}) => {
            return webflowDataService.removeItemInCollection(webflowCollectionId, webflowItemId);
        });

        const results = await Promise.all(removals);

        console.log(`Finished:
            Results [${JSON.stringify(results)}]
        `);

        process.exit();
    } catch (e) {
        console.error(e);
        process.exit();
    }
}();
