const _ = require('lodash');

const specialMappings = require('./special-data-mapping');
const colorLogic = require('../services/colour-logic');

const cityNameMapper = ({special, city}) => {
    if (special !== 0 && specialMappings[special]) {
        return specialMappings[special].city;
    }

    switch (city) {
        case 0:
            return "Atlanta";
        case 1:
            return "New York City";
        case 2:
            return "Chicago";
        case 3:
            return "San Francisco";
        default:
            console.error(`Unable to map city [${city}]`);
            return _.toString(city);
    }
};

const specialNameMapper = ({special}) => {
    if (special !== 0 && specialMappings[special]) {
        return specialMappings[special].name;
    }
    return false;
};

const buildingNameMapper = ({building, special}) => {
    if (special !== 0 && specialMappings[special]) {
        return specialMappings[special].name;
    }

    switch (building) {
        case 0:
            return "432 Park Place";
        case 1:
            return "333 South Wabash";
        case 2:
            return "100 Peachtree";
        case 3:
            return "200 East Randolph";
        case 4:
            return "601 Lexington";
        case 5:
            return "260 Peachtree";
        case 6:
            return "36 Central Park";
        case 7:
            return "885 6th Ave";
        case 8:
            return "725 5th Ave";
        case 9:
            return "233 South Wacker";
        case 10:
            return "541 North Fairbanks";
        case 11:
            return "200 East Illinois";
        case 12:
            return "222 Second";
        case 13:
            return "650 California";
        case 14:
            return "375 Park Ave";
        case 15:
            return "2 Peachtree";
        default:
            console.error(`Unable to map building [${building}]`);
            return _.toString(building);
    }
};

const bodyNameMapper = ({body, special}) => {
    if (special !== 0 && specialMappings[special]) {
        return "Special";
    }

    return `Variant ${body}`;
};

const baseNameMapper = ({base, special}) => {
    if (special !== 0 && specialMappings[special]) {
        return "Special";
    }

    switch (base) {
        case 0:
            return "Standard";
        case 1:
            return "Westin Base";
        case 2:
            return "Parking Deck";
        case 3:
            return "ATT Base";
        case 4:
            return "Aston Base";
        case 5:
            return "Tree Base";
        case 6:
            return "Retail Base";
        case 7:
            return "Citigroup Base";
        default:
            console.error(`Unable to map base [${base}]`);
            return _.toString(base);
    }
};

const roofNameMapper = ({roof, special}) => {
    if (special !== 0 && specialMappings[special]) {
        return "Special";
    }

    switch (roof) {
        case 0:
            return "Standard";
        case 1:
            return "432 Roof";
        case 2:
            return "886 6th Ave";
        case 3:
            return "Pool Roof";
        case 4:
            return "Equitable";
        case 5:
            return "CNA";
        case 6:
            return "Helipad";
        case 7:
            return "BlockCities Sign Roof";
        case 8:
            return "Vesey Roof";
        case 9:
            return "Aston Abr";
        case 10:
            return "Linkedin Roof";
        default:
            console.error(`Unable to map roof [${roof}]`);
            return _.toString(roof);
    }
};

const exteriorColorwayName = ({exteriorColorway, special}) => {
    if (special !== 0 && specialMappings[special]) {
        return {
            exteriorColorway: "Special"
        };
    }

    const colorArray = colorLogic[exteriorColorway];
    if (colorArray) {
        return {
            exteriorColorway: colorArray[0],
            roofWindowColorway: colorArray[1],
            bodyWindowColorway: colorArray[2],
            baseWindowColorway: colorArray[3],
        };
    }

    console.error(`Unable to map exteriorColorway [${exteriorColorway}]`);
    return {
        exteriorColorway: _.toString(exteriorColorway)
    };
};

const backgroundColorwayName = ({backgroundColorway, special}) => {
    if (special !== 0 && specialMappings[special]) {
        return "Special";
    }

    switch (backgroundColorway) {
        case 0:
            return "Yellow";
        case 1:
            return "Aqua";
        case 2:
            return "Dull Blue";
        case 3:
            return "Blue Blue";
        case 4:
            return "Pink";
        case 5:
            return "Orange";
        case 6:
            return "Bold Blue";
        case 7:
            return "Grey";
        default:
            console.error(`Unable to map backgroundColorway [${backgroundColorway}]`);
            return _.toString(backgroundColorway);
    }
};

const decorateMetadataName = (rawMetaData) => {
    return {
        ...rawMetaData,
        city: cityNameMapper(rawMetaData),
        base: baseNameMapper(rawMetaData),
        body: bodyNameMapper(rawMetaData),
        roof: roofNameMapper(rawMetaData),
        building: buildingNameMapper(rawMetaData),
        special: specialNameMapper(rawMetaData),
        backgroundColorway: backgroundColorwayName(rawMetaData),
        ...exteriorColorwayName(rawMetaData),
    };
};

module.exports = {
    decorateMetadataName
};
