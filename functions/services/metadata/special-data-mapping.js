const {
  Atlanta,
  NYC,
  Chicago,
  SanFrancisco,
  Tokyo,
  London,
  Manchester,
  MarbleCity,
  Dessau,
  Paris,
  Stuttgart,
  Vyborg,
  Reykjavík
} = require("./cities");

const { config: backgrounConfig } = require("./background-colours");

// Don't export bname to the public!
module.exports = {
  0: {
    name: "241 Ralph McGill",
    bname: "Georgia Power",
    city: Atlanta.name,
    cityId: Atlanta.id,
    heightInFt: 299,
    heightInPx: 539.823,
    widthInPx: 300,
    widthInFt: 166
  },
  1: {
    name: "133 Peachtree",
    bname: "GP Tower",
    city: Atlanta.name,
    cityId: Atlanta.id,
    heightInFt: 697,
    heightInPx: 721.688,
    widthInPx: 310,
    widthInFt: 299
  },
  2: {
    name: "210 Peachtree",
    bname: "Westin Peachtree Plaza",
    city: Atlanta.name,
    cityId: Atlanta.id,
    heightInFt: 883,
    heightInPx: 656.736,
    widthInPx: 240,
    widthInFt: 323
  },
  3: {
    name: "150 N Michigan",
    bname: "Crain Communications",
    city: Chicago.name,
    cityId: Chicago.id,
    heightInFt: 582,
    heightInPx: 749.112,
    widthInPx: 290,
    widthInFt: 225
  },
  4: {
    name: "401 N Wabash",
    bname: "Trump Tower Chicago",
    city: Chicago.name,
    cityId: Chicago.id,
    heightInFt: 1388,
    heightInPx: 875.863,
    widthInPx: 255.206,
    widthInFt: 404
  },
  5: {
    name: "233 S Wacker",
    bname: "Willis Tower",
    city: Chicago.name,
    cityId: Chicago.id,
    heightInFt: 1729,
    heightInPx: 1683.608,
    widthInPx: 620,
    widthInFt: 637
  },
  6: {
    name: "222 Second Street",
    bname: "Linkedin Building",
    city: SanFrancisco.name,
    cityId: SanFrancisco.id,
    heightInFt: 370,
    heightInPx: 568.69,
    widthInPx: 320,
    widthInFt: 208
  },
  7: {
    name: "600 Montgomery",
    bname: "Transamerica Pyramid",
    city: SanFrancisco.name,
    cityId: SanFrancisco.id,
    heightInFt: 853,
    heightInPx: 929.899,
    widthInPx: 371.684,
    widthInFt: 341
  },
  8: {
    name: "One California",
    bname: "US Bank",
    city: SanFrancisco.name,
    cityId: SanFrancisco.id,
    heightInFt: 438,
    heightInPx: 689.934,
    widthInPx: 280,
    widthInFt: 178
  },
  9: {
    name: "One Bryant Park",
    bname: "BoA Tower",
    city: NYC.name,
    cityId: NYC.id,
    heightInFt: 1200,
    heightInPx: 782.31,
    widthInPx: 280,
    widthInFt: 429
  },
  10: {
    name: "56 Leonard",
    bname: "56 Leonard",
    city: NYC.name,
    cityId: NYC.id,
    heightInFt: 821,
    heightInPx: 946.533,
    widthInPx: 213.201,
    widthInFt: 185
  },
  11: {
    name: "601 Lexington",
    bname: "Citigroup Center",
    city: NYC.name,
    cityId: NYC.id,
    heightInFt: 915,
    heightInPx: 623.538,
    widthInPx: 170.145,
    widthInFt: 250
  },

  // FOAM scavenger
  12: {
    name: "745 7th Ave",
    bname: "745 7th Ave",
    city: NYC.name,
    cityId: NYC.id,
    heightInFt: 575,
    heightInPx: 1125.833,
    widthInPx: 520,
    widthInFt: 266
  },
  13: {
    name: "180 N Stetson",
    bname: "180 N Stetson",
    city: Chicago.name,
    cityId: Chicago.id,
    heightInFt: 994,
    heightInPx: 958.402,
    widthInPx: 260,
    widthInFt: 270
  },
  14: {
    name: "303 Peachtree",
    bname: "303 Peachtree",
    city: Atlanta.name,
    cityId: Atlanta.id,
    heightInFt: 902,
    heightInPx: 822.724,
    widthInPx: 230,
    widthInFt: 252
  },

  15: {
    name: "555 W Madison",
    bname: "555 W Madison",
    city: Chicago.name,
    cityId: Chicago.id,
    heightInFt: 461,
    heightInPx: 727.461,
    widthInPx: 270,
    widthInFt: 171
  },

  16: {
    name: "864 Spring",
    bname: "864 Spring",
    city: Atlanta.name,
    cityId: Atlanta.name,
    heightInFt: 500,
    heightInPx: 479.201,
    widthInPx: 270,
    widthInFt: 282
  },
  17: {
    name: "1585 Broadway",
    bname: "1585 Broadway",
    city: NYC.name,
    cityId: NYC.id,
    heightInFt: 685,
    heightInPx: 932.171,
    widthInPx: 415,
    widthInFt: 305
  },
  18: {
    name: "333 Bush",
    bname: "333 Bush",
    city: SanFrancisco.name,
    cityId: SanFrancisco.id,
    heightInFt: 495,
    heightInPx: 946.854,
    widthInPx: 340,
    widthInFt: 178
  },
  19: {
    name: "200 Vesey",
    bname: "200 Vesey",
    city: NYC.name,
    cityId: NYC.id,
    heightInFt: 739,
    heightInPx: 952.084,
    widthInPx: 540,
    widthInFt: 419
  },
  20: {
    name: "180 Maiden Lane",
    bname: "180 Maiden Lane",
    city: NYC.name,
    cityId: NYC.id,
    heightInFt: 554,
    heightInPx: 653.652,
    widthInPx: 260,
    widthInFt: 220
  },
  21: {
    name: "Lil Teddy",
    bname: "Lil Teddy",
    city: NYC.name,
    cityId: NYC.id,
    heightInFt: 100,
    heightInPx: 468.472,
    widthInPx: 300,
    widthInFt: 64
  },
  22: {
    name: "Uh Oh Asher",
    bname: "Uh Oh Asher",
    city: NYC.name,
    cityId: NYC.id,
    heightInFt: 350,
    heightInPx: 919.51,
    widthInPx: 520.456,
    widthInFt: 198
  },
  23: {
    name: "Big Cheese Tower",
    bname: "Big Cheese Tower",
    city: NYC.name,
    cityId: NYC.id,
    heightInFt: 300,
    heightInPx: 471.081,
    widthInPx: 135,
    widthInFt: 86
  },
  24: {
    name: "Big Mold Tower",
    bname: "Big Mold Toweer",
    city: NYC.name,
    cityId: NYC.id,
    heightInFt: 300,
    heightInPx: 471.081,
    widthInPx: 135,
    widthInFt: 86
  },
  25: {
    name: "OpenSea Tower",
    bname: "OpenSea Tower",
    city: NYC.name,
    cityId: NYC.id,
    heightInFt: 363,
    heightInPx: 689.933,
    widthInPx: 440,
    widthInFt: 232
  },
  26: {
    name: "KnownOrigin Tower",
    bname: "KnownOrigin Tower",
    city: Manchester.name,
    cityId: Manchester.id,
    heightInFt: 518,
    heightInPx: 822.724,
    widthInPx: 230,
    widthInFt: 145
  },
  27: {
    name: "4 NonFungible Tower",
    bname: "4 NonFungible Tower",
    city: NYC.name,
    cityId: NYC.id,
    heightInFt: 1200,
    heightInPx: 719.276,
    widthInPx: 280,
    widthInFt: 467
  },
  28: {
    name: "FOAM Tall Tower",
    bname: "FOAM Tall Tower",
    city: NYC.name,
    cityId: NYC.id,
    heightInFt: 240,
    heightInPx: 669.726,
    widthInPx: 270,
    widthInFt: 97
  },
  29: {
    name: "BoxSwap HQ",
    bname: "BoxSwap HQ",
    city: NYC.name,
    cityId: NYC.id,
    heightInFt: 240,
    heightInPx: 407.032,
    widthInPx: 270,
    widthInFt: 159
  },
  30: {
    name: "BlockCities Times Building",
    bname: "BlockCities Times Building",
    city: NYC.name,
    cityId: NYC.id,
    background_color: backgrounConfig.GRAY.hex,
    background_colorId: backgrounConfig.GRAY.id,
    heightInFt: 1046,
    heightInPx: 897.767,
    widthInPx: 222.5,
    widthInFt: 259
  },
  31: {
    name: "21 Main",
    bname: "21 Main",
    city: NYC.name,
    cityId: NYC.id,
    background_color: backgrounConfig.GRAY.hex,
    background_colorId: backgrounConfig.GRAY.id,
    heightInFt: ,
    heightInPx: ,
    widthInPx: ,
    widthInFt: 
  },
  32: {
    name: "16 Court",
    bname: "16 Court",
    city: NYC.name,
    cityId: NYC.id,
    background_color: backgrounConfig.BEIGE.hex,
    background_colorId: backgrounConfig.BEIGE.id,
    heightInFt: ,
    heightInPx: ,
    widthInPx: ,
    widthInFt: 
  },
  33: {
    name: "365 Bridge",
    bname: "365 Bridge",
    city: NYC.name,
    cityId: NYC.id,
    background_color: backgrounConfig.LIGHT_ORANGE.hex,
    background_colorId: backgrounConfig.LIGHT_ORANGE.id,
    heightInFt: ,
    heightInPx: ,
    widthInPx: ,
    widthInFt: 
  },



  // token 1 - 5
  1000000: {
    name: "BlockCities Genesis Building",
    bname: "Genesis",
    city: "Genesis",
    background_color: "#000000",
    heightInFt: 1400,
    heightInPx: 1672.921,
    widthInPx: 420.149,
    widthInFt: 352
  },
  1000001: {
    name: "375 Park Ave",
    bname: "375 Park Ave",
    city: NYC.name,
    cityId: NYC.id,
    heightInFt: 516,
    heightInPx: 724.575,
    widthInPx: 260,
    widthInFt: 185
  },
  1000002: {
    name: "133 Peachtree",
    bname: "133 Peachtree",
    city: Atlanta.name,
    cityId: Atlanta.id,
    heightInFt: 697,
    heightInPx: 721.688,
    widthInPx: 310,
    widthInFt: 299
  },
  1000003: {
    name: "200 East Randolph",
    bname: "200 East Randolph",
    city: SanFrancisco.name,
    cityId: SanFrancisco.id,
    heightInFt: 1076,
    heightInPx: 687.047,
    widthInPx: 171.25,
    widthInFt: 268
  },
  1000004: {
    name: "600 Montgomery",
    bname: "600 Montgomery",
    city: SanFrancisco.name,
    cityId: SanFrancisco.id,
    heightInFt: 853,
    heightInPx: 929.899,
    widthInPx: 371.684,
    widthInFt: 341
  },

  // NonFungible.com specials
  1000005: {
    name: "1 NonFungible Tower",
    bname: "1 NonFungible Tower",
    city: NYC.name,
    cityId: NYC.id,
    heightInFt: 630,
    heightInPx: 961.288,
    widthInPx: 420,
    widthInFt: 275
  },
  1000006: {
    name: "2 NonFungible Tower",
    bname: "2 NonFungible Tower",
    city: SanFrancisco.name,
    cityId: SanFrancisco.id,
    heightInFt: 438,
    heightInPx: 689.934,
    widthInPx: 285,
    widthInFt: 181
  },
  1000007: {
    name: "3 NonFungible Tower",
    bname: "3 NonFungible Tower",
    city: Chicago.name,
    cityId: Chicago.id,
    heightInFt: 600,
    heightInPx: 467.871,
    widthInPx: 255,
    widthInFt: 327
  },

  // Founder building
  1000008: {
    name: "Founder Building",
    bname: "Founder Building",
    city: "Genesis",
    heightInFt: 294,
    heightInPx: 685.805,
    widthInPx: 440.109,
    widthInFt: 189
  },

  // FOAM scavenger hunts
  1000009: {
    name: "Nakagin Capsule Tower",
    bname: "Nakagin Capsule Tower",
    city: Tokyo.name,
    cityId: Tokyo.id,
    background_color: backgrounConfig.SPECIAL.hex,
    background_colorId: backgrounConfig.SPECIAL.id,
    heightInFt: 177,
    heightInPx: 1056.551,
    widthInPx: 551.035,
    widthInFt: 92
  },
  1000010: {
    name: "Balfron Tower",
    bname: "Balfron Tower",
    city: London.name,
    cityId: London.id,
    background_color: backgrounConfig.PINK.hex,
    background_colorId: backgrounConfig.PINK.id,
    heightInFt: 276,
    heightInPx: 571.577,
    widthInPx: 380,
    widthInFt: 183
  },
  1000011: {
    name: "945 Madison Ave",
    bname: "945 Madison Ave",
    city: NYC.name,
    cityId: NYC.id,
    background_color: backgrounConfig.BEIGE.hex,
    background_colorId: backgrounConfig.BEIGE.id,
    heightInFt: 56,
    heightInPx: 627.014,
    widthInPx: 561.734,
    widthInFt: 50
  },
  1000012: {
    name: "626 1st Ave",
    bname: "626 1st Ave",
    city: NYC.name,
    cityId: NYC.id,
    background_color: backgrounConfig.ORANGE.hex,
    background_colorId: backgrounConfig.ORANGE.id,
    heightInFt: 540,
    heightInPx: 779.423,
    widthInPx: 545,
    widthInFt: 378
  },
  1000013: {
    name: "461 Dean Apartments",
    bname: "461 Dean Apartments",
    city: NYC.name,
    cityId: NYC.id,
    background_color: backgrounConfig.GRAY.hex,
    background_colorId: backgrounConfig.GRAY.id,
    heightInFt: 347,
    heightInPx: 649.519,
    widthInPx: 425,
    widthInFt: 347
  },
  1000014: {
    name: "481 8th Ave",
    bname: "481 Eighth Ave",
    city: NYC.name,
    cityId: NYC.id,
    background_color: backgrounConfig.PINK.hex,
    background_colorId: backgrounConfig.PINK.id,
    heightInFt: 470,
    heightInPx: 1062.324,
    widthInPx: 585,
    widthInFt: 259
  },
  1000015: {
    name: "767 5th Ave",
    bname: "767 5th Ave",
    city: NYC.name,
    cityId: NYC.id,
    background_color: backgrounConfig.PINK.hex,
    background_colorId: backgrounConfig.PINK.id,
    heightInFt: 705,
    heightInPx: 652.405,
    widthInPx: 350,
    widthInFt: 378
  },
  1000016: {
    name: "FOAM Tower",
    bname: "FOAM Tower",
    city: NYC.name,
    cityId: NYC.id,
    background_color: backgrounConfig.LIGHT_ORANGE.hex,
    background_colorId: backgrounConfig.LIGHT_ORANGE.id,
    heightInFt: 120,
    heightInPx: 502.294,
    widthInPx: 270,
    widthInFt: 65
  },
  1000017: {
    name: "96 Wythe Ave",
    bname: "96 Wythe Ave",
    city: NYC.name,
    cityId: NYC.id,
    background_color: backgrounConfig.PINK.hex,
    background_colorId: backgrounConfig.PINK.id,
    heightInFt: 107,
    heightInPx: 832.828,
    widthInPx: 780,
    widthInFt: 100
  },
  1000018: {
    name: "215 Moore",
    bname: "215 Moore",
    city: NYC.name,
    cityId: NYC.id,
    background_color: backgrounConfig.SPECIAL.hex,
    background_colorId: backgrounConfig.SPECIAL.id,
    heightInFt: 50,
    heightInPx: 513.696,
    widthInPx: 760.329,
    widthInFt: 74
  },
  1000019: {
    name: "1 World Trade Center",
    bname: "1 World Trade Center",
    city: NYC.name,
    cityId: NYC.id,
    background_color: backgrounConfig.LIGHT_YELLOW.hex,
    background_colorId: backgrounConfig.LIGHT_YELLOW.id,
    heightInFt: 1792,
    heightInPx: 812.7,
    widthInPx: 160,
    widthInFt: 353
  },
  1000020: {
    name: "96 Wythe Ave",
    bname: "96 Wythe Ave",
    city: NYC.name,
    cityId: NYC.id,
    background_color: backgrounConfig.LIGHT_ORANGE.hex,
    background_colorId: backgrounConfig.LIGHT_ORANGE.id,
    heightInFt: 107,
    heightInPx: 799.63,
    widthInPx: 780,
    widthInFt: 104
  },
  1000021: {
    name: "251 1st",
    bname: "251 1st",
    city: NYC.name,
    cityId: NYC.id,
    background_color: backgrounConfig.GRAY.hex,
    background_colorId: backgrounConfig.GRAY.id,
    heightInFt: 130,
    heightInPx: 548.482,
    widthInPx: 440,
    widthInFt: 104
  },
  1000022: {
    name: "New York Subway #1",
    bname: "New York Subway #1",
    city: NYC.name,
    cityId: NYC.id,
    background_color: backgrounConfig.AQUA.hex,
    background_colorId: backgrounConfig.AQUA.id,
    heightInFt: 60,
    heightInPx: 147.224,
    widthInPx: 170,
    widthInFt: 69
  },
  1000023: {
    name: "MarbleCard Tower",
    bname: "MarbleCard Tower",
    city: MarbleCity.name,
    cityId: MarbleCity.id,
    background_color: "#000000",
    heightInFt: 650,
    heightInPx: 831.384,
    widthInPx: 310.001,
    widthInFt: 242
  },
  1000024: {
    name: "101 Marietta",
    bname: "101 Marietta",
    city: Atlanta.name,
    cityId: Atlanta.id,
    background_color: backgrounConfig.PINK.hex,
    background_colorId: backgrounConfig.PINK.id,
    heightInFt: 459,
    heightInPx: 612.1,
    widthInPx: 270,
    widthInFt: 202
  },
  1000025: {
    name: "1585 Broadway",
    bname: "1585 Broadway",
    city: NYC.name,
    cityId: NYC.id,
    background_color: backgrounConfig.PINK.hex,
    background_colorId: backgrounConfig.PINK.id,
    heightInFt: 685,
    heightInPx: 932.2,
    widthInPx: 415,
    widthInFt: 305
  },
  1000026: {
    name: "222 Second",
    bname: "222 Second",
    city: SanFrancisco.name,
    cityId: SanFrancisco.id,
    background_color: backgrounConfig.PINK.hex,
    background_colorId: backgrounConfig.PINK.id,
    heightInFt: 370,
    heightInPx: 568.7,
    widthInPx: 320,
    widthInFt: 208
  },
  1000027: {
    name: "401 N Wabash",
    bname: "401 N Wabash",
    city: Chicago.name,
    cityId: Chicago.id,
    background_color: backgrounConfig.PINK.hex,
    background_colorId: backgrounConfig.PINK.id,
    heightInFt: 1388,
    heightInPx: 877.1,
    widthInPx: 255.2,
    widthInFt: 404
  },
  1000028: {
    name: "Bauhaus Dessau",
    bname: "Bauhaus Dessau",
    city: Dessau.name,
    cityId: Dessau.id,
    background_color: backgrounConfig.PINK.hex,
    background_colorId: backgrounConfig.PINK.id,
    heightInFt: 60,
    heightInPx: 515.066,
    widthInPx: 384.298,
    widthInFt: 45
  },
  1000029: {
    name: "2000 BlockCities Way",
    bname: "2000 BlockCities Way",
    city: "Genesis",
    background_color: backgrounConfig.LIGHT_ORANGE.hex,
    background_colorId: backgrounConfig.LIGHT_ORANGE.id,
    heightInFt: 456,
    heightInPx: 975.634,
    widthInPx: 420.151,
    widthInFt: 196
  },
  1000030: {
    name: "Queens Head",
    bname: "Queens Head",
    city: London.name,
    cityId: London.id,
    background_color: backgrounConfig.ORANGE.hex,
    background_colorId: backgrounConfig.ORANGE.id,
    heightInFt: 50,
    heightInPx: 469.819,
    widthInPx: 395,
    widthInFt: 42
  },
  1000031: {
    name: "6 Place Saint-Germain",
    bname: "6 Place Saint-Germain",
    city: Paris.name,
    cityId: Paris.id,
    background_color: backgrounConfig.GRAY.hex,
    background_colorId: backgrounConfig.GRAY.id,
    heightInFt: 105,
    heightInPx: 578.794,
    widthInPx: 502.5,
    widthInFt: 91
  },
  1000032: {
    name: "Mega Akihabara 3",
    bname: "Mega Akihabara 3",
    city: Tokyo.name,
    cityId: Tokyo.id,
    background_color: backgrounConfig.PINK.hex,
    background_colorId: backgrounConfig.PINK.id,
    heightInFt: 105,
    heightInPx: 744.06,
    widthInPx: 288.106,
    widthInFt: 41
  },
  1000033: {
    name: "Porscheplatz 1",
    bname: "Porscheplatz 1",
    city: Stuttgart.name,
    cityId: Stuttgart.id,
    background_color: backgrounConfig.GRAY.hex,
    background_colorId: backgrounConfig.GRAY.id,
    heightInFt: 91,
    heightInPx: 357.957,
    widthInPx: 660,
    widthInFt: 168
  },
  1000034: {
    name: "Vyborg Library",
    bname: "Vyborg Library",
    city: Vyborg.name,
    cityId: Vyborg.id,
    background_color: backgrounConfig.GRAY.hex,
    background_colorId: backgrounConfig.GRAY.id,
    heightInFt: 24,
    heightInPx: 363.731,
    widthInPx: 595,
    widthInFt: 39
  },
  1000035: {
    name: "Hallgrimskirkja",
    bname: "Hallgrimskirkja",
    city: Reykjavík.name,
    cityId: Reykjavík.id,
    background_color: backgrounConfig.LIGHT_YELLOW.hex,
    background_colorId: backgrounConfig.LIGHT_YELLOW.id,
    heightInFt: 244,
    heightInPx: 822.724,
    widthInPx: 643.926,
    widthInFt: 191
  },
  1000036: {
    name: "Brooklyn Gold",
    bname: "Brooklyn Gold",
    city: NYC.name,
    cityId: NYC.id,
    background_color: backgrounConfig.LIGHT_YELLOW.hex,
    background_colorId: backgrounConfig.LIGHT_YELLOW.id,
    heightInFt: ,
    heightInPx: ,
    widthInPx: ,
    widthInFt: 
  }
};
