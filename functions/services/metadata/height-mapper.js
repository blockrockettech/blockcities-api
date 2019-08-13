const buildingRatios = {
    0: 1.054380664653,
    1: 0.859598853868,
    2: 0.628294036061,
    3: 1.486910994764,
    4: 1.412037037037,
    5: 0.551169590643,
    6: 0.430622009569,
    7: 0.434509803922,
    8: 0.967930029155,
    9: 1.040939193257,
    10: 0.952998379254,
    11: 0.676716917923,
    12: 0.627118644068,
    13: 0.355453852021,
    14: 0.690763052209,
    15: 0.952054794521,
    16: 1.080816461,
    17: 0.906247812,
    18: 0.672695035,
    19: 1.092206908,
    20: 1.063739029,
    22: 0.817693326,
    23: 2.426279567,
    24: 0.796499678,
    25: 0.778371057,
    26: 1.045259747,
    28: 1.62057137,
};


// this it the standard width of the x-anchor on base 0
// anchor_145_187.652_230 << last number in the anchor in the SVG XML
const standardWidths = {
    0: 130,
    1: 250,
    2: 280,
    3: 170,
    4: 170,
    5: 270,
    6: 480,
    7: 430,
    8: 220,
    9: 480,
    10: 250,
    11: 280,
    12: 320,
    13: 500,
    14: 260,
    15: 260,
    16: 360,
    17: 230,
    18: 515,
    19: 260,
    20: 270,
    22: 270,
    23: 220,
    24: 280,
    25: 310,
    26: 180,
    28: 250,
};


// Low Rise	0-114.829
// High Rise 115-492
// Skyscraper 492-984
// Super-Tall Skyscraper 984-1969
// Mega-Tall Skyscraper	1969+

const heightInFootDescription = (footHeight) => {
    if (footHeight < 115) {
        return 'Low Rise';
    } else if (footHeight < 492) {
        return 'High Rise';
    } else if (footHeight < 984) {
        return 'Skyscraper';
    } else if (footHeight < 1969) {
        return 'Super-Tall Skyscraper';
    } else {
        return 'Mega-Tall Skyscraper';
    }
};

const heightMapper = ({adjustedWidth, pixelHeight, buildingId}) => {
    if (buildingRatios[buildingId]) {
        return Math.floor(((standardWidths[buildingId] / adjustedWidth) * pixelHeight) * buildingRatios[buildingId]);
    } else {
        console.error(`Unable to map building ratio [${buildingId}]`);
        return pixelHeight;
    }
};

module.exports = {
    heightMapper,
    heightInFootDescription,
};
