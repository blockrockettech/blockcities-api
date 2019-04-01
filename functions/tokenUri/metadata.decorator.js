const _ = require('lodash');

const specialMappings = require('./special-data-mapping');

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
            return _.toString(city);
    }
};

const specialNameMapper = ({special}) => {
    if (special !== 0 && specialMappings[special]) {
        return specialMappings[special].name;
    }
    return "none";
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
            return _.toString(building);
    }
};

const decorateMetadataName = (rawMetaData) => {
    return {
        ...rawMetaData,
        city: cityNameMapper(rawMetaData),
        special: specialNameMapper(rawMetaData),
        building: buildingNameMapper(rawMetaData),
    };
};

module.exports = {
    decorateMetadataName
};
