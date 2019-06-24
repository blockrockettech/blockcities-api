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

const heightMapper = ({standardWidth, adjustedWidth, pixelHeight, buildingId}) => {
    if (buildingRatios[buildingId]) {
        return Math.floor(((standardWidth / adjustedWidth) * pixelHeight) * buildingRatios[buildingId]);
    } else {
        console.error(`Unable to map building ratio [${buildingId}]`);
        return pixelHeight;
    }
};

module.exports = {
    heightMapper,
    heightInFootDescription,
};
