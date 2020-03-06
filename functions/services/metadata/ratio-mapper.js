const buildingRatios = {
    0: 1.070100801043,
    1: 0.886747557749,
    2: 0.648068669528,
    3: 1.537333105981,
    4: 1.469190355689,
    5: 0.57373219642,
    6: 0.440011303401,
    7: 0.439274293494,
    8: 0.990961949449,
    9: 1.051462682501,
    10: 0.979260658203,
    11: 0.696257615318,
    12: 0.627118644068,
    13: 0.355453852021,
    14: 0.707744175169,
    15: 0.982462340416,
    16: 0.650795549707,
    17: 0.642412897694,
    18: 0.510469054478,
    19: 0.667502020072,
    20: 0.750067408019,
    22: 0.653220504337,
    23: 0.661154249033,
    24: 0.608700962928,
    25: 0.735023493926,
    26: 0.457720721915,
    28: 0.760443613452,
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

const getStandardWidth = (buildingId, body) => {

    const specialBodies = [1, 2, 11, 12, 17, 18];

    if (specialBodies.indexOf(body) > -1) {

        if (body === 18 && buildingId !== 9) {
            return standardWidths[buildingId];
        }

        return 320;
    } else {
        return standardWidths[buildingId];
    }
};

const ratioMapper = ({ adjustedWidth, pixels, buildingId, body }) => {
    if (buildingRatios[buildingId]) {
        return Math.floor(((getStandardWidth(buildingId, body) / adjustedWidth) * pixels) * buildingRatios[buildingId]);
    } else {
        console.error(`Unable to map building ratio [${buildingId}]`);
        return pixels;
    }
};

module.exports = {
    ratioMapper,
    heightInFootDescription,
    buildingRatios,
    standardWidths,
};
