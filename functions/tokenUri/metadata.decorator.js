const specialMappings = require('./special-data-mapping');

const cityNameMapper = ({city}) => {
    switch (city) {
        case 0:
            return "Atlanta";
        case 1:
            return "Chicago";
        case 2:
            return "San Francisco";
        case 3:
            return "New York City";
        default:
            return city;
    }
};

const specialNameMapper = ({special}) => {
    if (special === 0 && specialMappings[special]) {
        return "none";
    }
    return specialMappings[special].name;
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
