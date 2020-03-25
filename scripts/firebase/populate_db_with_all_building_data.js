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

    for (let i = 1; i <= tokenIdPointer; i++) {
        await blockcitiesDataService.updateBuildingData(NETWORK, i);
        console.log(`Update build data for ID [${i}]`);
    }

    // for (let i = 1; i <= 1; i++) {
    //     await blockcitiesDataService.updateBuildingData(NETWORK, i);
    //     console.log(`Update build data for ID [${i}]`);
    // }

    process.exit();

}();
