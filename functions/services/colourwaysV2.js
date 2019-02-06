/**
 | 2-Sided Buildings <br><br>Exterior | Left<br><br>Primary | Light   | Dark    | Right<br><br>Primary | Light   | Dark    | Top<br><br>Primary | Light   | Dark    |
 | ---------------------------------- | ------------------- | ------- | ------- | -------------------- | ------- | ------- | ------------------ | ------- | ------- |
 | Red                                | #73302E             | #8A3A37 | #512220 | #D05752              | #DF5D58 | #A64C49 | #DD8A87            | #FFC8C6 | #C67471 |
 | Dark Grey                          | #2E2E2E             | #535353 | #191919 | #5D5D5D              | #828282 | #444444 | #B9B9B9            | #E8E8E8 | #A2A2A2 |
 | Light Beige                        | #B0A59B             | #C8BBB0 | #938A82 | #F7F2EF              | #FBF8F6 | #DBD7D4 | #FFFCFA            | #FFFFFF | #FDF9F6 |
 | Dark Brown                         | #1E1C1B             | #282321 | #151313 | #151313              | #776D68 | #282321 | #BBAAA2            | #F4E6E0 | #9B8C85 |
 | Light Grey                         | #A2A2A2             | #B7B7B7 | #979797 | #E8E8E8              | #F0F0F0 | #DFDFDF | #F2F2F2            | #FFFFFF | #E8E8E8 |
 | Brick Red                          | #665456             | #8E7275 | #3B3435 | #A28185              | #AA8387 | #665456 | #D1D1D1            | #E8E8E8 | #BFBFBF |
 | Light Brick Red                    | #8E7275             | #AA8387 | #483E3F | #AA8387              | #E8B7BB | #775C5F | #E8CFD1            | #F0D7D9 | #D9BEC0 |
 **/

/**
 | 2-Sided Buildings <br><br>Rect/Horiz/Vert Windows | Left<br><br>Primary | Lighter | Right<br><br>Primary | Lighter |
 | ------------------------------------------------- | ------------------- | ------- | -------------------- | ------- |
 | Black                                             | #000000             |         | #202020              |         |
 | Aqua Blue                                         | #224F64             |         | #4C8FAC              |         |
 | Light Grey                                        | #9A9C9F             |         | #D1D1D1              |         |
 */


module.exports = {
    exteriors: {
        red: {
            left: {
                prim: '#73302E',
                light: '#8A3A37',
                dark: '#512220',
            },
            right: {
                prim: '#D05752',
                light: '#DF5D58',
                dark: '#A64C49',
            },
            top: {
                prim: '#DD8A87',
                light: '#FFC8C6',
                dark: '#C67471',
            }
        },
        darkgrey: {
            left: {
                prim: '#2E2E2E',
                light: '#535353',
                dark: '#191919',
            },
            right: {
                prim: '#5D5D5D',
                light: '#828282',
                dark: '#444444',
            },
            top: {
                prim: '#B9B9B9',
                light: '#E8E8E8',
                dark: '#A2A2A2',
            }
        },
    },
    windows: {
        black: {
            left: {
                prim: '#000000'
            },
            right: {
                prim: '#202020'
            },
        },
        aquablue: {
            left: {
                prim: '#224F64'
            },
            right: {
                prim: '#4C8FAC'
            },
        },
        lightgrey: {
            left: {
                prim: '#9A9C9F'
            },
            right: {
                prim: '#D1D1D1'
            },
        }
    },
    concrete: {
        classic: {
            left: {
                prim: '#A2A2A2'
            },
            right: {
                prim: '#D1D1D1'
            },
            top: {
                prim: '#E8E8E8'
            },
        },
        dark: {

        }
    }
};