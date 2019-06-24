const {
    Atlanta,
    NYC,
    Chicago,
    SanFrancisco,
    Tokyo,
    London
} = require('./cities');

const {config: backgrounConfig} = require('./background-colours');

// Don't export bname to the public!
module.exports = {
    0: {
        name: '241 Ralph McGill',
        bname: 'Georgia Power',
        city: Atlanta.name,
        cityId: Atlanta.id,
    },
    1: {
        name: '133 Peachtree',
        bname: 'GP Tower',
        city: Atlanta.name,
        cityId: Atlanta.id,
    },
    2: {
        name: '210 Peachtree',
        bname: 'Westin Peachtree Plaza',
        city: Atlanta.name,
        cityId: Atlanta.id,
    },
    3: {
        name: '150 North Michigan',
        bname: 'Crain Communications',
        city: Chicago.name,
        cityId: Chicago.id,
    },
    4: {
        name: '401 North Wabash',
        bname: 'Trump Tower Chicago',
        city: Chicago.name,
        cityId: Chicago.id,
    },
    5: {
        name: '233 South Wacker',
        bname: 'Willis Tower',
        city: Chicago.name,
        cityId: Chicago.id,
    },
    6: {
        name: '222 Second Street',
        bname: 'Linkedin Building',
        city: SanFrancisco.name,
        cityId: SanFrancisco.id,
    },
    7: {
        name: '600 Montgomery',
        bname: 'Transamerica Pyramid',
        city: SanFrancisco.name,
        cityId: SanFrancisco.id,
    },
    8: {
        name: 'One California',
        bname: 'US Bank',
        city: SanFrancisco.name,
        cityId: SanFrancisco.id,
    },
    9: {
        name: 'One Bryant Park',
        bname: 'BoA Tower',
        city: NYC.name,
        cityId: NYC.id,
    },
    10: {
        name: '56 Leonard',
        bname: '56 Leonard',
        city: NYC.name,
        cityId: NYC.id,
    },
    11: {
        name: '601 Lexington',
        bname: 'Citigroup Center',
        city: NYC.name,
        cityId: NYC.id,
    },

    // FOAM scavenger
    12: {
        name: '745 7th Ave',
        bname: '745 7th Ave',
        city: NYC.name,
        cityId: NYC.id,
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
        city: NYC.name,
        cityId: NYC.id,
    },
    1000002: {
        name: '133 Peachtree',
        bname: '133 Peachtree',
        city: 'Atlanta'
    },
    1000003: {
        name: '200 East Randolph',
        bname: '200 East Randolph',
        city: SanFrancisco.name,
        cityId: SanFrancisco.id,
    },
    1000004: {
        name: '600 Montgomery',
        bname: '600 Montgomery',
        city: SanFrancisco.name,
        cityId: SanFrancisco.id,
    },

    // NonFungible.com specials
    1000005: {
        name: '1 NonFungible Tower',
        bname: '1 NonFungible Tower',
        city: NYC.name,
        cityId: NYC.id
    },
    1000006: {
        name: '2 NonFungible Tower',
        bname: '2 NonFungible Tower',
        city: SanFrancisco.name,
        cityId: SanFrancisco.id,
    },
    1000007: {
        name: '3 NonFungible Tower',
        bname: '3 NonFungible Tower',
        city: Chicago.name,
        cityId: Chicago.id,
    },

    // Founder building
    1000008: {name: 'Founder Building', bname: 'Founder Building', city: 'Genesis'},

    // FOAM scavenger hunts
    1000009: {
        name: 'Nakagin Capsule Tower',
        bname: 'Nakagin Capsule Tower',
        city: Tokyo.name,
        cityId: Tokyo.id,
        background_color: backgrounConfig.SPECIAL.hex,
        background_colorId: backgrounConfig.SPECIAL.id
    },
    1000010: {
        name: 'Balfron Tower',
        bname: 'Balfron Tower',
        city: London.name,
        cityId: London.id,
        background_color: backgrounConfig.PINK.hex,
        background_colorId: backgrounConfig.PINK.id
    },
    1000011: {
        name: '945 Madison Ave',
        bname: '945 Madison Ave',
        city: NYC.name,
        cityId: NYC.id,
        background_color: backgrounConfig.BEIGE.hex,
        background_colorId: backgrounConfig.BEIGE.id,
    },
    1000012: {
        name: '626 1st Ave',
        bname: '626 1st Ave',
        city: NYC.name,
        cityId: NYC.id,
        background_color: backgrounConfig.ORANGE.hex,
        background_colorId: backgrounConfig.ORANGE.id,
    },
    1000013: {
        name: '461 Dean Apartments',
        bname: '461 Dean Apartments',
        city: NYC.name,
        cityId: NYC.id,
        background_color: backgrounConfig.GRAY.hex,
        background_colorId: backgrounConfig.GRAY.id
    },
    1000014: {
        name: '481 8th Ave',
        bname: '481 Eighth Ave',
        city: NYC.name,
        cityId: NYC.id,
        background_color: backgrounConfig.PINK.hex,
        background_colorId: backgrounConfig.PINK.id
    },
    1000015: {
        name: '767 5th Ave',
        bname: '767 5th Ave',
        city: NYC.name,
        cityId: NYC.id,
        background_color: backgrounConfig.PINK.hex,
        background_colorId: backgrounConfig.PINK.id
    },
    1000016: {
        name: 'FOAM Tower',
        bname: 'FOAM Tower',
        city: NYC.name,
        cityId: NYC.id,
        background_color: backgrounConfig.LIGHT_ORANGE.hex,
        background_colorId: backgrounConfig.LIGHT_ORANGE.id
    },
    1000017: {
        name: '96 Wythe Ave',
        bname: '96 Wythe Ave',
        city: NYC.name,
        cityId: NYC.id,
        background_color: backgrounConfig.PINK.hex,
        background_colorId: backgrounConfig.PINK.id
    },
    1000018: {
        name: '215 Moore',
        bname: '215 Moore',
        city: NYC.name,
        cityId: NYC.id,
        background_color: backgrounConfig.SPECIAL.hex,
        background_colorId: backgrounConfig.SPECIAL.id
    },
    1000019: {
        name: '1 World Trade Center',
        bname: '1 World Trade Center',
        city: NYC.name,
        cityId: NYC.id,
        background_color: backgrounConfig.LIGHT_YELLOW.hex,
        background_colorId: backgrounConfig.LIGHT_YELLOW.id
    },
    1000020: {
        name: '96 Wythe Ave',
        bname: '96 Wythe Ave',
        city: NYC.name,
        cityId: NYC.id,
        background_color: backgrounConfig.LIGHT_ORANGE.hex,
        background_colorId: backgrounConfig.LIGHT_ORANGE.id
    },
    1000021: {
        name: '251 1st',
        bname: '251 1st',
        city: NYC.name,
        cityId: NYC.id,
        background_color: backgrounConfig.GRAY.hex,
        background_colorId: backgrounConfig.GRAY.id
    },
};