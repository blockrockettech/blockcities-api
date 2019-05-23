const _ = require('lodash');

const SPECIAL = {
    id: 0,
    hex: 'FFEEBF',
    name: 'yellow'
};

const PINK = {
    id: 4,
    hex: 'F4DCDC',
    name: 'pink'
};

const ORANGE = {
    id: 5,
    hex: 'FCDBC8',
    name: 'orange'
};

const GRAY = {
    id: 7,
    hex: 'EBEDF0',
    name: 'grey'
};

const BEIGE = {
    id: 9,
    hex: 'F4EEE5',
    name: 'beige'
};

const LIGHT_ORANGE = {
    id: 10,
    hex: 'FBF3F0',
    name: 'lightorange'
};

const backgroundColorwaySwitch = (backgroundColorway, special = null) => {
    switch (backgroundColorway) {

        // All specials are zero by default
        case SPECIAL.id:

            // N:B. code smell, define the correct ID in the special
            // Override background for NonFungible.com specials
            if (_.includes([1000005, 1000006, 1000007], special)) {
                return {hex: 'BEEBFF', name: 'boldblue'};
            }

            // Otherwise return detail yellow special background
            return SPECIAL;

        case 1:
            return {hex: 'D5F0F3', name: 'aqua'};
        case 2:
            return {hex: 'C4D7F3', name: 'dullblue'};
        case 3:
            return {hex: 'ACCAFF', name: 'blueblue'};
        case PINK.id:
            return PINK;
        case ORANGE.id:
            return ORANGE;
        case 6:
            return {hex: 'BEEBFF', name: 'boldblue'};
        case GRAY.id:
            return GRAY;
        case 8:
            return {hex: '000000', name: 'black'};
        case BEIGE.id:
            return BEIGE;
        case LIGHT_ORANGE.id:
            return LIGHT_ORANGE;
        default:
            return GRAY;
    }
};

module.exports = {
    backgroundColorwaySwitch,
    config: {
        SPECIAL,
        PINK,
        ORANGE,
        GRAY,
        LIGHT_ORANGE,
        BEIGE
    }
};
