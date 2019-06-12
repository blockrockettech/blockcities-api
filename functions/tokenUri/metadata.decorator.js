const _ = require('lodash');

const specialMappings = require('./special-data-mapping');
const colorLogic = require('../services/colour-logic');
const metadataMappings = require('./metadata-mappings');
const {cityNameMapper} = require('./citymapper');

const {backgroundColorwaySwitch} = require('../services/background-colours');

const colorMapper = (color) => {

    switch (color) {
        case 'red':
            return 'Red';
        case 'darkgrey':
            return 'Dark Grey';
        case 'gold':
            return 'Gold';
        case 'aquablue':
            return 'Aqua Blue';
        case 'trueblue':
            return 'True Blue';
        case 'lightbeige':
            return 'Light Beige';
        case 'darkbrown':
            return 'Dark Brown';
        case 'lightgrey':
            return 'Light Grey';
        case 'black':
            return 'Black';
        default:
            console.error(`Unable to map color [${color}]`);
            return _.toString(color);
    }
};

const classicOrSpecialMapper = (special) => {
    return (special < 1000000) ? 'Classic' : 'Special';
};

const windowTypeMapper = ({building, body, special}) => {
    try {
        if (special !== 0 && specialMappings[special]) {
            return classicOrSpecialMapper(special);
        }

        return metadataMappings[building].bodies[body];
    } catch (e) {
        console.error(`Failed looking up type metadata for building ${building} body ${body} special ${special}`, e);
        return base;
    }
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
            exteriorColorway: colorMapper(colorArray[0]),
            roofWindowColorway: colorMapper(colorArray[1]),
            bodyWindowColorway: colorMapper(colorArray[2]),
            baseWindowColorway: colorMapper(colorArray[3]),
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

    // FIXME should this call to backgroundColorwaySwitch

    return backgroundColorwaySwitch(backgroundColorway, special).name;
};

const decorateMetadataName = (rawMetaData) => {
    return {
        tokenId: rawMetaData.tokenId,
        architect: rawMetaData.architect,
        city: cityNameMapper(rawMetaData),
        groundFloor: baseNameMapper(rawMetaData),
        body: buildingNameMapper(rawMetaData), // PA requested body should be the building name
        roof: roofNameMapper(rawMetaData),
        building: buildingNameMapper(rawMetaData),
        windowType: windowTypeMapper(rawMetaData),
        backgroundColorway: backgroundColorwayName(rawMetaData),
        ...exteriorColorwayName(rawMetaData),
    };
};

module.exports = {
    decorateMetadataName
};
