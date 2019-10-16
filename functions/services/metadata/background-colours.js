const _ = require('lodash');

const SPECIAL = {
    id: 0,
    hex: 'FFEEBF',
    name: 'yellow'
};

const AQUA = {
    id: 1,
    hex: 'D5F0F3',
    name: 'aqua'
};

const DULL_BLUE = {
    id: 2,
    hex: 'C4D7F3',
    name: 'dullblue'
};

const BLUE_BLUE = {
    id: 3,
    hex: 'ACCAFF',
    name: 'blueblue'
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

const BOLD_BLUE = {
    id: 6,
    hex: 'BEEBFF',
    name: 'boldblue'
};

const GRAY = {
    id: 7,
    hex: 'EBEDF0',
    name: 'grey'
};

const BLACK = {
    id: 8,
    hex: '000000',
    name: 'black'
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

const LIGHT_YELLOW = {
    id: 11,
    hex: 'FFF3D8',
    name: 'lightyellow'
};

const CARBON = {
    id: 12,
    hex: '2E3031',
    name: 'carbon'
};

const backgroundColorwaySwitch = (backgroundColorway, special = null) => {
    switch (backgroundColorway) {

        // All specials are zero by default
        case SPECIAL.id:

            // N:B. code smell, define the correct ID in the special
            // Override background for NonFungible.com specials
            if (_.includes([1000005, 1000006, 1000007], special)) {
                return BOLD_BLUE;
            }

            // Otherwise return detail yellow special background
            return SPECIAL;

        case AQUA.id:
            return AQUA;
        case DULL_BLUE.id:
            return DULL_BLUE;
        case BLUE_BLUE.id:
            return BLUE_BLUE;
        case PINK.id:
            return PINK;
        case ORANGE.id:
            return ORANGE;
        case BOLD_BLUE.id:
            return BOLD_BLUE;
        case GRAY.id:
            return GRAY;
        case BLACK.id:
            return BLACK;
        case BEIGE.id:
            return BEIGE;
        case LIGHT_ORANGE.id:
            return LIGHT_ORANGE;
        case LIGHT_YELLOW.id:
            return LIGHT_YELLOW;
        case CARBON.id:
            return CARBON;
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
        BEIGE,
        BLACK,
        BLUE_BLUE,
        BOLD_BLUE,
        DULL_BLUE,
        AQUA,
        LIGHT_YELLOW,
        CARBON,
    }
};
