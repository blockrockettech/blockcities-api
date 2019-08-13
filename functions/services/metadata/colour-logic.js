//  # | Exterior | Roof Window | Body Window | Base Window |
// 0	Red	Dark Grey	Dark Grey	Dark Grey
//
// 1	Dark Grey	Gold	Gold	Gold
// 2	Dark Grey	Aqua Blue	Aqua Blue	Aqua Blue
// 3	Dark Grey	True Blue	True Blue	True Blue
//
// 4	Light Beige	Gold	Gold	Gold
// 5	Light Beige	Aqua Blue	Aqua Blue	Aqua Blue
// 6	Light Beige	True Blue	True Blue	True Blue
// 7	Light Beige	Dark Grey	Dark Grey	Dark Grey
// 8	Light Beige	Dark Grey	Dark Grey	Gold
//
// 9	Dark Brown	Gold	Gold	Gold
//
// 10	Light Grey	Gold	Gold	Gold
// 11	Light Grey	Dark Grey	Dark Grey	Dark Grey
// 12	Light Grey	Dark Grey	Dark Grey	Gold
// 13	Light Grey	Gold 	Gold	Dark Grey
//
// 14	Black	Gold	Gold	Gold
// 15	Black	Dark Grey	Dark Grey	Dark Grey
// 16	Black	Dark Grey	Dark Grey	Gold
// 17	Black	Gold 	Gold	Dark Grey
// 18	Black	Aqua Blue	Aqua Blue	Aqua Blue
// 19	Black	True Blue	True Blue	True Blue

const colorLogicObj = {
    '0': {
        exterior: {
            roof: 'red',
            body: 'red',
            base: 'red'
        },
        windows: {
            roof: 'darkgrey',
            body: 'darkgrey',
            base: 'darkgrey'
        },
        concrete: 'classic',
    },
    '1': {
        exterior: {
            roof: 'darkgrey',
            body: 'darkgrey',
            base: 'darkgrey'
        },
        windows: {
            roof: 'gold',
            body: 'gold',
            base: 'gold'
        },
        concrete: 'classic',
    },
    '2': {
        exterior: {
            roof: 'darkgrey',
            body: 'darkgrey',
            base: 'darkgrey'
        },
        windows: {
            roof: 'aquablue',
            body: 'aquablue',
            base: 'aquablue'
        },
        concrete: 'classic',
    },
    '3': {
        exterior: {
            roof: 'darkgrey',
            body: 'darkgrey',
            base: 'darkgrey'
        },
        windows: {
            roof: 'trueblue',
            body: 'trueblue',
            base: 'trueblue'
        },
        concrete: 'classic',
    },
    '4': {
        exterior: {
            roof: 'lightbeige',
            body: 'lightbeige',
            base: 'lightbeige'
        },
        windows: {
            roof: 'gold',
            body: 'gold',
            base: 'gold'
        },
        concrete: 'classic',
    },
    '5': {
        exterior: {
            roof: 'lightbeige',
            body: 'lightbeige',
            base: 'lightbeige'
        },
        windows: {
            roof: 'aquablue',
            body: 'aquablue',
            base: 'aquablue'
        },
        concrete: 'classic',
    },
    '6': {
        exterior: {
            roof: 'lightbeige',
            body: 'lightbeige',
            base: 'lightbeige'
        },
        windows: {
            roof: 'trueblue',
            body: 'trueblue',
            base: 'trueblue'
        },
        concrete: 'classic',
    },
    '7': {
        exterior: {
            roof: 'lightbeige',
            body: 'lightbeige',
            base: 'lightbeige'
        },
        windows: {
            roof: 'darkgrey',
            body: 'darkgrey',
            base: 'darkgrey'
        },
        concrete: 'classic',
    },
    '8': {
        exterior: {
            roof: 'lightbeige',
            body: 'lightbeige',
            base: 'lightbeige'
        },
        windows: {
            roof: 'darkgrey',
            body: 'darkgrey',
            base: 'gold'
        },
        concrete: 'classic',
    },
    '9': {
        exterior: {
            roof: 'darkbrown',
            body: 'darkbrown',
            base: 'darkbrown'
        },
        windows: {
            roof: 'gold',
            body: 'gold',
            base: 'gold'
        },
        concrete: 'classic',
    },
    '10': {
        exterior: {
            roof: 'lightgrey',
            body: 'lightgrey',
            base: 'lightgrey'
        },
        windows: {
            roof: 'gold',
            body: 'gold',
            base: 'gold'
        },
        concrete: 'classic',
    },
    '11': {
        exterior: {
            roof: 'lightgrey',
            body: 'lightgrey',
            base: 'lightgrey'
        },
        windows: {
            roof: 'darkgrey',
            body: 'darkgrey',
            base: 'darkgrey'
        },
        concrete: 'classic',
    },
    '12': {
        exterior: {
            roof: 'lightgrey',
            body: 'lightgrey',
            base: 'lightgrey'
        },
        windows: {
            roof: 'darkgrey',
            body: 'darkgrey',
            base: 'gold'
        },
        concrete: 'classic',
    },
    '13': {
        exterior: {
            roof: 'lightgrey',
            body: 'lightgrey',
            base: 'lightgrey'
        },
        windows: {
            roof: 'gold',
            body: 'gold',
            base: 'darkgrey'
        },
        concrete: 'classic',
    },
    '14': {
        exterior: {
            roof: 'black',
            body: 'black',
            base: 'black'
        },
        windows: {
            roof: 'gold',
            body: 'gold',
            base: 'gold'
        },
        concrete: 'classic',
    },
    '15': {
        exterior: {
            roof: 'black',
            body: 'black',
            base: 'black'
        },
        windows: {
            roof: 'darkgrey',
            body: 'darkgrey',
            base: 'darkgrey'
        },
        concrete: 'classic',
    },
    '16': {
        exterior: {
            roof: 'black',
            body: 'black',
            base: 'black'
        },
        windows: {
            roof: 'darkgrey',
            body: 'darkgrey',
            base: 'gold'
        },
        concrete: 'classic',
    },
    '17': {
        exterior: {
            roof: 'black',
            body: 'black',
            base: 'black'
        },
        windows: {
            roof: 'gold',
            body: 'gold',
            base: 'darkgrey'
        },
        concrete: 'classic',
    },
    '18': {
        exterior: {
            roof: 'black',
            body: 'black',
            base: 'black'
        },
        windows: {
            roof: 'aquablue',
            body: 'aquablue',
            base: 'aquablue'
        },
        concrete: 'classic',
    },
    '19': {
        exterior: {
            roof: 'black',
            body: 'black',
            base: 'black'
        },
        windows: {
            roof: 'trueblue',
            body: 'trueblue',
            base: 'trueblue'
        },
        concrete: 'classic',
    },
    '20': {
        exterior: {
            roof: 'red',
            body: 'red',
            base: 'red'
        },
        windows: {
            roof: 'black',
            body: 'black',
            base: 'black'
        },
        concrete: 'classic',
    },
    '21': {
        exterior: {
            roof: 'goldenbeige',
            body: 'goldenbeige',
            base: 'goldenbeige'
        },
        windows: {
            roof: 'aquablue',
            body: 'aquablue',
            base: 'aquablue'
        },
        concrete: 'classic',
    },
    '22': {
        exterior: {
            roof: 'goldenbeige',
            body: 'goldenbeige',
            base: 'goldenbeige'
        },
        windows: {
            roof: 'trueblue',
            body: 'trueblue',
            base: 'trueblue'
        },
        concrete: 'classic',
    },
    '23': {
        exterior: {
            roof: 'goldenbeige',
            body: 'goldenbeige',
            base: 'goldenbeige'
        },
        windows: {
            roof: 'black',
            body: 'black',
            base: 'black'
        },
        concrete: 'classic',
    },
    '24': {
        exterior: {
            roof: 'blush',
            body: 'blush',
            base: 'blush'
        },
        windows: {
            roof: 'black',
            body: 'black',
            base: 'black'
        },
        concrete: 'classic',
    },
    '25': {
        exterior: {
            roof: 'blush',
            body: 'blush',
            base: 'blush'
        },
        windows: {
            roof: 'darkgrey',
            body: 'darkgrey',
            base: 'darkgrey'
        },
        concrete: 'classic',
    },
    '26': {
        exterior: {
            roof: 'blush',
            body: 'blush',
            base: 'blush'
        },
        windows: {
            roof: 'lightgrey',
            body: 'lightgrey',
            base: 'lightgrey'
        },
        concrete: 'classic',
    },
    '27': {
        exterior: {
            roof: 'blush',
            body: 'blush',
            base: 'blush'
        },
        windows: {
            roof: 'black',
            body: 'black',
            base: 'darkgrey'
        },
        concrete: 'classic',
    },
    '28': {
        exterior: {
            roof: 'blush',
            body: 'blush',
            base: 'blush'
        },
        windows: {
            roof: '',
            body: '',
            base: ''
        },
        concrete: 'classic',
    },
    '29': {
        exterior: {
            roof: 'blush',
            body: 'blush',
            base: 'blush'
        },
        windows: {
            roof: '',
            body: '',
            base: ''
        },
        concrete: 'classic',
    },
    '30': {
        exterior: {
            roof: '',
            body: '',
            base: ''
        },
        windows: {
            roof: '',
            body: '',
            base: ''
        },
        concrete: 'classic',
    },
    '31': {
        exterior: {
            roof: '',
            body: '',
            base: ''
        },
        windows: {
            roof: '',
            body: '',
            base: ''
        },
        concrete: 'classic',
    },
    '32': {
        exterior: {
            roof: '',
            body: '',
            base: ''
        },
        windows: {
            roof: '',
            body: '',
            base: ''
        },
        concrete: 'classic',
    },
    '33': {
        exterior: {
            roof: '',
            body: '',
            base: ''
        },
        windows: {
            roof: '',
            body: '',
            base: ''
        },
        concrete: 'classic',
    },
    '34': {
        exterior: {
            roof: '',
            body: '',
            base: ''
        },
        windows: {
            roof: '',
            body: '',
            base: ''
        },
        concrete: 'classic',
    },
    '35': {
        exterior: {
            roof: '',
            body: '',
            base: ''
        },
        windows: {
            roof: '',
            body: '',
            base: ''
        },
        concrete: 'classic',
    },
    '36': {
        exterior: {
            roof: '',
            body: '',
            base: ''
        },
        windows: {
            roof: '',
            body: '',
            base: ''
        },
        concrete: 'classic',
    },
    '37': {
        exterior: {
            roof: '',
            body: '',
            base: ''
        },
        windows: {
            roof: '',
            body: '',
            base: ''
        },
        concrete: 'classic',
    },
    '38': {
        exterior: {
            roof: '',
            body: '',
            base: ''
        },
        windows: {
            roof: '',
            body: '',
            base: ''
        },
        concrete: 'classic',
    },
    '39': {
        exterior: {
            roof: '',
            body: '',
            base: ''
        },
        windows: {
            roof: '',
            body: '',
            base: ''
        },
        concrete: 'classic',
    },
    '40': {
        exterior: {
            roof: '',
            body: '',
            base: ''
        },
        windows: {
            roof: '',
            body: '',
            base: ''
        },
        concrete: 'classic',
    },
    '41': {
        exterior: {
            roof: '',
            body: '',
            base: ''
        },
        windows: {
            roof: '',
            body: '',
            base: ''
        },
        concrete: 'classic',
    },
    '42': {
        exterior: {
            roof: '',
            body: '',
            base: ''
        },
        windows: {
            roof: '',
            body: '',
            base: ''
        },
        concrete: 'classic',
    },
    '43': {
        exterior: {
            roof: '',
            body: '',
            base: ''
        },
        windows: {
            roof: '',
            body: '',
            base: ''
        },
        concrete: 'classic',
    },
    '44': {
        exterior: {
            roof: '',
            body: '',
            base: ''
        },
        windows: {
            roof: '',
            body: '',
            base: ''
        },
        concrete: 'classic',
    },
    '45': {
        exterior: {
            roof: '',
            body: '',
            base: ''
        },
        windows: {
            roof: '',
            body: '',
            base: ''
        },
        concrete: 'classic',
    },
    '46': {
        exterior: {
            roof: '',
            body: '',
            base: ''
        },
        windows: {
            roof: '',
            body: '',
            base: ''
        },
        concrete: 'classic',
    },
    '47': {
        exterior: {
            roof: '',
            body: '',
            base: ''
        },
        windows: {
            roof: '',
            body: '',
            base: ''
        },
        concrete: 'classic',
    },
    '48': {
        exterior: {
            roof: '',
            body: '',
            base: ''
        },
        windows: {
            roof: '',
            body: '',
            base: ''
        },
        concrete: 'classic',
    },
    '49': {
        exterior: {
            roof: '',
            body: '',
            base: ''
        },
        windows: {
            roof: '',
            body: '',
            base: ''
        },
        concrete: 'classic',
    },
    '50': {
        exterior: {
            roof: '',
            body: '',
            base: ''
        },
        windows: {
            roof: '',
            body: '',
            base: ''
        },
        concrete: 'classic',
    },
    '51': {
        exterior: {
            roof: '',
            body: '',
            base: ''
        },
        windows: {
            roof: '',
            body: '',
            base: ''
        },
        concrete: 'classic',
    },
    '52': {
        exterior: {
            roof: '',
            body: '',
            base: ''
        },
        windows: {
            roof: '',
            body: '',
            base: ''
        },
        concrete: 'classic',
    },
    '53': {
        exterior: {
            roof: '',
            body: '',
            base: ''
        },
        windows: {
            roof: '',
            body: '',
            base: ''
        },
        concrete: 'classic',
    },
    '54': {
        exterior: {
            roof: '',
            body: '',
            base: ''
        },
        windows: {
            roof: '',
            body: '',
            base: ''
        },
        concrete: 'classic',
    },
    '55': {
        exterior: {
            roof: '',
            body: '',
            base: ''
        },
        windows: {
            roof: '',
            body: '',
            base: ''
        },
        concrete: 'classic',
    },
    '56': {
        exterior: {
            roof: '',
            body: '',
            base: ''
        },
        windows: {
            roof: '',
            body: '',
            base: ''
        },
        concrete: 'classic',
    },
    '57': {
        exterior: {
            roof: '',
            body: '',
            base: ''
        },
        windows: {
            roof: '',
            body: '',
            base: ''
        },
        concrete: 'classic',
    },
    '58': {
        exterior: {
            roof: '',
            body: '',
            base: ''
        },
        windows: {
            roof: '',
            body: '',
            base: ''
        },
        concrete: 'classic',
    },
    '59': {
        exterior: {
            roof: '',
            body: '',
            base: ''
        },
        windows: {
            roof: '',
            body: '',
            base: ''
        },
        concrete: 'classic',
    },
    '60': {
        exterior: {
            roof: '',
            body: '',
            base: ''
        },
        windows: {
            roof: '',
            body: '',
            base: ''
        },
        concrete: 'classic',
    },
    '666': {
        exterior: {
            roof: 'red',
            body: 'lightbeige',
            base: 'red'
        },
        windows: {
            roof: 'trueblue',
            body: 'trueblue',
            base: 'trueblue'
        },
        concrete: 'gold',
    },
};

module.exports = colorLogicObj;
