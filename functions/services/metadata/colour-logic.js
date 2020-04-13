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
            roof: 'lightgrey',
            body: 'lightgrey',
            base: 'darkgrey'
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
            roof: 'black',
            body: 'black',
            base: 'lightgrey'
        },
        concrete: 'classic',
    },
    '30': {
        exterior: {
            roof: 'dijon',
            body: 'dijon',
            base: 'dijon'
        },
        windows: {
            roof: 'black',
            body: 'black',
            base: 'black'
        },
        concrete: 'classic',
    },
    '31': {
        exterior: {
            roof: 'dijon',
            body: 'dijon',
            base: 'dijon'
        },
        windows: {
            roof: 'black',
            body: 'black',
            base: 'lightgrey'
        },
        concrete: 'classic',
    },
    '32': {
        exterior: {
            roof: 'dijon',
            body: 'dijon',
            base: 'dijon'
        },
        windows: {
            roof: 'lightgrey',
            body: 'lightgrey',
            base: 'darkgrey'
        },
        concrete: 'classic',
    },
    '33': {
        exterior: {
            roof: 'dijon',
            body: 'dijon',
            base: 'dijon'
        },
        windows: {
            roof: 'black',
            body: 'black',
            base: 'darkgrey'
        },
        concrete: 'classic',
    },
    '34': {
        exterior: {
            roof: 'dijon',
            body: 'dijon',
            base: 'dijon'
        },
        windows: {
            roof: 'lightgrey',
            body: 'lightgrey',
            base: 'lightgrey'
        },
        concrete: 'classic',
    },
    '35': {
        exterior: {
            roof: 'dijon',
            body: 'dijon',
            base: 'dijon'
        },
        windows: {
            roof: 'darkgrey',
            body: 'darkgrey',
            base: 'darkgrey'
        },
        concrete: 'classic',
    },
    '36': {
        exterior: {
            roof: 'coolgrey',
            body: 'coolgrey',
            base: 'coolgrey'
        },
        windows: {
            roof: 'black',
            body: 'black',
            base: 'black'
        },
        concrete: 'classic',
    },
    '37': {
        exterior: {
            roof: 'coolgrey',
            body: 'coolgrey',
            base: 'coolgrey'
        },
        windows: {
            roof: 'darkgrey',
            body: 'darkgrey',
            base: 'darkgrey'
        },
        concrete: 'classic',
    },
    '38': {
        exterior: {
            roof: 'coolgrey',
            body: 'coolgrey',
            base: 'coolgrey'
        },
        windows: {
            roof: 'aquablue',
            body: 'aquablue',
            base: 'aquablue'
        },
        concrete: 'classic',
    },
    '39': {
        exterior: {
            roof: 'coolgrey',
            body: 'coolgrey',
            base: 'coolgrey'
        },
        windows: {
            roof: 'trueblue',
            body: 'trueblue',
            base: 'trueblue'
        },
        concrete: 'classic',
    },
    '40': {
        exterior: {
            roof: 'coolgrey',
            body: 'coolgrey',
            base: 'coolgrey'
        },
        windows: {
            roof: 'navy',
            body: 'navy',
            base: 'navy'
        },
        concrete: 'classic',

    },
    '41': {
        exterior: {
            roof: 'coolgrey',
            body: 'coolgrey',
            base: 'coolgrey'
        },
        windows: {
            roof: 'turquoise',
            body: 'turquoise',
            base: 'turquoise'
        },
        concrete: 'classic',
    },
    '42': {
        exterior: {
            roof: 'limestone',
            body: 'limestone',
            base: 'limestone'
        },
        windows: {
            roof: 'gold',
            body: 'gold',
            base: 'gold'
        },
        concrete: 'limestone',
    },
    '43': {
        exterior: {
            roof: 'limestone',
            body: 'limestone',
            base: 'limestone'
        },
        windows: {
            roof: 'aquablue',
            body: 'aquablue',
            base: 'aquablue'
        },
        concrete: 'limestone',
    },
    '44': {
        exterior: {
            roof: 'limestone',
            body: 'limestone',
            base: 'limestone'
        },
        windows: {
            roof: 'trueblue',
            body: 'trueblue',
            base: 'trueblue'
        },
        concrete: 'limestone',
    },
    '45': {
        exterior: {
            roof: 'limestone',
            body: 'limestone',
            base: 'limestone'
        },
        windows: {
            roof: 'darkgrey',
            body: 'darkgrey',
            base: 'darkgrey'
        },
        concrete: 'limestone',
    },
    '46': {
        exterior: {
            roof: 'limestone',
            body: 'limestone',
            base: 'limestone'
        },
        windows: {
            roof: 'darkgrey',
            body: 'darkgrey',
            base: 'gold'
        },
        concrete: 'limestone',
    },
    '47': {
        exterior: {
            roof: 'limestone',
            body: 'limestone',
            base: 'limestone'
        },
        windows: {
            roof: 'navy',
            body: 'navy',
            base: 'navy'
        },
        concrete: 'limestone',

    },
    '48': {
        exterior: {
            roof: 'lightgrey',
            body: 'lightgrey',
            base: 'lightgrey'
        },
        windows: {
            roof: 'navy',
            body: 'navy',
            base: 'navy'
        },
        concrete: 'classic',
    },
    '49': {
        exterior: {
            roof: 'lightgrey',
            body: 'lightgrey',
            base: 'lightgrey'
        },
        windows: {
            roof: 'turquoise',
            body: 'turquoise',
            base: 'turquoise'
        },
        concrete: 'classic',
    },
    '50': {
        exterior: {
            roof: 'lightgrey',
            body: 'lightgrey',
            base: 'lightgrey'
        },
        windows: {
            roof: 'bluegrey',
            body: 'bluegrey',
            base: 'bluegrey'
        },
        concrete: 'classic',

    },
    '51': {
        exterior: {
            roof: 'lightbeige',
            body: 'lightbeige',
            base: 'lightbeige'
        },
        windows: {
            roof: 'navy',
            body: 'navy',
            base: 'navy'
        },
        concrete: 'classic',

    },
    '52': {
        exterior: {
            roof: 'lightbeige',
            body: 'lightbeige',
            base: 'lightbeige'
        },
        windows: {
            roof: 'turquoise',
            body: 'turquoise',
            base: 'turquoise'
        },
        concrete: 'classic',
    },
    '53': {
        exterior: {
            roof: 'lightbeige',
            body: 'lightbeige',
            base: 'lightbeige'
        },
        windows: {
            roof: 'bluegrey',
            body: 'bluegrey',
            base: 'bluegrey'
        },
        concrete: 'classic',
    },
    '54': {
        exterior: {
            roof: 'lightbeige',
            body: 'lightbeige',
            base: 'lightbeige'
        },
        windows: {
            roof: 'turquoise',
            body: 'turquoise',
            base: 'darkgrey'
        },
        concrete: 'classic',
    },
    '55': {
        exterior: {
            roof: 'carbon',
            body: 'carbon',
            base: 'carbon'
        },
        windows: {
            roof: 'lightcarbon',
            body: 'lightcarbon',
            base: 'lightcarbon'
        },
        concrete: 'dark',
     },
     '56': {
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

    // Brownstone Collection

    '57': {
        exterior: {
            roof: 'beige',
            body: 'beige',
            base: 'oat'
        },
        windows: {
            roof: 'black',
            body: 'black',
            base: 'black'
        },
        slope: {
            roof: 'oak',
            body: 'oak',
            base: 'goldenoat'
        },
        crown: {
            roof: 'oak',
            body: 'oak',
            base: 'goldenoat'
        },
        concrete: 'classic',
    },

    '58': {
        exterior: {
            roof: 'beige',
            body: 'beige',
            base: 'oat'
        },
        windows: {
            roof: 'black',
            body: 'black',
            base: 'black'
        },
        slope: {
            // roof: 'ink',
            // body: 'ink',
            base: 'goldenoat'
        },
        crown: {
            roof: 'ink',
            body: 'ink',
            base: 'goldenoat'
        },
        concrete: 'classic',
    },

    '59': {
        exterior: {
            roof: 'beige',
            body: 'beige',
            base: 'oat'
        },
        windows: {
            roof: 'black',
            body: 'black',
            base: 'black'
        },
        slope: {
            roof: 'agedcopper',
            body: 'agedcopper',
            base: 'goldenoat'
        },
        crown: {
            roof: 'agedcopper',
            body: 'agedcopper',
            base: 'goldenoat'
        },
        concrete: 'classic',
    },

    

    //Black Towers

    '61': {
        exterior: {
            roof: 'darkgrey',
            body: 'darkgrey',
            base: 'darkgrey'
        },
        windows: {
            roof: 'black',
            body: 'black',
            base: 'black'
        },
        slope: {
            roof: 'stumpbrown',
            body: 'stumpbrown',
            base: 'agedcopper'
        },
        crown: {
            roof: 'stumpbrown',
            body: 'stumpbrown',
            base: 'black'
        },
        concrete: 'classic',
    },

    '62': {
        exterior: {
            roof: 'darkgrey',
            body: 'darkgrey',
            base: 'darkgrey'
        },
        windows: {
            roof: 'black',
            body: 'black',
            base: 'black'
        },
        slope: {
            roof: 'stumpbrown',
            body: 'stumpbrown',
            base: 'ink'
        },
        crown: {
            roof: 'stumpbrown',
            body: 'stumpbrown',
            base: 'black'
        },
        concrete: 'classic',
    },

    '63': {
        exterior: {
            roof: 'darkgrey',
            body: 'darkgrey',
            base: 'darkgrey'
        },
        windows: {
            roof: 'black',
            body: 'black',
            base: 'black'
        },
        slope: {
            roof: 'stumpbrown',
            body: 'stumpbrown',
            base: 'goldenoat'
        },
        crown: {
            roof: 'stumpbrown',
            body: 'stumpbrown',
            base: 'black'
        },
        concrete: 'classic',
    },

    '64': {
        exterior: {
            roof: 'truegrey',
            body: 'truegrey',
            base: 'carbon'
        },
        windows: {
            roof: 'lightcarbon',
            body: 'lightcarbon',
            base: 'lightgrey'
        },
        slope: {
            roof: 'stumpbrown',
            body: 'stumpbrown',
            base: 'agedcopper'
        },
        crown: {
            roof: 'stumpbrown',
            body: 'stumpbrown',
            base: 'black'
        },
        concrete: 'classic',
    },

    '65': {
        exterior: {
            roof: 'truegrey',
            body: 'truegrey',
            base: 'carbon'
        },
        windows: {
            roof: 'black',
            body: 'black',
            base: 'gold'
        },
        slope: {
            roof: 'stumpbrown',
            body: 'stumpbrown',
            base: 'agedcopper'
        },
        crown: {
            roof: 'stumpbrown',
            body: 'stumpbrown',
            base: 'black'
        },
        concrete: 'classic',
    },

    '66': {
        exterior: {
            roof: 'truegrey',
            body: 'truegrey',
            base: 'carbon'
        },
        windows: {
            roof: 'black',
            body: 'black',
            base: 'lightgrey'
        },
        slope: {
            roof: '',
            body: '',
            base: 'gold'
        },
        crown: {
            roof: '',
            body: '',
            base: 'black'
        },
        concrete: 'classic',
    },

    '67': {
        exterior: {
            roof: 'carbon',
            body: 'carbon',
            base: 'truegrey'
        },
        windows: {
            roof: 'black',
            body: 'black',
            base: 'lightgrey'
        },
        slope: {
            roof: '',
            body: '',
            base: 'gold'
        },
        crown: {
            roof: '',
            body: '',
            base: 'gold'
        },
        concrete: 'classic',
    },

    '68': {
        exterior: {
            roof: 'carbon',
            body: 'carbon',
            base: 'carbon'
        },
        windows: {
            roof: 'lightcarbon',
            body: 'lightcarbon',
            base: 'lightcarbon'
        },
        slope: {
            roof: '',
            body: '',
            base: 'gold'
        },
        crown: {
            roof: '',
            body: '',
            base: 'black'
        },
        concrete: 'classic',
    },

    '69': {
        exterior: {
            roof: 'carbon',
            body: 'carbon',
            base: 'carbon'
        },
        windows: {
            roof: 'lightcarbon',
            body: 'lightcarbon',
            base: 'lightcarbon'
        },
        slope: {
            roof: '',
            body: '',
            base: 'bronze'
        },
        crown: {
            roof: '',
            body: '',
            base: 'black'
        },
        concrete: 'classic',
    },

    '70': {
        exterior: {
            roof: 'carbon',
            body: 'carbon',
            base: 'carbon'
        },
        windows: {
            roof: 'lightcarbon',
            body: 'lightcarbon',
            base: 'lightcarbon'
        },
        slope: {
            roof: '',
            body: '',
            base: 'silver'
        },
        crown: {
            roof: '',
            body: '',
            base: 'black'
        },
        concrete: 'classic',
    },


    '71': {
        exterior: {
            roof: 'carbon',
            body: 'carbon',
            base: 'carbon'
        },
        windows: {
            roof: 'lightcarbon',
            body: 'lightcarbon',
            base: 'lightcarbon'
        },
        slope: {
            roof: '',
            body: '',
            base: 'silver'
        },
        crown: {
            roof: '',
            body: '',
            base: 'silver'
        },
        concrete: 'classic',
    },

    //Wburg Tower Exterior

    '72': {
        exterior: {
            roof: 'lightbrown',
            body: 'lightbrown',
            base: 'limegrey'
        },
        windows: {
            roof: 'black',
            body: 'black',
            base: 'black'
        },
        slope: {
            roof: '',
            body: '',
            base: 'dullbrown'
        },
        crown: {
            roof: '',
            body: '',
            base: 'dullbrown'
        },
        concrete: 'classic',
    },

    '73': {
        exterior: {
            roof: 'lightbrown',
            body: 'lightbrown',
            base: 'limegrey'
        },
        windows: {
            roof: 'black',
            body: 'black',
            base: 'black'
        },
        slope: {
            roof: '',
            body: '',
            base: 'agedcopper'
        },
        crown: {
            roof: '',
            body: '',
            base: 'dullbrown'
        },
        concrete: 'classic',
    },

    '74': {
        exterior: {
            roof: 'lightbrown',
            body: 'lightbrown',
            base: 'limegrey'
        },
        windows: {
            roof: 'black',
            body: 'black',
            base: 'black'
        },
        slope: {
            roof: '',
            body: '',
            base: 'gold'
        },
        crown: {
            roof: '',
            body: '',
            base: 'dullbrown'
        },
        concrete: 'classic',
    },

    '75': {
        exterior: {
            roof: 'lightbrown',
            body: 'lightbrown',
            base: 'limegrey'
        },
        windows: {
            roof: 'black',
            body: 'black',
            base: 'black'
        },
        slope: {
            roof: '',
            body: '',
            base: 'bronze'
        },
        crown: {
            roof: '',
            body: '',
            base: 'dullbrown'
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
            body: 'darkgrey',
            base: 'trueblue'
        },
        concrete: 'gold',
    },
};

module.exports = colorLogicObj;
