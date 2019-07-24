const _ = require('lodash');

const buildingDataService = require('../building.data.service');
const webflowDataService = require('./webflowDataService');

const firestore = require('../firebase.service').firestore();

const {getNetwork} = require('../abi/networks');

const MAINNET = 1;

class WebflowUpdateQueue {

    async addToQueue(tokenId) {
        console.log(`Adding token [${tokenId}] to webflow update queue`);

        return firestore
            .collection('data')
            .doc(getNetwork(MAINNET))
            .collection('webflow-cms-queue')
            .doc(_.toString(tokenId))
            .set({
                tokenId,
                created: Date.now()
            })
            .then(ref => {
                return ref.id;
            });
    }

    async getNextBatchToUpdate(limit = 60) {

        // Get the next token batch
        const querySet = await firestore
            .collection('data')
            .doc(getNetwork(MAINNET))
            .collection('webflow-cms-queue')
            .orderBy('created', 'asc')
            .limit(limit)
            .get();

        const tokenIds = [];
        querySet.forEach((doc) => {
            const data = doc.data();
            tokenIds.push(data.tokenId);
        });

        // Delete the tokens we just grabbed
        const batch = firestore.batch();
        _.forEach(tokenIds, (tokenId) => {
            const tokenRef = firestore.collection('data').doc(getNetwork(MAINNET)).collection('webflow-cms-queue').doc(_.toString(tokenId));
            batch.delete(tokenRef);
        });
        await batch.commit();

        return tokenIds;
    }

    async processTokenUpdate(tokenId) {

        // Load any existing building data
        let currentBuilding = await buildingDataService.getBuildingByTokenId(MAINNET, tokenId);
        console.log(currentBuilding);
        if (!currentBuilding) {
            console.error(`Attempting to push CMS token for building we dont know - this shouldn't happen - token ID [${tokenId}]`);
            return;
        }

        // Create Webflow CMS formatted data
        const webflowCmsData = FirebaseToWebflowConverter.constructWebFlowCmsData(currentBuilding);

        // // Ensure the CMS mapping remains
        if (currentBuilding.webflowItemId) {
            console.log(`Updating existing building on CMS - token ID [${tokenId}] collection [${currentBuilding.webflowCollectionId}] item [${currentBuilding.webflowItemId}]`);
            await webflowDataService.updateItemInCollection(currentBuilding.webflowCollectionId, currentBuilding.webflowItemId, webflowCmsData);
        } else {
            console.log(`Added new building [${tokenId}] to webflow`);

            // _cid = collection ID
            // _id  = item Id
            const {_cid, _id} = await webflowDataService.addItemToCollection(currentBuilding.webflowCollectionId, webflowCmsData);

            console.log(`Webflow CMS item added - token ID [${tokenId}] collection [${_cid}] item [${_id}]`);
            currentBuilding.webflowItemId = _id;
            currentBuilding.webflowCollectionId = _cid;

            // Save the data in the DB
            await buildingDataService.saveBuilding(MAINNET, currentBuilding);
        }

    }
}


class FirebaseToWebflowConverter {
    static constructWebFlowCmsData(data) {
        return {
            'token-id': data.tokenId,
            'building-image-primary': `https://us-central1-block-cities.cloudfunctions.net/api/network/1/token/image/${data.tokenId}.png`,
            'building-image-link': `https://us-central1-block-cities.cloudfunctions.net/api/network/1/token/image/${data.tokenId}.png`,
            'background-color': `#${data.background_color}`,
            'city': data.cityShort,
            'city-full-name': data.attributes.city,
            'era': data.era,
            'era-class': data.eraClass,
            'architect': data.attributes.architect,
            'original-architect-short': data.architectShort,
            'current-owner': data.owner,
            'current-owner-short': data.ownerShort,
            'buildingdescription': data.description,
            'height': data.attributes.height,
            'height-class': data.attributes.heightClass,
            'date-built': data.blockTimestampPretty,
            'groundfloor': data.attributes.groundFloorType,
            'body': data.attributes.coreType,
            'roof': data.attributes.rooftopType,
            'ground-floor-exterior-color': data.attributes.exteriorColorway,
            'ground-floor-window-color': data.attributes.baseWindowColorway,
            'ground-floor-window-type': data.attributes.windowType,
            'ground-floor-use': data.attributes.groundFloorUse,
            'body-name': data.attributes.building,
            'body-exterior-color': data.attributes.exteriorColorway,
            'body-window-color': data.attributes.bodyWindowColorway,
            'body-window-type': data.attributes.windowType,
            'body-use': data.attributes.coreUse,
            'roof-exterior-color': data.attributes.exteriorColorway,
            'roof-window-color': data.attributes.roofWindowColorway,
            'roof-window-type': data.attributes.windowType,
            'roof-use': data.attributes.rooftopUse,
            'name': data.name,
            'slug': data.slug, // slug is used to define URL
        };
    }
}


module.exports = new WebflowUpdateQueue();
