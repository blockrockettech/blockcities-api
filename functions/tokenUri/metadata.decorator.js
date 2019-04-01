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
            return city;
    }
};

const specialNameMapper = ({special}) => {
    if (special !== 0 && specialMappings[special]) {
        return specialMappings[special].name;
    }
    return "none";
};

const decorateMetadataName = (rawMetaData) => {
    return {
        ...rawMetaData,
        city: cityNameMapper(rawMetaData),
        special: specialNameMapper(rawMetaData)
    };
};

module.exports = {
    decorateMetadataName
};
