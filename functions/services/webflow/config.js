// const functions = require('firebase-functions');

// blockcites-0
const LIVE_SITE_ID = '5ca25aa53ef88d7811fa6a49';

//building
const BUILD_PROFILES_COLLECTION_ID = '5cf917a298b9ff812bfc64d1';

// FIXME change to use firebase confg
// const apiToken = functions.config().webflow.api.key;
// if (!apiToken) {
//     throw new Error('No WebFlow API Key found - is the project setup correctly - see README');
// }
const apiToken = 'd0b24783c6ad11f651aad60d3e20b1d451ffb08713d2eaeb95768f93c95f9fd2';


module.exports = {
    apiToken,
    collections: {
        buildings: BUILD_PROFILES_COLLECTION_ID
    },
    sites: {
        live: LIVE_SITE_ID
    }
};
