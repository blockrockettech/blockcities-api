const _ = require('lodash');

const specialMappings = require('./special-data-mapping');
const colorLogic = require('../services/colour-logic');
const metadataMappings = require('./metadata-mappings');

const classicOrSpecialMapper = (special) => {
    return (special < 1000000) ? 'Classic' : 'Special';
};

const cityNameMapper = ({special, city}) => {
    if (special !== 0 && specialMappings[special]) {
        return specialMappings[special].city;
    }

    switch (city) {
        case 0:
            return 'Atlanta';
        case 1:
            return 'New York City';
        case 2:
            return 'Chicago';
        case 3:
            return 'San Francisco';
        default:
            console.error(`Unable to map city [${city}]`);
            return _.toString(city);
    }
};

const typeMapper = ({special}) => {
    if (special !== 0 && specialMappings[special]) {
        return classicOrSpecialMapper(special);
    }
    return 'Standard';
};

const buildingNameMapper = ({building, special}) => {
    if (special !== 0 && specialMappings[special]) {
        return specialMappings[special].name;
    }

    switch (building) {
        case 0:
            return '432 Park Place';
        case 1:
            return '333 South Wabash';
        case 2:
            return '100 Peachtree';
        case 3:
            return '200 East Randolph';
        case 4:
            return '601 Lexington';
        case 5:
            return '260 Peachtree';
        case 6:
            return '36 Central Park';
        case 7:
            return '885 6th Ave';
        case 8:
            return '725 5th Ave';
        case 9:
            return '233 South Wacker';
        case 10:
            return '541 North Fairbanks';
        case 11:
            return '200 East Illinois';
        case 12:
            return '222 Second';
        case 13:
            return '650 California';
        case 14:
            return '375 Park Ave';
        case 15:
            return '2 Peachtree';
        default:
            console.error(`Unable to map building [${building}]`);
            return _.toString(building);
    }
};

const bodyNameMapper = ({body, special}) => {
    if (special !== 0 && specialMappings[special]) {
        return classicOrSpecialMapper(special);
    }

    return `Variant ${body}`;
};

const baseNameMapper = ({building, base, special}) => {
    try {
        if (special !== 0 && specialMappings[special]) {
            return classicOrSpecialMapper(special);
        }

        return metadataMappings[building].bases[base];
    } catch (e) {
        console.error(`Failed looking up metadata for building ${building} base ${base} special ${special}`, e);
        return base;
    }
};

const roofNameMapper = ({building, roof, special}) => {
    try {
        if (special !== 0 && specialMappings[special]) {
            return classicOrSpecialMapper(special);
        }

        return metadataMappings[building].roofs[roof];
    } catch (e) {
        console.error(`Failed looking up metadata for building ${building} roof ${roof} special ${special}`, e);
        return roof;
    }
};

const exteriorColorwayName = ({exteriorColorway, special}) => {
    if (special !== 0 && specialMappings[special]) {
        return {
            exteriorColorway: classicOrSpecialMapper(special)
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
        return classicOrSpecialMapper(special);
    }

    switch (backgroundColorway) {
        case 0:
            return 'yellow';
        case 1:
            return 'aqua';
        case 2:
            return 'dullblue';
        case 3:
            return 'blueblue';
        case 4:
            return 'pink';
        case 5:
            return 'orange';
        case 6:
            return 'boldblue';
        case 7:
            return 'grey';
        default:
            console.error(`Unable to map backgroundColorway [${backgroundColorway}]`);
            return _.toString(backgroundColorway);
    }
};

const decorateMetadataName = (rawMetaData) => {
    return {
        tokenId: rawMetaData.tokenId,
        architect: rawMetaData.architect,
        city: cityNameMapper(rawMetaData),
        groundFloor: baseNameMapper(rawMetaData),
        body: buildingNameMapper(rawMetaData),
        roof: roofNameMapper(rawMetaData),
        building: buildingNameMapper(rawMetaData),
        type: typeMapper(rawMetaData),
        backgroundColorway: backgroundColorwayName(rawMetaData),
        ...exteriorColorwayName(rawMetaData),
    };
};

module.exports = {
    decorateMetadataName
};
