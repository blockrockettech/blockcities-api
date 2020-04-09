const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(require('../../functions/_keys/block-cities-firebase-adminsdk.json')),
    databaseURL: 'https://block-cities.firebaseio.com'
});
require('../../functions/services/firebase.service').firestore(admin);

const blockcitiesContractService = require('../../functions/services/blockcities.contract.service');
const blockCitiesDataService = require('../../functions/services/blockcities.data.service');

void async function () {

    try {
        const NETWORK = 1;

        const { tokenIdPointer } = await blockcitiesContractService.tokenPointers(NETWORK);
        console.log(`Total tokens ${tokenIdPointer}`);

        for (let i = 2248; i <= tokenIdPointer; i++) {
            console.log(`Refreshed token ID [${i}]`);
            // This will force update the DB
            // Adding to CMS update queue which will push to CMS once complete
            await blockCitiesDataService.updateBuildingData(NETWORK, i);
        }

        process.exit();
    } catch (e) {
        console.error(e);
        process.exit();
    }
}();
