module.exports = {

    // Glass Curtain Buildings
// | 0  | Red         | Dark Grey | Dark Grey | Dark Grey |
// | -- | ----------- | --------- | --------- | --------- |
// |    |             |           |           |           |
// | 1  | Dark Grey   | Gold      | Gold      | Gold      |
// | 2  | Dark Grey   | Aqua Blue | Aqua Blue | Aqua Blue |
// | 3  | Dark Grey   | True Blue | True Blue | True Blue |
// |    |             |           |           |           |
// | 4  | Light Beige | Gold      | Gold      | Gold      |
// | 5  | Light Beige | Aqua Blue | Aqua Blue | Aqua Blue |
// | 6  | Light Beige | True Blue | True Blue | True Blue |
// | 7  | Light Beige | Dark Grey | Dark Grey | Dark Grey |
// | 8  | Light Beige | Dark Grey | Dark Grey | Gold      |
// |    |             |           |           |           |
// | 9  | Dark Brown  | Gold      | Gold      | Gold      |
// |    |             |           |           |           |
// | 10 | Light Grey  | Gold      | Gold      | Gold      |
// | 11 | Light Grey  | Dark Grey | Dark Grey | Dark Grey |
// | 12 | Light Grey  | Dark Grey | Dark Grey | Gold      |
// | 13 | Light Grey  | Gold      | Gold      | Dark Grey |
// |    |             |           |           |           |
// | 14 | Black       | Gold      | Gold      | Gold      |
// | 15 | Black       | Dark Grey | Dark Grey | Dark Grey |
// | 16 | Black       | Dark Grey | Dark Grey | Gold      |
// | 17 | Black       | Gold      | Gold      | Dark Grey |
// | 18 | Black       | Aqua Blue | Aqua Blue | Aqua Blue |
// | 19 | Black       | True Blue | True Blue | True Blue |
// | 20 | TODO        | TODO      | TODO      | TODO      |

    curtains: [
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
        ['black', 'trueblue', 'trueblue', 'trueblue'], // 20 // FIXME
        ['black', 'trueblue', 'trueblue', 'trueblue'], // 21 // FIXME
    ],

    // Rect/Horiz/Vert Buildings
// | #  | Exterior    | Window     |
// | -- | ----------- | ---------- |
// | 0  | Red         | Black      |
// | 1  | Red         | Dark Grey  |
// | 2  | Red         | Light Grey |
// |    |             |            |
// | 3  | Dark Grey   | Black      |
// | 4  | Dark Grey   | Light Grey |
// | 5  | Dark Grey   | Gold       |
// | 6  | Dark Grey   | Aqua Blue  |
// | 7  | Dark Grey   | True Blue  |
// |    |             |            |
// | 8  | Light Beige | Black      |
// | 9  | Light Beige | Gold       |
// | 10 | Light Beige | Aqua Blue  |
// | 11 | Light Beige | True Blue  |
// | 12 | Light Beige | Dark Grey  |
// |    |             |            |
// | 13 | Dark Brown  | Black      |
// |    | Dark Brown  | Gold       |
// |    |             |            |
// | 14 | Light Grey  | Black      |
// | 15 | Light Grey  | Gold       |
// |    |             |            |
// | 16 | Black       | Gold       |
// | 17 | Black       | Light Grey |
// | 18 | Black       | Aqua Blue  |
// | 19 | Black       | True Blue  |
// | 20 | Black       | Dark Grey  |

    exteriors: [
        ['red', 'black'], // 0
        ['red', 'darkgrey'], // 1
        ['red', 'lightgrey'], // 2

        ['darkgrey', 'black'], // 3
        ['darkgrey', 'lightgrey'], // 4
        ['darkgrey', 'gold'], // 5
        ['darkgrey', 'aquablue'], // 6
        ['darkgrey', 'trueblue'], // 7

        ['lightbeige', 'black'], // 8
        ['lightbeige', 'gold'], // 9
        ['lightbeige', 'aquablue'], // 10
        ['lightbeige', 'trueblue'], // 11
        ['lightbeige', 'darkgrey'], // 12

        ['darkbrown', 'black'], // 13
        ['darkbrown', 'gold'], // 14

        ['lightgrey', 'black'], // 15
        ['lightgrey', 'gold'], // 16

        ['darkgrey', 'black'], // 17
        ['darkgrey', 'lightgrey'], // 18
        ['darkgrey', 'gold'], // 19
        ['darkgrey', 'aquablue'], // 20
        ['darkgrey', 'trueblue'], // 21
    ]
};