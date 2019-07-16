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

        const itemsToRemove = [
            {
                'tokenId': 1436,
                'webflowItemId': '5d2d970b0ea13936c6ebc83b',
                'webflowCollectionId': '5cf917a298b9ff812bfc64d1'
            }
        ];

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
