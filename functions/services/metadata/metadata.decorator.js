const _ = require('lodash');

const specialMappings = require('./special-data-mapping');
const colorLogic = require('./colour-logic');
const metadataMappings = require('./metadata-mappings');
const {cityNameMapper} = require('./citymapper');

const {backgroundColorwaySwitch} = require('./background-colours');

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

const windowTypeMapper = ({building, body, special}) => {
    try {
        if (special !== 0 && specialMappings[special]) {
            return classicOrSpecialMapper(special);
        }

        const {buildingType, buildingUse} = metadataMappings[building].bodies[body];
        return buildingType;
    } catch (e) {
        console.error(`Failed looking up type metadata for building ${building} body ${body} special ${special}`, e);
        return base;
    }
};

const groundFloorMapper = ({building, base, special}) => {
    try {
        if (special !== 0 && specialMappings[special]) {
            const value = classicOrSpecialMapper(special);
            return {
                groundFloorType: value,
                groundFloorUse: value
            };
        }

        const {buildingType, buildingUse} = metadataMappings[building].bases[base];
        return {
            groundFloorType: buildingType,
            groundFloorUse: buildingUse
        };
    } catch (e) {
        console.error(`Failed looking up GROUND metadata for building ${building} base ${base} special ${special}`, e);
        return {
            groundFloorType: base,
            groundFloorUse: base
        };
    }
};

const roofTopMapper = ({building, roof, body, special}) => {
    try {
        if (special !== 0 && specialMappings[special]) {
            const value = classicOrSpecialMapper(special);
            return {
                rooftopType: value,
                rooftopUse: value
            };
        }

        const found = metadataMappings[building].roofs[roof];
        if (!found) {
            // Trump tower does not have a roof mapping - when this happens fall back to the core mapping
            const {coreType, coreUse} = coreMapper({building, body, special});
            return {
                rooftopType: coreType,
                rooftopUse: coreUse
            };
        }

        const {buildingType, buildingUse} = found;
        return {
            rooftopType: buildingType,
            rooftopUse: buildingUse
        };
    } catch (e) {
        console.error(`Failed looking up ROOF metadata for building ${building} roof ${roof} special ${special}`, e);
        return {
            rooftopType: roof,
            rooftopUse: roof
        };
    }
};

const coreMapper = ({building, body, special}) => {
    try {
        if (special !== 0 && specialMappings[special]) {
            const value = classicOrSpecialMapper(special);
            return {
                coreType: value,
                coreUse: value
            };
        }

        const {buildingType, buildingUse} = metadataMappings[building].bodies[body];
        return {
            coreType: buildingType,
            coreUse: buildingUse
        };
    } catch (e) {
        console.error(`Failed looking up CORE metadata for building ${building} body ${body} special ${special}`, e);
        return {
            coreType: body,
            coreUse: body
        };
    }
};

const exteriorColorwayName = ({exteriorColorway, special}) => {
    if (special !== 0 && specialMappings[special]) {
        return {
            exteriorColorway: classicOrSpecialMapper(special),
            roofWindowColorway: classicOrSpecialMapper(special),
            bodyWindowColorway: classicOrSpecialMapper(special),
            baseWindowColorway: classicOrSpecialMapper(special),
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

    return backgroundColorwaySwitch(backgroundColorway, special).name;
};

const decorateMetadataName = (rawMetaData, standardWidth, adjustedWidth, pixelHeight) => {
    return {
        tokenId: rawMetaData.tokenId,
        architect: rawMetaData.architect,
        city: cityNameMapper(rawMetaData),

        // replaced with coreMapper
        // body: buildingNameMapper(rawMetaData), // PA requested body should be the building name
        building: buildingNameMapper(rawMetaData),
        windowType: windowTypeMapper(rawMetaData),
        backgroundColorway: backgroundColorwayName(rawMetaData),

        ...groundFloorMapper(rawMetaData),
        ...roofTopMapper(rawMetaData),
        ...coreMapper(rawMetaData),
        ...exteriorColorwayName(rawMetaData),
    };
};

module.exports = {
    decorateMetadataName
};
