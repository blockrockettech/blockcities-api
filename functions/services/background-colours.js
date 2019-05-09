const _ = require('lodash');

module.exports = (backgroundColorway, special = null) => {
    switch (backgroundColorway) {

        // All specials are zero by default
        case 0:

            // FIXME this is a bit hacky
            // override backgroun for NonFungible.com specials
            if (_.includes([1000005, 1000006, 1000007], special)) {
                return {hex: 'BEEBFF', name: 'boldblue'};
            }
            // Otherwise return detail yellow special background
            return {hex: 'FFEEBF', name: 'yellow'};

        case 1:
            return {hex: 'D5F0F3', name: 'aqua'};
        case 2:
            return {hex: 'C4D7F3', name: 'dullblue'};
        case 3:
            return {hex: 'ACCAFF', name: 'blueblue'};
        case 4:
            return {hex: 'F4DCDC', name: 'pink'};
        case 5:
            return {hex: 'FCDBC8', name: 'orange'};
        case 6:
            return {hex: 'BEEBFF', name: 'boldblue'};
        case 7:
            return {hex: 'EBEDF0', name: 'grey'};
        case 8:
            return {hex: '000000', name: 'black'};
        default:
            return {hex: 'EBEDF0', name: 'grey'};
    }
};
