const functions = require('firebase-functions');

// blockcites-0
const LIVE_SITE_ID = '5ca25aa53ef88d7811fa6a49';

//building
// const BUILD_PROFILES_COLLECTION_ID = '5cf917a298b9ff812bfc64d1';
const BUILD_PROFILES_COLLECTION_ID = '5dcdad2aeb1a33420578f821';

const webFlowApiKey = '';

const openseaApiKey = '';

module.exports = {
    webflow: {
        apiToken: webFlowApiKey,
        collections: {
            buildings: BUILD_PROFILES_COLLECTION_ID
        },
        sites: {
            live: LIVE_SITE_ID
        }
    },
    openSea: {
        apiToken: openseaApiKey
    }
};
