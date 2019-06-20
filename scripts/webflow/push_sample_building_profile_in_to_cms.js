const webflowDataService = require('../../functions/services/webflow/webflowDataService');

const config = require('../../functions/services/webflow/config');

const axios = require('axios');

const schema = require('./schema');

const probe = require('probe-image-size');

const {shortCityNameMapper} = require('../../functions/tokenUri/citymapper');
const {heightMapper, heightInFootDescription} = require('../../functions/tokenUri/height-mapper');

const imageBuilderService = require('../../functions/services/imageBuilder.service');

const wait = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 2000);
    });
};

const dot = (ethAccount) => ethAccount.substr(0, 4) + '...' + ethAccount.substr(ethAccount.length - 4, ethAccount.length);

void async function () {

    try {
        // console.log(dot('0x377a75c4EF92502fE40D2b454f0C3829b8c0ffc5'));
        // const collection = await webflowDataService.getCollection(config.collections.buildings);
        // console.log(collection);

        // schema.fields.forEach(f => console.log(`'${f.slug}': b.attributes.xxx,`));

        // await webflowDataService.removeCollection(config.collections.buildings);
        // console.log(`Collection removed`);

        const promiseArray = [];
        for (let i = 1; i < 100; i++) {
            promiseArray.push(axios.get(`https://us-central1-block-cities.cloudfunctions.net/api/network/1/token/${i}/details`));
        }

        const metaDataArray = await Promise.all(promiseArray);
        const buildings = metaDataArray.map((b) => b.data);
        // console.log(buildings);

        buildings.forEach(async (b) => {
            try {

                const dimensions = await probe(b.image);

                await wait();

                // Standard width
                const {adjustedBodyHeight: standardBodyHeight, adjustedBodyWidth: standardBodyWidth, canvasHeight: standardCanvasHeight} = await imageBuilderService.generateImageStats({
                    building: b.building,
                    base: 0,
                    body: 0,
                    roof: 0,
                    exteriorColorway: b.exteriorColorway,
                    backgroundColorway: b.backgroundColorway,
                });

                // Adjusted width
                const {adjustedBodyHeight, adjustedBodyWidth, canvasHeight} = await imageBuilderService.generateImageStats({
                    building: b.building,
                    base: b.base,
                    body: b.body,
                    roof: b.roof,
                    exteriorColorway: b.exteriorColorway,
                    backgroundColorway: b.backgroundColorway,
                });

                // console.log(`S height ${standardBodyHeight} body ${standardBodyWidth} height ${standardCanvasHeight}`);
                // console.log(`A height ${adjustedBodyHeight} body ${adjustedBodyWidth} height ${canvasHeight}`);

                const heightInFt = heightMapper({
                    standardWidth: standardBodyWidth,
                    adjustedWidth: adjustedBodyWidth,
                    pixelHeight: dimensions.height,
                    buildingId: b.building
                });

                console.log(`token ID ${b.tokenId}, buildingID ${b.building}, Standard width ${standardBodyWidth}, Adjusted width ${adjustedBodyWidth}, Pixel height ${dimensions.height}, Height ${heightInFootDescription(heightInFt)}`);

                // console.log(b.tokenId, b.building, heightInFt, heightInFootDescription(heightInFt));

                // const res = await webflowDataService.addItemToCollection(config.collections.buildings, {
                //     'token-id': b.attributes.tokenId,
                //     'building-image-primary': `https://us-central1-block-cities.cloudfunctions.net/api/network/1/token/image/${b.attributes.tokenId}.png`,
                //     'building-image-link': `https://us-central1-block-cities.cloudfunctions.net/api/network/1/token/image/${b.attributes.tokenId}.png`,
                //     'background-color': `#${b.background_color}`,
                //     'city': shortCityNameMapper(b.city),
                //     'city-full-name': b.attributes.city,
                //     'era': '0',
                //     'era-class': 'Modern',
                //     'architect': b.attributes.architect,
                //     'original-architect-short': dot(b.attributes.architect),
                //     'current-owner': b.owner,
                //     'current-owner-short': dot(b.owner),
                //     'buildingdescription': b.description,
                //     'height': dimensions.height,
                //     'height-class': heightClassMapper(dimensions.height),
                //     'date-built': 'Jan 1, 1970',
                //     'groundfloor': b.attributes.groundFloor,
                //     'body': b.attributes.body,
                //     'roof': b.attributes.roof,
                //     'ground-floor-exterior-color': b.attributes.exteriorColorway,
                //     'ground-floor-window-color': b.attributes.baseWindowColorway,
                //     'ground-floor-window-type': b.attributes.windowType,
                //     'ground-floor-use': '',
                //     'ground-floor-exterior-color-icon': '',
                //     'ground-floor-window-color-icon': '',
                //     'ground-floor-window-type-icon': '',
                //     'ground-floor-use-icon': '',
                //     'body-exterior-color': b.attributes.exteriorColorway,
                //     'body-window-color': b.attributes.bodyWindowColorway,
                //     'body-window-type': b.attributes.windowType,
                //     'body-use': '',
                //     'body-exterior-color-icon': '',
                //     'body-window-color-icon': '',
                //     'body-window-type-icon': '',
                //     'body-use-icon': '',
                //     'roof-exterior-color': b.attributes.exteriorColorway,
                //     'roof-window-color': b.attributes.roofWindowColorway,
                //     'roof-window-type': b.attributes.windowType,
                //     'roof-use': '',
                //     'roof-exterior-color-icon': '',
                //     'roof-window-color-icon': '',
                //     'roof-window-type-icon': '',
                //     'roof-use-icon': '5d038159d6fe9d81f863c673',
                //     'name': b.name,
                //     'slug': b.attributes.tokenId.toString(), // slug is used to define URL
                // });
                //
                // console.log(res);
            } catch (e) {
                console.error(e);
            }
        });
    } catch (e) {
        console.error(e);
    }
}();
