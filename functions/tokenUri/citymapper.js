const specialMappings = require('./special-data-mapping');

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
        default:
            console.error(`Unable to map city [${city}]`);
            return _.toString(city);
    }
};

module.exports = {
    cityNameMapper,
    config: {
        Atlanta,
        NYC,
        Chicago,
        SanFrancisco,
        Tokyo,
        London,
    }
};
