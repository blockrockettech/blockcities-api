const webflowDataService = require('../../functions/services/webflow/webflowDataService');

const config = require('../../functions/services/webflow/config');

const axios = require('axios');

const schema = require('./schema');

const probe = require('probe-image-size');

// FIXME didn't work in citymapper...figure out why...
const Atlanta = {
    id: 0,
    name: 'Atlanta',
    short: 'ATL',
};

const NYC = {
    id: 1,
    name: 'New York City',
    short: 'NYC',
};

const Chicago = {
    id: 2,
    name: 'Chicago',
    short: 'CHI',
};

const SanFrancisco = {
    id: 3,
    name: 'San Francisco',
    short: 'SF',
};

const Tokyo = {
    id: 4,
    name: 'Tokyo',
    short: 'TOK',
};

const London = {
    id: 5,
    name: 'London',
    short: 'LON',
};

const shortCityNameMapper = (city) => {
    switch (city) {
        case Atlanta.id:
            return Atlanta.short;
        case NYC.id:
            return NYC.short;
        case Chicago.id:
            return Chicago.short;
        case SanFrancisco.id:
            return SanFrancisco.short;
        case Tokyo.id:
            return Tokyo.short;
        case London.id:
            return London.short;
        default:
            return 'XXX';
    }
};

const heightClassMapper = (height) => {

    if (height < 500) {
        return 'Low Rise';
    }
    else if (height < 1000) {
        return 'High Rise';
    }
    else if (height < 1500) {
        return 'Skyscraper';
    }
    else if (height < 2000) {
        return 'Super-Tall Skyscraper';
    }
    else {
        'Mega-Tall Skyscraper'
    }
};

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
        for (let i = 800; i < 810; i++) {
            promiseArray.push(axios.get(`https://us-central1-block-cities.cloudfunctions.net/api/network/1/token/${i}/details`));
        }

        const metaDataArray = await Promise.all(promiseArray);
        const buildings = metaDataArray.map((b) => b.data);
        // console.log(buildings);

        buildings.forEach(async (b) => {
            try {

                const dimensions = await probe(b.image);

                await wait();

                const res = await webflowDataService.addItemToCollection(config.collections.buildings, {
                    'token-id': b.attributes.tokenId,
                    'image': b.image,
                    'background-color': `#${b.background_color}`,
                    'city': shortCityNameMapper(b.city),
                    'city-full-name': b.attributes.city,
                    'era': '0',
                    'era-class': 'Modern',
                    'architect': b.attributes.architect,
                    'current-owner': b.owner,
                    'buildingdescription': b.description,
                    'height': dimensions.height,
                    'height-class': heightClassMapper(dimensions.height),
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
