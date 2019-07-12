const _ = require('lodash');

const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(require('../../functions/_keys/block-cities-firebase-adminsdk.json')),
    databaseURL: 'https://block-cities.firebaseio.com'
});
require('../../functions/services/firebase.service').firestore(admin);

const blockcitiesDataService = require('../../functions/services/blockcities.data.service');
const webflowDataService = require('../../functions/services/webflow/webflowDataService');
const config = require('../../functions/services/config');

void async function () {

    const NETWORK = 1;

    try {

        ////////////////////////
        // Load all CMS Items //
        ////////////////////////

        let items = await webflowDataService.getCollectionItems(config.webflow.collections.buildings);
        console.log(items.total);

        let currentOffset = 0;
        let foundItems = [];

        while (foundItems.length !== items.total) {
            items = await webflowDataService.getCollectionItems(config.webflow.collections.buildings, 100, currentOffset);
            foundItems = foundItems.concat(items.items);
            currentOffset += 100;
            console.log(currentOffset, foundItems.length, items.total);
        }

        // _id	String	Unique identifier for the Item
        // _cid	String	Unique identifier for the Collection the Item belongs within

        ///////////////////////////////////
        // Force set against new DB item //
        ///////////////////////////////////

        const {tokenIdPointer} = await blockcitiesDataService.tokenPointers(NETWORK);
        console.log(`Total tokens ${tokenIdPointer}`);

        const failures = [];

        for (let i = 0; i < tokenIdPointer; i++) {

            // Find the webflow data
            const webflowItem = _.find(foundItems, (item) => item['token-id'] === i);
            if (webflowItem) {

                // Force update the building in our DB
                await blockcitiesDataService.updateBuilding(NETWORK, i, webflowItem._id);
            } else {

                // record the failure
                failures.push(tokenIdPointer);
            }
        }

        console.log(`Finished:
            Processed [${tokenIdPointer}] buildings
            Failed CMS lookups [${failures}]
        `);

        process.exit();
    } catch (e) {
        console.error(e);
        process.exit();
    }
}();

/*
{ _archived: false,
  _draft: false,
  'building-image-link': 'https://us-central1-block-cities.cloudfunctions.net/api/network/1/token/image/1484.png',
  'background-color': '#C4D7F3',
  'token-id': 1484,
  height: 385,
  city: 'CHI',
  'city-full-name': 'Chicago',
  era: '0',
  'era-class': 'Modern',
  architect: '0x64c971d7e3c0483fa97a7714ec55d1e1943731c7',
  'original-architect-short': '0x64...31c7',
  'current-owner': '0x64c971d7e3c0483fa97a7714ec55d1e1943731c7',
  'current-owner-short': '0x64...31c7',
  buildingdescription: '#1484',
  'height-class': 'High Rise',
  'date-built': 'Jul. 3 2019',
  groundfloor: 'BlockCities Transit Authority',
  body: 'Rectangle',
  roof: 'Helipad',
  'ground-floor-exterior-color': 'Black',
  'ground-floor-window-color': 'Gold',
  'ground-floor-window-type': 'Rectangle',
  'ground-floor-use': 'Business',
  'body-name': '333 South Wabash',
  'body-exterior-color': 'Black',
  'body-window-color': 'Dark Grey',
  'body-window-type': 'Rectangle',
  'body-use': 'Business',
  'roof-exterior-color': 'Black',
  'roof-window-color': 'Dark Grey',
  'roof-window-type': 'Rectangle',
  'roof-use': 'Business',
  name: 'Building #1484',
  slug: '1484',
  'building-image-primary':
   { fileId: '5d1caf9ac133d66abd5fd52d',
     url: 'https://uploads-ssl.webflow.com/5cf7fd5e8cb69edb29ae68e4/5d1caf9ac133d66abd5fd52d_1484.png',
     alt: null },
  'updated-on': '2019-07-03T13:37:30.581Z',
  'updated-by': 'Person_57fe862657b9fb7208d3504d',
  'created-on': '2019-07-03T13:37:30.581Z',
  'created-by': 'Person_57fe862657b9fb7208d3504d',
  'published-on': '2019-07-03T13:37:30.581Z',
  'published-by': 'Person_57fe862657b9fb7208d3504d',
  _cid: '5cf917a298b9ff812bfc64d1',
  _id: '5d1caf9ac133d6b21b5fd52e',
  update: [Function: update],
  remove: [Function: bound updateItem] }
 */
