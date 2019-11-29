const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(require('../../functions/_keys/block-cities-firebase-adminsdk.json')),
    databaseURL: 'https://block-cities.firebaseio.com'
});
require('../../functions/services/firebase.service').firestore(admin);

const webflowDataService = require('../../functions/services/webflow/webflowDataService');

void async function () {

    try {
        const data = await webflowDataService.getSite('5ca25aa53ef88d7811fa6a49');
        console.log(data);
        console.log(await data.collections());

        process.exit();
    } catch (e) {
        console.error(e);
        process.exit();
    }
}();
