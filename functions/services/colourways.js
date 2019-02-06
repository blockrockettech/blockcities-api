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
        lightbeige: {
            left: {
                prim: '#B0A59B',
                light: '#C8BBB0',
                dark: '#938A82',
            },
            right: {
                prim: '#F7F2EF',
                light: '#FBF8F6',
                dark: '#DBD7D4',
            },
            top: {
                prim: '#FFFCFA',
                light: '#FFFFFF',
                dark: '#FDF9F6',
            }
        },
        darkbrown: {
            left: {
                prim: '#1E1C1B',
                light: '#282321',
                dark: '#151313',
            },
            right: {
                prim: '#151313',
                light: '#776D68',
                dark: '#282321',
            },
            top: {
                prim: '#BBAAA2',
                light: '#F4E6E0',
                dark: '#9B8C85',
            }
        },
        lightgrey: {
            left: {
                prim: '#A2A2A2',
                light: '#B7B7B7',
                dark: '#979797',
            },
            right: {
                prim: '#E8E8E8',
                light: '#F0F0F0',
                dark: '#DFDFDF',
            },
            top: {
                prim: '#F2F2F2',
                light: '#FFFFFF',
                dark: '#E8E8E8',
            }
        },
        brickred: {
            left: {
                prim: '#665456',
                light: '#8E7275',
                dark: '#3B3435',
            },
            right: {
                prim: '#A28185',
                light: '#AA8387',
                dark: '#665456',
            },
            top: {
                prim: '#D1D1D1',
                light: '#E8E8E8',
                dark: '#BFBFBF',
            }
        },
        lightbrickred: {
            left: {
                prim: '#8E7275',
                light: '#AA8387',
                dark: '#483E3F',
            },
            right: {
                prim: '#AA8387',
                light: '#E8B7BB',
                dark: '#775C5F',
            },
            top: {
                prim: '#E8CFD1',
                light: '#F0D7D9',
                dark: '#D9BEC0',
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
            left: '#A2A2A2',
            right: '#D1D1D1',
            top: '#E8E8E8'
        },
        dark: {

        }
    }
};