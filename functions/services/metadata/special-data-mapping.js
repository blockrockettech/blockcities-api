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
        heightInFt: 299,
    },
    1: {
        name: '133 Peachtree',
        bname: 'GP Tower',
        city: Atlanta.name,
        cityId: Atlanta.id,
        heightInFt: 697,
    },
    2: {
        name: '210 Peachtree',
        bname: 'Westin Peachtree Plaza',
        city: Atlanta.name,
        cityId: Atlanta.id,
        heightInFt: 883,
    },
    3: {
        name: '150 N Michigan',
        bname: 'Crain Communications',
        city: Chicago.name,
        cityId: Chicago.id,
        heightInFt: 582,
    },
    4: {
        name: '401 N Wabash',
        bname: 'Trump Tower Chicago',
        city: Chicago.name,
        cityId: Chicago.id,
        heightInFt: 1388,
    },
    5: {
        name: '233 S Wacker',
        bname: 'Willis Tower',
        city: Chicago.name,
        cityId: Chicago.id,
        heightInFt: 1729,
    },
    6: {
        name: '222 Second Street',
        bname: 'Linkedin Building',
        city: SanFrancisco.name,
        cityId: SanFrancisco.id,
        heightInFt: 370,
    },
    7: {
        name: '600 Montgomery',
        bname: 'Transamerica Pyramid',
        city: SanFrancisco.name,
        cityId: SanFrancisco.id,
        heightInFt: 853,
    },
    8: {
        name: 'One California',
        bname: 'US Bank',
        city: SanFrancisco.name,
        cityId: SanFrancisco.id,
        heightInFt: 438,
    },
    9: {
        name: 'One Bryant Park',
        bname: 'BoA Tower',
        city: NYC.name,
        cityId: NYC.id,
        heightInFt: 1200,
    },
    10: {
        name: '56 Leonard',
        bname: '56 Leonard',
        city: NYC.name,
        cityId: NYC.id,
        heightInFt: 821,
    },
    11: {
        name: '601 Lexington',
        bname: 'Citigroup Center',
        city: NYC.name,
        cityId: NYC.id,
        heightInFt: 915,
    },

    // FOAM scavenger
    12: {
        name: '745 7th Ave',
        bname: '745 7th Ave',
        city: NYC.name,
        cityId: NYC.id,
        heightInFt: 575,
    },
    
    13: {
        name: '180 N Stetson',
        bname: '180 N Stetson',
        city:  Chicago.name,
        cityId:  Chicago.id,
        heightInFt:  994,
    },
    
    14: {
        name: '303 Peachtree',
        bname: '303 Peachtree',
        city:  Atlanta.name,
        cityId:  Atlanta.id,
        heightInFt:  902,
    },
    
    15: {
        name: '555 W Madison',
        bname: '555 W Madison',
        city:  Chicago.name,
        cityId:  Chicago.id,
        heightInFt:  461,
    },
    
    16: {
        name: '864 Spring',
        bname: '864 Spring',
        city:  Atlanta.name,
        cityId:  Atlanta.name,
        heightInFt:  500,
    },
    
    17: {
        name: '1585 Broadway',
        bname: '1585 Broadway',
        city:  NYC.name,
        cityId:  NYC.id,
        heightInFt:  685,
    },
    
    18: {
        name: '333 Bush',
        bname: '333 Bush',
        city: SanFrancisco.name,
        cityId:  SanFrancisco.id,
        heightInFt:  495,
    },
    
    19: {
        name: '200 Vesey',
        bname: '200 Vesey',
        city:  NYC.name,
        cityId:  NYC.id,
        heightInFt:  739,
    },
    
    20: {
        name: '180 Maiden Lane',
        bname: '180 Maiden Lane',
        city:  NYC.name,
        cityId:  NYC.id,
        heightInFt: 554,
    },
    
    21: {
        name: 'Lil Teddy',
        bname: 'Lil Teddy',
        city:  NYC.name,
        cityId:  NYC.id,
        heightInFt:  100,
    },
    
    22: {
        name: 'Uh Oh Asher',
        bname: 'Uh Oh Asher',
        city:  NYC.name,
        cityId:  NYC.id,
        heightInFt:  350,
    },
    
    23: {
        name: 'Big Cheese Tower',
        bname: 'Big Cheese Tower',
        city:  NYC.name,
        cityId:  NYC.id,
        heightInFt:  300,
    },
    
    24: {
        name: 'Big Mold Tower',
        bname: 'Big Mold Toweer',
        city:  NYC.name,
        cityId: NYC.id,
        heightInFt:  300,
    },

    // token 1 - 5
    1000000: {
        name: 'BlockCities Genesis Building',
        bname: 'Genesis',
        city: 'Genesis',
        background_color: '#000000',
        heightInFt: 1400,
    },
    1000001: {
        name: '375 Park Ave',
        bname: '375 Park Ave',
        city: NYC.name,
        cityId: NYC.id,
        heightInFt: 516,
    },
    1000002: {
        name: '133 Peachtree',
        bname: '133 Peachtree',
        city: Atlanta.name,
        cityId: Atlanta.id,
        heightInFt: 697,
    },
    1000003: {
        name: '200 East Randolph',
        bname: '200 East Randolph',
        city: SanFrancisco.name,
        cityId: SanFrancisco.id,
        heightInFt: 1076,
    },
    1000004: {
        name: '600 Montgomery',
        bname: '600 Montgomery',
        city: SanFrancisco.name,
        cityId: SanFrancisco.id,
        heightInFt: 853,
    },

    // NonFungible.com specials
    1000005: {
        name: '1 NonFungible Tower',
        bname: '1 NonFungible Tower',
        city: NYC.name,
        cityId: NYC.id,
        heightInFt: 630,
    },
    1000006: {
        name: '2 NonFungible Tower',
        bname: '2 NonFungible Tower',
        city: SanFrancisco.name,
        cityId: SanFrancisco.id,
        heightInFt: 438,
    },
    1000007: {
        name: '3 NonFungible Tower',
        bname: '3 NonFungible Tower',
        city: Chicago.name,
        cityId: Chicago.id,
        heightInFt: 600,
    },

    // Founder building
    1000008: {
        name: 'Founder Building',
        bname: 'Founder Building',
        city: 'Genesis',
        heightInFt: 294,
    },

    // FOAM scavenger hunts
    1000009: {
        name: 'Nakagin Capsule Tower',
        bname: 'Nakagin Capsule Tower',
        city: Tokyo.name,
        cityId: Tokyo.id,
        background_color: backgrounConfig.SPECIAL.hex,
        background_colorId: backgrounConfig.SPECIAL.id,
        heightInFt: 177,
    },
    1000010: {
        name: 'Balfron Tower',
        bname: 'Balfron Tower',
        city: London.name,
        cityId: London.id,
        background_color: backgrounConfig.PINK.hex,
        background_colorId: backgrounConfig.PINK.id,
        heightInFt: 276,
    },
    1000011: {
        name: '945 Madison Ave',
        bname: '945 Madison Ave',
        city: NYC.name,
        cityId: NYC.id,
        background_color: backgrounConfig.BEIGE.hex,
        background_colorId: backgrounConfig.BEIGE.id,
        heightInFt: 56,
    },
    1000012: {
        name: '626 1st Ave',
        bname: '626 1st Ave',
        city: NYC.name,
        cityId: NYC.id,
        background_color: backgrounConfig.ORANGE.hex,
        background_colorId: backgrounConfig.ORANGE.id,
        heightInFt: 540,
    },
    1000013: {
        name: '461 Dean Apartments',
        bname: '461 Dean Apartments',
        city: NYC.name,
        cityId: NYC.id,
        background_color: backgrounConfig.GRAY.hex,
        background_colorId: backgrounConfig.GRAY.id,
        heightInFt: 347,
    },
    1000014: {
        name: '481 8th Ave',
        bname: '481 Eighth Ave',
        city: NYC.name,
        cityId: NYC.id,
        background_color: backgrounConfig.PINK.hex,
        background_colorId: backgrounConfig.PINK.id,
        heightInFt: 470,
    },
    1000015: {
        name: '767 5th Ave',
        bname: '767 5th Ave',
        city: NYC.name,
        cityId: NYC.id,
        background_color: backgrounConfig.PINK.hex,
        background_colorId: backgrounConfig.PINK.id,
        heightInFt: 705,
    },
    1000016: {
        name: 'FOAM Tower',
        bname: 'FOAM Tower',
        city: NYC.name,
        cityId: NYC.id,
        background_color: backgrounConfig.LIGHT_ORANGE.hex,
        background_colorId: backgrounConfig.LIGHT_ORANGE.id,
        heightInFt: 120,
    },
    1000017: {
        name: '96 Wythe Ave',
        bname: '96 Wythe Ave',
        city: NYC.name,
        cityId: NYC.id,
        background_color: backgrounConfig.PINK.hex,
        background_colorId: backgrounConfig.PINK.id,
        heightInFt: 107,
    },
    1000018: {
        name: '215 Moore',
        bname: '215 Moore',
        city: NYC.name,
        cityId: NYC.id,
        background_color: backgrounConfig.SPECIAL.hex,
        background_colorId: backgrounConfig.SPECIAL.id,
        heightInFt: 50,
    },
    1000019: {
        name: '1 World Trade Center',
        bname: '1 World Trade Center',
        city: NYC.name,
        cityId: NYC.id,
        background_color: backgrounConfig.LIGHT_YELLOW.hex,
        background_colorId: backgrounConfig.LIGHT_YELLOW.id,
        heightInFt: 1792,
    },
    1000020: {
        name: '96 Wythe Ave',
        bname: '96 Wythe Ave',
        city: NYC.name,
        cityId: NYC.id,
        background_color: backgrounConfig.LIGHT_ORANGE.hex,
        background_colorId: backgrounConfig.LIGHT_ORANGE.id,
        heightInFt: 107,
    },
    1000021: {
        name: '251 1st',
        bname: '251 1st',
        city: NYC.name,
        cityId: NYC.id,
        background_color: backgrounConfig.GRAY.hex,
        background_colorId: backgrounConfig.GRAY.id,
        heightInFt: 130,
    
    },
    1000022: {
        name: 'New York Subway #1',
        bname: 'New York Subway #1',
        city: NYC.name,
        cityId: NYC.id,
        background_color: backgrounConfig.AQUA.hex,
        background_colorId: backgrounConfig.AQUA.id,
        heightInFt: 60,
    },
};
