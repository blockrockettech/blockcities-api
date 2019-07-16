const _ = require('lodash');
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(require('../../functions/_keys/block-cities-firebase-adminsdk.json')),
    databaseURL: 'https://block-cities.firebaseio.com'
});
require('../../functions/services/firebase.service').firestore(admin);

const blockcitiesDataService = require('../../functions/services/blockcities.data.service');

void async function () {

    const NETWORK = 1;

    const {tokenIdPointer} = await blockcitiesDataService.tokenPointers(NETWORK);
    console.log(`Total tokens ${tokenIdPointer}`);

    // for (let i = 0; i < tokenIdPointer; i++) {
    //     await blockcitiesDataService.updateBuildingData(NETWORK, i);
    //     console.log(`Update build data for ID [${i}]`);
    // }

    //1436, 1437, 1438, 1439, 1485, 1486, 1487, 1488, 1489, 1490

    _.forEach([1490], async (tokenId) => {
        await blockcitiesDataService.updateBuildingData(NETWORK, tokenId);
    });

}();
