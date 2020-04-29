const _ = require('lodash');
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(require('../../functions/_keys/block-cities-firebase-adminsdk.json')),
    databaseURL: 'https://block-cities.firebaseio.com',
    storageBucket: "block-cities.appspot.com"
});
require('../../functions/services/firebase.service').database(admin);
require('../../functions/services/firebase.service').firestore(admin);
require('../../functions/services/firebase.service').storage(admin);

const blockcitiesDataService = require('../../functions/services/blockcities.data.service');

void async function () {

    const NETWORK = 1;

    const { tokenIdPointer } = await blockcitiesDataService.tokenPointers(NETWORK);
    console.log(`Total tokens ${tokenIdPointer}`);

    for (let i = 3229; i <= tokenIdPointer; i++) {
        await blockcitiesDataService.updateBuildingData(NETWORK, i);
        console.log(`Update build data for ID [${i}]`);
    }

    // New failed
    // const ids = [1965, 1978, 1995, 2184, 2193, 2256, 2325, 2437, 2482, 2486, 2526, 2534, 2587, 2653, 2656, 2789, 2791, 2797, 2817, 2836, 2888]

    // for fixing the sizing issue
    // const ids = [1002, 1717, 1868, 1897];

    // first 10
    //const ids = [100, 101, 102, 103, 104, 105, 106, 107, 108, 109];

    // for (const i of ids) {
    //     await blockcitiesDataService.updateBuildingData(NETWORK, i);
    //     console.log(`Update build data for ID [${i}]`);
    // }

    process.exit();

}();
