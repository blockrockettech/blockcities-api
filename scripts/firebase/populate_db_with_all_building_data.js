const _ = require('lodash');
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(require('../../functions/_keys/block-cities-firebase-adminsdk.json')),
    databaseURL: 'https://block-cities.firebaseio.com',
    storageBucket: "block-cities.appspot.com"
});
require('../../functions/services/firebase.service').firestore(admin);
require('../../functions/services/firebase.service').storage(admin);

const blockcitiesDataService = require('../../functions/services/blockcities.data.service');

void async function () {

    const NETWORK = 1;

    const { tokenIdPointer } = await blockcitiesDataService.tokenPointers(NETWORK);
    console.log(`Total tokens ${tokenIdPointer}`);

    const ids = [1965, 1978, 1995, 2184, 2193, 2256, 2325, 2437, 2482, 2486, 2526, 2534, 2587, 2653, 2656, 2789, 2791, 2797, 2817, 2836, 2888]

    for (let i = 2784; i <= tokenIdPointer; i++) {

        if (ids.indexOf(i) > -1) continue;

        await blockcitiesDataService.updateBuildingData(NETWORK, i);
        console.log(`Update build data for ID [${i}]`);
    }

    // New failed
    // 1965, 1978, 1995, 2184, 2193, 2256, 2325, 2437, 2482, 2486, 2526, 2534, 2587, 2653, 2656, 2789, 2791, 2797, 2817, 2836, 2888

    // const ids = [1965, 1978, 1995, 2184, 2193, 2256, 2325, 2437, 2482, 2486, 2526, 2534, 2587, 2653, 2656, 2789, 2791, 2797, 2817, 2836, 2888]

    // for (const i of ids) {
    //     await blockcitiesDataService.updateBuildingData(NETWORK, i);
    //     console.log(`Update build data for ID [${i}]`);
    // }

    process.exit();

}();
