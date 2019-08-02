const _ = require('lodash');

void async function () {
    const old = [
        ['red', 'darkgrey', 'darkgrey', 'darkgrey'], // 0

        ['darkgrey', 'gold', 'gold', 'gold'], // 1
        ['darkgrey', 'aquablue', 'aquablue', 'aquablue'], // 2
        ['darkgrey', 'trueblue', 'trueblue', 'trueblue'], // 3

        ['lightbeige', 'gold', 'gold', 'gold'], // 4
        ['lightbeige', 'aquablue', 'aquablue', 'aquablue'], // 5
        ['lightbeige', 'trueblue', 'trueblue', 'trueblue'], // 6
        ['lightbeige', 'darkgrey', 'darkgrey', 'darkgrey'], // 7
        ['lightbeige', 'darkgrey', 'darkgrey', 'gold'], // 8

        ['darkbrown', 'gold', 'gold', 'gold'], // 9

        ['lightgrey', 'gold', 'gold', 'gold'], // 10
        ['lightgrey', 'darkgrey', 'darkgrey', 'darkgrey'], // 11
        ['lightgrey', 'darkgrey', 'darkgrey', 'gold'], // 12
        ['lightgrey', 'gold', 'gold', 'darkgrey'], // 13

        ['black', 'gold', 'gold', 'gold'], // 14
        ['black', 'darkgrey', 'darkgrey', 'darkgrey'], // 15
        ['black', 'darkgrey', 'darkgrey', 'gold'], // 16
        ['black', 'gold', 'gold', 'darkgrey'], // 17
        ['black', 'aquablue', 'aquablue', 'aquablue'], // 18
        ['black', 'trueblue', 'trueblue', 'trueblue'], // 19
    ];

    const res = _.map(old, v => {
        return {
            exterior: {
                roof: v[0],
                body: v[0],
                base: v[0],
            },
            windows: {
                roof: v[1],
                body: v[2],
                base: v[3],
            }
        };
    });

    console.log(_.zipObject([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], res));
}();
