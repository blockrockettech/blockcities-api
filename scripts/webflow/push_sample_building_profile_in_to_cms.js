const webflowDataService = require('../../functions/services/webflow/webflowDataService');

const config = require('../../functions/services/webflow/config');

const axios = require('axios');

const schema = require('./schema');

const wait = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 2000);
    });
};

void async function () {

    try {
        // const collection = await webflowDataService.getCollection(config.collections.buildings);
        // console.log(collection);

        // schema.fields.forEach(f => console.log(`'${f.slug}': b.attributes.xxx,`));

        // await webflowDataService.removeCollection(config.collections.buildings);
        // console.log(`Collection removed`);

        const promiseArray = [];
        for (let i = 1000; i < 1001; i++) {
            promiseArray.push(axios.get(`https://us-central1-block-cities.cloudfunctions.net/api/network/1/token/${i}`));
        }

        const metaDataArray = await Promise.all(promiseArray);
        const buildings = metaDataArray.map((b) => b.data);
        // console.log(buildings);

        buildings.forEach(async (b) => {
            try {

                await wait();

                const res = await webflowDataService.addItemToCollection(config.collections.buildings, {
                    'token-id': b.attributes.tokenId,
                    'image': b.image,
                    'background-color': `#${b.background_color}`,
                    'city': 'XXX',
                    'city-full-name': b.attributes.city,
                    'era': '0',
                    'era-class': 'Modern',
                    'architect': b.attributes.architect,
                    'current-owner': '0x0',
                    'buildingdescription': b.description,
                    'height': 1000,
                    'height-class': 'Super-Tall',
                    'date-built': 'Jan 1, 1970',
                    'groundfloor': b.attributes.groundFloor,
                    'body': b.attributes.body,
                    'roof': b.attributes.roof,
                    'ground-floor-exterior-color': b.attributes.exteriorColorway,
                    'ground-floor-window-color': b.attributes.baseWindowColorway,
                    'ground-floor-window-type': b.attributes.windowType,
                    'ground-floor-use': 'XXX',
                    'ground-floor-exterior-color-icon': '',
                    'ground-floor-window-color-icon': '',
                    'ground-floor-window-type-icon': '',
                    'ground-floor-use-icon': '',
                    'body-exterior-color': b.attributes.exteriorColorway,
                    'body-window-color': b.attributes.bodyWindowColorway,
                    'body-window-type': b.attributes.windowType,
                    'body-use': 'XXX',
                    'body-exterior-color-icon': '',
                    'body-window-color-icon': '',
                    'body-window-type-icon': '',
                    'body-use-icon': '',
                    'roof-exterior-color': b.attributes.exteriorColorway,
                    'roof-window-color': b.attributes.roofWindowColorway,
                    'roof-window-type': b.attributes.windowType,
                    'roof-use': 'XXX',
                    'roof-exterior-color-icon': '',
                    'roof-window-color-icon': '',
                    'roof-window-type-icon': '',
                    'roof-use-icon': '',
                    'name': b.name,
                    'slug': b.attributes.tokenId.toString(), // slug is used to define URL
                });

                console.log(res);
            } catch (e) {
                console.error(e);
            }
        });
    } catch (e) {
        console.error(e);
    }
}();
