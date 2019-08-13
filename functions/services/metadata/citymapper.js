const specialMappings = require('./special-data-mapping');

const {
    Atlanta,
    NYC,
    Chicago,
    SanFrancisco,
    Tokyo,
    London,
    Manchester
} = require('./cities');

const cityNameMapper = ({special, city}) => {
    if (special !== 0 && specialMappings[special]) {
        return specialMappings[special].city;
    }

    switch (city) {
        case Atlanta.id:
            return Atlanta.name;
        case NYC.id:
            return NYC.name;
        case Chicago.id:
            return Chicago.name;
        case SanFrancisco.id:
            return SanFrancisco.name;
        case Tokyo.id:
            return Tokyo.name;
        case London.id:
            return London.name;
        case Manchester.id:
            return Manchester.name;
        default:
            console.error(`Unable to map city [${city}]`);
            return _.toString(city);
    }
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
        case Manchester.id:
            return Manchester.short;
        default:
            return 'XXX';
    }
};

module.exports = {
    cityNameMapper,
    shortCityNameMapper,
};
