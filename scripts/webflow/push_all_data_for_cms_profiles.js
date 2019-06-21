const probe = require('probe-image-size');

const config = require('../../functions/services/webflow/config');

const {shortCityNameMapper} = require('../../functions/services/metadata/citymapper');
const {heightMapper, heightInFootDescription} = require('../../functions/services/metadata/height-mapper');

const webflowDataService = require('../../functions/services/webflow/webflowDataService');
const imageBuilderService = require('../../functions/services/imageBuilder.service');
const blockcitiesDataService = require('../../functions/services/blockcities.data.service');

const wait = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 1500);
    });
};

const dot = (ethAccount) => ethAccount.substr(0, 4) + '...' + ethAccount.substr(ethAccount.length - 4, ethAccount.length);

const NETWORK = 1;

void async function () {

    try {
        // await webflowDataService.removeCollection(config.collections.buildings);
        // console.log(`Collection removed`);

        const {tokenIdPointer} = await blockcitiesDataService.tokenPointers(NETWORK);
        console.log(`Total tokens ${tokenIdPointer}`);

        for (let tokenId = 1; tokenId <= 2; tokenId++) {
            const buildingConstructionData = await blockcitiesDataService.birthEventForToken(NETWORK, tokenId);
            const tokenDetails = await blockcitiesDataService.tokenDetails(NETWORK, tokenId);
            const metaData = await blockcitiesDataService.metadata(NETWORK, tokenId);
            const owner = await blockcitiesDataService.ownerOfToken(NETWORK, tokenId);

            // join all info into a data object
            const data = {
                ...tokenDetails,
                ...metaData,
                ...buildingConstructionData,
                tokenId,
                owner
            };

            const dimensions = await probe(data.image);
            await wait();

            // Standard width
            const {/*adjustedBodyHeight: standardBodyHeight, */adjustedBodyWidth: standardBodyWidth/*, canvasHeight: standardCanvasHeight*/} = await imageBuilderService.generateImageStats({
                building: data.building,
                base: 0,
                body: 0,
                roof: 0,
                exteriorColorway: data.exteriorColorway,
                backgroundColorway: data.backgroundColorway,
            });

            // Adjusted width
            const {/*adjustedBodyHeight, */adjustedBodyWidth/*, canvasHeight*/} = await imageBuilderService.generateImageStats({
                building: data.building,
                base: data.base,
                body: data.body,
                roof: data.roof,
                exteriorColorway: data.exteriorColorway,
                backgroundColorway: data.backgroundColorway,
            });

            // console.log(`S height ${standardBodyHeight} body ${standardBodyWidth} height ${standardCanvasHeight}`);
            // console.log(`A height ${adjustedBodyHeight} body ${adjustedBodyWidth} height ${canvasHeight}`);

            const heightInFt = heightMapper({
                standardWidth: standardBodyWidth,
                adjustedWidth: adjustedBodyWidth,
                pixelHeight: dimensions.height,
                buildingId: data.building
            });

            console.log(`token ID ${data.tokenId}, building ID ${data.building}, Standard width ${standardBodyWidth}, Adjusted width ${adjustedBodyWidth}, Pixel height ${dimensions.height}, Height ${heightInFt} (${heightInFootDescription(heightInFt)})`);

            const res = await webflowDataService.addItemToCollection(config.collections.buildings, {
                'token-id': data.attributes.tokenId,
                'building-image-primary': `https://us-central1-block-cities.cloudfunctions.net/api/network/1/token/image/${data.attributes.tokenId}.png`,
                'building-image-link': `https://us-central1-block-cities.cloudfunctions.net/api/network/1/token/image/${data.attributes.tokenId}.png`,
                'background-color': `#${data.background_color}`,
                'city': shortCityNameMapper(data.city),
                'city-full-name': data.attributes.city,
                'era': '0',
                'era-class': 'Modern',
                'architect': data.attributes.architect,
                'original-architect-short': dot(data.attributes.architect),
                'current-owner': data.owner,
                'current-owner-short': dot(data.owner),
                'buildingdescription': data.description,
                'height': heightInFt,
                'height-class': heightInFootDescription(heightInFt),
                'date-built': data.blockTimestampPretty,
                'groundfloor': data.attributes.groundFloor,
                'body': data.attributes.body,
                'roof': data.attributes.roof,
                'ground-floor-exterior-color': data.attributes.exteriorColorway,
                'ground-floor-window-color': data.attributes.baseWindowColorway,
                'ground-floor-window-type': data.attributes.windowType,
                'ground-floor-use': '',
                'body-exterior-color': data.attributes.exteriorColorway,
                'body-window-color': data.attributes.bodyWindowColorway,
                'body-window-type': data.attributes.windowType,
                'body-use': '',
                'roof-exterior-color': data.attributes.exteriorColorway,
                'roof-window-color': data.attributes.roofWindowColorway,
                'roof-window-type': data.attributes.windowType,
                'roof-use': '',
                'name': data.name,
                'slug': data.attributes.tokenId.toString(), // slug is used to define URL
            });

            console.log(`Added token [${tokenId}] to webflow - status [${res.status}]`);
        }

        // kill it
        process.exit();

    } catch (e) {
        console.error(e);

        // kill it
        process.exit();
    }
}();
