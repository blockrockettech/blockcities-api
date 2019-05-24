const {config: cityConfig} = require('./citymapper');
const {config: backgrounConfig} = require('../services/background-colours');

// Don't export bname to the public!
module.exports = {
    0: {
        name: '241 Ralph McGill',
        bname: 'Georgia Power',
        city: cityConfig.Atlanta.name,
        cityId: cityConfig.Atlanta.id,
    },
    1: {
        name: '133 Peachtree',
        bname: 'GP Tower',
        city: cityConfig.Atlanta.name,
        cityId: cityConfig.Atlanta.id,
    },
    2: {
        name: '210 Peachtree',
        bname: 'Westin Peachtree Plaza',
        city: cityConfig.Atlanta.name,
        cityId: cityConfig.Atlanta.id,
    },
    3: {
        name: '150 North Michigan',
        bname: 'Crain Communications',
        city: cityConfig.Chicago.name,
        cityId: cityConfig.Chicago.id,
    },
    4: {
        name: '401 North Wabash',
        bname: 'Trump Tower Chicago',
        city: cityConfig.Chicago.name,
        cityId: cityConfig.Chicago.id,
    },
    5: {
        name: '233 South Wacker',
        bname: 'Willis Tower',
        city: cityConfig.Chicago.name,
        cityId: cityConfig.Chicago.id,
    },
    6: {
        name: '222 Second Street',
        bname: 'Linkedin Building',
        city: cityConfig.SanFrancisco.name,
        cityId: cityConfig.SanFrancisco.id,
    },
    7: {
        name: '600 Montgomery',
        bname: 'Transamerica Pyramid',
        city: cityConfig.SanFrancisco.name,
        cityId: cityConfig.SanFrancisco.id,
    },
    8: {
        name: 'One California',
        bname: 'US Bank',
        city: cityConfig.SanFrancisco.name,
        cityId: cityConfig.SanFrancisco.id,
    },
    9: {
        name: 'One Bryant Park',
        bname: 'BoA Tower',
        city: cityConfig.NYC.name,
        cityId: cityConfig.NYC.id,
    },
    10: {
        name: '56 Leonard',
        bname: '56 Leonard',
        city: cityConfig.NYC.name,
        cityId: cityConfig.NYC.id,
    },
    11: {
        name: '601 Lexington',
        bname: 'Citigroup Center',
        city: cityConfig.NYC.name,
        cityId: cityConfig.NYC.id,
    },

    // FOAM scavenger
    12: {
        name: '745 7th Ave',
        bname: '745 7th Ave',
        city: cityConfig.NYC.name,
        cityId: cityConfig.NYC.id,
    },

    // token 1 - 5
    1000000: {
        name: 'BlockCities Genesis Building',
        bname: 'Genesis',
        city: 'Genesis',
        background_color: '#000000'
    },
    1000001: {
        name: '375 Park Ave',
        bname: '375 Park Ave',
        city: cityConfig.NYC.name,
        cityId: cityConfig.NYC.id,
    },
    1000002: {
        name: '133 Peachtree',
        bname: '133 Peachtree',
        city: 'Atlanta'
    },
    1000003: {
        name: '200 East Randolph',
        bname: '200 East Randolph',
        city: cityConfig.SanFrancisco.name,
        cityId: cityConfig.SanFrancisco.id,
    },
    1000004: {
        name: '600 Montgomery',
        bname: '600 Montgomery',
        city: cityConfig.SanFrancisco.name,
        cityId: cityConfig.SanFrancisco.id,
    },

    // NonFungible.com specials
    1000005: {
        name: '1 NonFungible Tower',
        bname: '1 NonFungible Tower',
        city: cityConfig.NYC.name,
        cityId: cityConfig.NYC.id
    },
    1000006: {
        name: '2 NonFungible Tower',
        bname: '2 NonFungible Tower',
        city: cityConfig.SanFrancisco.name,
        cityId: cityConfig.SanFrancisco.id,
    },
    1000007: {
        name: '3 NonFungible Tower',
        bname: '3 NonFungible Tower',
        city: cityConfig.Chicago.name,
        cityId: cityConfig.Chicago.id,
    },

    // Founder building
    1000008: {name: 'Founder Building', bname: 'Founder Building', city: 'Genesis'},

    // FOAM scavenger hunts
    1000009: {
        name: 'Nakagin Capsule Tower',
        bname: 'Nakagin Capsule Tower',
        city: cityConfig.Tokyo.name,
        cityId: cityConfig.Tokyo.id,
        background_color: backgrounConfig.SPECIAL.hex,
        background_colorId: backgrounConfig.SPECIAL.id
    },
    1000010: {
        name: 'Balfron Tower',
        bname: 'Balfron Tower',
        city: cityConfig.London.name,
        cityId: cityConfig.London.id,
        background_color: backgrounConfig.PINK.hex,
        background_colorId: backgrounConfig.PINK.id
    },
    1000011: {
        name: '945 Madison Ave',
        bname: '945 Madison Ave',
        city: cityConfig.NYC.name,
        cityId: cityConfig.NYC.id,
        background_color: backgrounConfig.BEIGE.hex,
        background_colorId: backgrounConfig.BEIGE.id,
    },
    1000012: {
        name: '626 1st Ave',
        bname: '626 1st Ave',
        city: cityConfig.NYC.name,
        cityId: cityConfig.NYC.id,
        background_color: backgrounConfig.ORANGE.hex,
        background_colorId: backgrounConfig.ORANGE.id,
    },
    1000013: {
        name: '461 Dean Apartments',
        bname: '461 Dean Apartments',
        city: cityConfig.NYC.name,
        cityId: cityConfig.NYC.id,
        background_color: backgrounConfig.GRAY.hex,
        background_colorId: backgrounConfig.GRAY.id
    },
    1000014: {
        name: '481 8th Ave',
        bname: '481 Eighth Ave',
        city: cityConfig.NYC.name,
        cityId: cityConfig.NYC.id,
        background_color: backgrounConfig.PINK.hex,
        background_colorId: backgrounConfig.PINK.id
    },
    1000015: {
        name: '767 5th Ave',
        bname: '767 5th Ave',
        city: cityConfig.NYC.name,
        cityId: cityConfig.NYC.id,
        background_color: backgrounConfig.PINK.hex,
        background_colorId: backgrounConfig.PINK.id
    },
    1000016: {
        name: 'FOAM Tower',
        bname: 'FOAM Tower',
        city: cityConfig.NYC.name,
        cityId: cityConfig.NYC.id,
        background_color: backgrounConfig.LIGHT_ORANGE.hex,
        background_colorId: backgrounConfig.LIGHT_ORANGE.id
    },
    1000017: {
        name: '96 Wythe Ave',
        bname: '96 Wythe Ave',
        city: cityConfig.NYC.name,
        cityId: cityConfig.NYC.id,
        background_color: backgrounConfig.PINK.hex,
        background_colorId: backgrounConfig.PINK.id
    },
    1000018: {
        name: '215 Moore',
        bname: '215 Moore',
        city: cityConfig.NYC.name,
        cityId: cityConfig.NYC.id,
        background_color: backgrounConfig.SPECIAL.hex,
        background_colorId: backgrounConfig.SPECIAL.id
    },
    1000019: {
        name: '1 World Trade Center',
        bname: '1 World Trade Center',
        city: cityConfig.NYC.name,
        cityId: cityConfig.NYC.id,
        background_color: backgrounConfig.YELLOW.hex,
        background_colorId: backgrounConfig.YELLOW.id
    },
    1000020: {
        name: '96 Wythe Ave',
        bname: '96 Wythe Ave',
        city: cityConfig.NYC.name,
        cityId: cityConfig.NYC.id,
        background_color: backgrounConfig.LIGHT_ORANGE.hex,
        background_colorId: backgrounConfig.LIGHT_ORANGE.id
    },
    1000021: {
        name: '251 1st',
        bname: '251 1st',
        city: cityConfig.NYC.name,
        cityId: cityConfig.NYC.id,
        background_color: backgrounConfig.GRAY.hex,
        background_colorId: backgrounConfig.GRAY.id
    },


};
