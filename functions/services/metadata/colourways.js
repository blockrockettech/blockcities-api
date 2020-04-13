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
        black: {
            left: {
                prim: '#202020',
                light: '#2A2A2A',
                dark: '#000000',
            },
            right: {
                prim: '#2E2E2E',
                light: '#484848',
                dark: '#202020',
            },
            top: {
                prim: '#666666',
                light: '#A4A4A4',
                dark: '#4F4F4F',
            }
        },
        goldenbeige: {
            left: {
                prim: '#C6AB89',
                light: '#DBBC96',
                dark: '#AE9474',
            },
            right: {
                prim: '#FBD8AA',
                light: '#FFE2BD',
                dark: '#ECCB9F',
            },
            top: {
                prim: '#F9E8D2',
                light: '#FFF4DD',
                dark: '#EEDDC6',
            } 
        },
        blush: {
            left: {
                prim: '#9B7D74',
                light: '#AE8C81',
                dark: '#86675E',
            },
            right: {
                prim: '#DDB7AC',
                light: '#ECC5BB',
                dark: '#CEA59A',
            },
            top: {
                prim: '#ECCDC4',
                light: '#FDE2DA',
                dark: '#E1C1B9',
            } 
        },
        dijon: {
            left: {
                prim: '#A4805D',
                light: '#BB946D',
                dark: '#916E4B',
            },
            right: {
                prim: '#D9B592',
                light: '#E6C3A1',
                dark: '#C8A17A',
            },
            top: {
                prim: '#F2D6BC',
                light: '#FFE4CA',
                dark: '#EACEB4',
            } 
        },
        coolgrey: {
            left: {
                prim: '#83878E',
                light: '#93979F',
                dark: '#767A82',
            },
            right: {
                prim: '#C5C8CC',
                light: '#D4D6D9',
                dark: '#B3B6BB',
            },
            top: {
                prim: '#D5D5DB',
                light: '#ECECF0',
                dark: '#CDCDD2',
            } 
        },
        limestone: {
            left: {
                prim: '#D7B6A7',
                light: '#EACCBF',
                dark: '#C3A495',
            },
            right: {
                prim: '#F4DDC6',
                light: '#FDEAD7',
                dark: '#E8CCB1',
            },
            top: {
                prim: '#F2E3D5',
                light: '#FFF3E8',
                dark: '#E6D6C7',
            } 
         },
         carbon: {
            left: {
                prim: '#1E1F22',
                light: '#27282C',
                dark: '#141517',
            },
            right: {
                prim: '#2E2F31',
                light: '#353638',
                dark: '#262729',
            },
            top: {
                prim: '#5B5C5E',
                light: '#9FA2A6',
                dark: '#4C4D4F',
            } 
        },

        beige: {
            left: {
                prim: '#75624D',
                light: '#847463',
                dark: '#463624',
            },
            right: {
                prim: '#957F69',
                light: '#AC9882',
                dark: '#7B6651',
            },
            top: {
                prim: '#E6DCD4',
                light: '#F0E6DE',
                dark: '#CAB7A5',
            } 
        },

        oat: {
            left: {
                prim: '#D0CCC3',
                light: '#E1DCD1',
                dark: '#BFBBB1',
            },
            right: {
                prim: '#E3DFD6',
                light: '#F6F4EE',
                dark: '#DBD6CB',
            },
            top: {
                prim: '#DFD8C9',
                light: '#EAE4D8',
                dark: '#CCC3AF',
            } 
        },

        goldenoat: {
            left: {
                prim: '#A2977E',
                light: '#B9AC8F',
                dark: '#776D57',
            },
            right: {
                prim: '#C3BBA8',
                light: '#D7CEB9',
                dark: '#A49779',
            },
            top: {
                prim: '#DFD8C9',
                light: '#EAE4D8',
                dark: '#CCC3AF',
            } 
        },

        limegrey: {
            left: {
                prim: '#A29D91',
                light: '#B3AC9D',
                dark: '#938D80',
            },
            right: {
                prim: '#C2BDB1',
                light: '#CEC9BC',
                dark: '#B7B1A5',
            },
            top: {
                prim: '#EEE9DE',
                light: '#F4F0E6',
                dark: '#E8E2D7',
            } 
        },

        lightbrown: {
            left: {
                prim: '#71635A',
                light: '#91837B',
                dark: '#64574F',
            },
            right: {
                prim: '#B7A590',
                light: '#D5C6B5',
                dark: '#A6937D',
            },
            top: {
                prim: '#EEE5DF',
                light: '#F7F1EC',
                dark: '#E6DCD5',
            } 
        },

        truegrey: {
            left: {
                prim: '#2E2E2E',
                light: '#535353',
                dark: '#242424',
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

        redstone: {
            left: {
                prim: '#6B382B',
                light: '#784335',
                dark: '#592F24',
            },
            right: {
                prim: '#905546',
                light: '#9E6455',
                dark: '#824C3E',
            },
            top: {
                prim: '#CF9080',
                light: '#D9A194',
                dark: '#BD7D6D',
            }
        },

        brownstone: {
            left: {
                prim: '#5C4430',
                light: '#664F3C',
                dark: '#4A3727',
            },
            right: {
                prim: '#8A6B55',
                light: '#7B5F4A',
                dark: '#6B523E',
            },
            top: {
                prim: '#E3C2AA',
                light: '#EBD6C7',
                dark: '#D6AC8D',
            }
        },

        beigegrey: {
            left: {
                prim: '#C1B3A6',
                light: '#CCBFB2',
                dark: '#8A8178',
            },
            right: {
                prim: '#CCC2B8',
                light: '#DBD2C9',
                dark: '#B5A99E',
            },
            top: {
                prim: '#F0E8E2',
                light: '#F9F1EB',
                dark: '#E8DFD9',
            }
        },

        cacao: {
            left: {
                prim: '#423B2D',
                light: '#4A4536',
                dark: '#393326',
            },
            right: {
                prim: '#625A49',
                light: '#6A6352',
                dark: '#423D2F',
            },
            top: {
                prim: '#D9C8B5',
                light: '#EEDFCE',
                dark: '#C8B8A5',
            }
        },

        




    },

    slope: {
        brownstone: {
            left: {
                prim: '#5C4430',
                light: '#664F3C',
                dark: '#4A3727',
            },
            right: {
                prim: '#8A6B55',
                light: '#7B5F4A',
                dark: '#6B523E',
            },
            top: {
                prim: '#E3C2AA',
                light: '#EBD6C7',
                dark: '#D6AC8D',
            }
        },
        

        navy: {
            left: {
                prim: '#1C3C4C',
                dark: '#152C38',
            },
            right: {
                prim: '#29596E',
                dark: '#20495C',
            },
            top: {
                prim: '#5F9DB8',
                dark: '#4F88A1'
            }
        },


        hottop: {
            left: {
                prim: '#C95C50',
                dark: '#A84B42',
            },
            right: {
                prim: '#D67C71',
                dark: '#C9675A',
            },
            top: {
                prim: '#F5AEA7',
                dark: '#E09991'
            }
        },


        twiceagedcopper: {
            left: {
                prim: '#9BD1C0',
                dark: '#83B8A6',
            },
            right: {
                prim: '#BEE5D8',
                dark: '#A9D6C7',
            },
            top: {
                prim: '#D6FAEF',
                dark: '#CFEBE2'
            }
        },
        


        gold: {
            left: {
                prim: '#795A30',
                dark: '#6F5129',
            },
            right: {
                prim: '#EACB87',
                dark: '#DFBD75',
            },
            top: {
                prim: '#FFF3D8',
                dark: '#FFEEC6'
            }
        },

        silver: {
            left: {
                prim: '#727E8A',
                dark: '#5C6670',
            },
            right: {
                prim: '#D1D3D6',
                dark: '#C0C3C8',
            },
            top: {
                prim: '#F5F5F7',
                dark: '#EFEFF2'
            }
        },

        bronze: {
            left: {
                prim: '#823F10',
                dark: '#8F4C1B',
            },
            right: {
                prim: '#BB6E33',
                dark: '#A65F29',
            },
            top: {
                prim: '#FFD0AE',
                dark: '#F7C4A0'
            }
        },

        dullbrown: {
            left: {
                prim: '#686254',
                dark: '#555044',
            },
            right: {
                prim: '#958F81',
                dark: '#888273',
            },
            top: {
                prim: '#F7F1EC',
                dark: '#E6DCD5'
            }
        },

        stumpbrown: {
            left: {
                prim: '#6A5D55',
                dark: '#514741',
            },
            right: {
                prim: '#B7A897',
                dark: '#A69A8D',
            },
            top: {
                prim: '#F7F1EC',
                dark: '#E6DCD5'
            }
        },

        oak: {
            left: {
                prim: '#513E2C',
                dark: '#312316',
            },
            right: {
                prim: '#755F49',
                dark: '#53402E',
            },
            top: {
                prim: '#CAB7A5',
                dark: '#B39B85'
            }
        },

        beige: {
            left: {
                prim: '#75624D',
                dark: '#7B6651',
            },
            right: {
                prim: '#957F69',
                dark: '#7B6651',
            },
            top: {
                prim: '#E6DCD4',
                dark: '#CAB7A5'
            }
        },

        agedcopper: {
            left: {
                prim: '#8FA88C',
                dark: '#6E806C',
            },
            right: {
                prim: '#BFD7BD',
                dark: '#A6C6A4',
            },
            top: {
                prim: '#E5F7E3',
                dark: '#CADFC8'
            }
        },

        goldenoat: {
            left: {
                prim: '#A2977E',
                light: '#B9AC8F',
                dark: '#776D57',
            },
            right: {
                prim: '#C3BBA8',
                light: '#D7CEB9',
                dark: '#A49779',
            },
            top: {
                prim: '#DFD8C9',
                light: '#EAE4D8',
                dark: '#CCC3AF',
            } 
        },

        ink: {
            left: {
                prim: '#464646',
                light: '#535353',
                dark: '#2E2E2E',
            },
            right: {
                prim: '#5D5D5D',
                light: '#666666',
                dark: '#464646',
            },
            top: {
                prim: '#8B8B8B',
                light: '#A8A8A8',
                dark: '#777777',
            } 
        },
    },

    crown: {
        redstone: {
            left: {
                prim: '#6B382B',
                dark: '#592F24',
            },
            right: {
                prim: '#905546',
                dark: '#824C3E',
            },
            top: {
                prim: '#CF9080',
                dark: '#BD7D6D',
            }
        },


        brownstone: {
            left: {
                prim: '#5C4430',
                light: '#664F3C',
                dark: '#4A3727',
            },
            right: {
                prim: '#8A6B55',
                light: '#7B5F4A',
                dark: '#6B523E',
            },
            top: {
                prim: '#E3C2AA',
                light: '#EBD6C7',
                dark: '#D6AC8D',
            }
        },


        gold: {
            left: {
                prim: '#795A30',
                dark: '#6F5129',
            },
            right: {
                prim: '#EACB87',
                dark: '#DFBD75',
            },
            top: {
                prim: '#FFF3D8',
                dark: '#FFEEC6'
            }
        },

        silver: {
            left: {
                prim: '#727E8A',
                dark: '#5C6670',
            },
            right: {
                prim: '#D1D3D6',
                dark: '#C0C3C8',
            },
            top: {
                prim: '#F5F5F7',
                dark: '#EFEFF2'
            }
        },

        bronze: {
            left: {
                prim: '#823F10',
                dark: '#8F4C1B',
            },
            right: {
                prim: '#BB6E33',
                dark: '#A65F29',
            },
            top: {
                prim: '#FFD0AE',
                dark: '#F7C4A0'
            }
        },


        stumpbrown: {
            left: {
                prim: '#6A5D55',
                dark: '#514741',
            },
            right: {
                prim: '#B7A897',
                dark: '#A69A8D',
            },
            top: {
                prim: '#F7F1EC',
                dark: '#E6DCD5'
            }
        },


        dullbrown: {
            left: {
                prim: '#686254',
                dark: '#555044',
            },
            right: {
                prim: '#958F81',
                dark: '#888273',
            },
            top: {
                prim: '#F7F1EC',
                dark: '#E6DCD5'
            }
        },
        
        oak: {
            left: {
                prim: '#513E2C',
                dark: '#312316',
            },
            right: {
                prim: '#755F49',
                dark: '#53402E',
            },
            top: {
                prim: '#CAB7A5',
                dark: '#B39B85'
            }
        },

        beige: {
            left: {
                prim: '#75624D',
                dark: '#7B6651',
            },
            right: {
                prim: '#957F69',
                dark: '#7B6651',
            },
            top: {
                prim: '#E6DCD4',
                dark: '#CAB7A5'
            }
        },

        agedcopper: {
            left: {
                prim: '#8FA88C',
                dark: '#6E806C',
            },
            right: {
                prim: '#BFD7BD',
                dark: '#A6C6A4',
            },
            top: {
                prim: '#E5F7E3',
                dark: '#CADFC8'
            }
        },

        goldenoat: {
            left: {
                prim: '#A2977E',
                light: '#B9AC8F',
                dark: '#776D57',
            },
            right: {
                prim: '#C3BBA8',
                light: '#D7CEB9',
                dark: '#A49779',
            },
            top: {
                prim: '#DFD8C9',
                light: '#EAE4D8',
                dark: '#CCC3AF',
            } 
        },

        ink: {
            left: {
                prim: '#464646',
                light: '#535353',
                dark: '#2E2E2E',
            },
            right: {
                prim: '#5D5D5D',
                light: '#666666',
                dark: '#464646',
            },
            top: {
                prim: '#8B8B8B',
                light: '#A8A8A8',
                dark: '#777777',
            } 
        },

        black: {
            left: {
                prim: '#202020',
                light: '#2A2A2A',
                dark: '#000000',
            },
            right: {
                prim: '#2E2E2E',
                light: '#484848',
                dark: '#202020',
            },
            top: {
                prim: '#666666',
                light: '#A4A4A4',
                dark: '#4F4F4F',
            } 
        },
    },
        

    windows: {
        black: {
            left: {
                prim: '#000000',
                light: '#2E2E2E',
            },
            right: {
                prim: '#202020',
                light: '#464646',
            },
        },
        aquablue: {
            left: {
                prim: '#2E5464',
                light: '#416879',
            },
            right: {
                prim: '#3C99C1',
                light: '#59ADD0',
            },
        },
        lightgrey: {
            left: {
                prim: '#9A9C9F',
                light: '#B2B4B7',
            },
            right: {
                prim: '#D1D1D1',
                light: '#F7F7F7',
            },
        },
        darkgrey: {
            left: {
                prim: '#464646',
                light: '#5D5D5D',
            },
            right: {
                prim: '#8B8B8B',
                light: '#B3B3B3',
            },
        },
        gold: {
            left: {
                prim: '#4D3B24',
                light: '#795A30',
            },
            right: {
                prim: '#BD9664',
                light: '#EACB87',
            },
        },
        trueblue: {
            left: {
                prim: '#2A5A95',
                light: '#3D79C1',
            },
            right: {
                prim: '#95C5FF',
                light: '#BDDAFD',
            },
        },
        boldblue: {
            left: {
                prim: '#37719D',
                light: '#478CC1',
            },
            right: {
                prim: '#6EC0FF',
                light: '#53A7E8',
            },
        },
        bluegrey: {
            left: {
                prim: '#576271',
                light: '#808C9D',
            },
            right: {
                prim: '#C5CEDB',
                light: '#E2E7EE',
            },
        },
        turquoise: {
            left: {
                prim: '#203640',
                light: '#276782',
            },
            right: {
                prim: '#2E5464',
                light: '#3C99C1',
            },
        },
        navy: {
            left: {
                prim: '#253968',
                light: '#2D498A',
            },
            right: {
                prim: '#4869AE',
                light: '#709DFF',
            },
        },
        lightcarbon: {
            left: {
                prim: '#484A4D',
                light: '#56585C',
            },
            right: {
                prim: '#676A6E',
                light: '#7A7D82',
            },
        },
    },
    curtains: {
        trueblue: {
            left: {
                prim_dark: '#2A5A95',
                prim_light: '#3D79C1',
                prim_dark_light: '#2D5F99',
                prim_light_dark: '#3A78C3',
            },
            right: {
                prim_dark: '#90C2FF',
                prim_light: '#BEDBFF',
                prim_dark_light: '#95C5FF',
                prim_light_dark: '#BDDAFD',
            },
        },
        aquablue: {
            left: {
                prim_dark: '#11424D',
                prim_light: '#186273',
                prim_dark_light: '#135260',
                prim_light_dark: '#175B6A',
            },
            right: {
                prim_dark: '#1F788C',
                prim_light: '#2D95AC',
                prim_dark_light: '#26869B',
                prim_light_dark: '#298DA4',
            },
        },
        gold: {
            left: {
                prim_dark: '#392E20',
                prim_light: '#795A30',
                prim_dark_light: '#4D3B24',
                prim_light_dark: '#5E4421',
            },
            right: {
                prim_dark: '#BD9664',
                prim_light: '#EACB87',
                prim_dark_light: '#BD9664',
                prim_light_dark: '#CAA973',
            },
        },
        darkgrey: {
            left: {
                prim_dark: '#000000',
                prim_light: '#2E2E2E',
                prim_dark_light: '#171717',
                prim_light_dark: '#262626',
            },
            right: {
                prim_dark: '#5E5E5E',
                prim_light: '#747474',
                prim_dark_light: '#646363',
                prim_light_dark: '#686868',
            },
        },
        black: {
            left: {
                prim_dark: '#000000',
                prim_light: '#2E2E2E',
                prim_dark_light: '#171717',
                prim_light_dark: '#262626',
            },
            right: {
                prim_dark: '#5E5E5E',
                prim_light: '#747474',
                prim_dark_light: '#646363',
                prim_light_dark: '#686868',
            },
        },
        bluegrey: {
            left: {
                prim_dark: '#576271',
                prim_light: '#808C9D',
                prim_dark_light: '#647184',
                prim_light_dark: '#798495',
            },
            right: {
                prim_dark: '#C5CEDB',
                prim_light: '#E2E7EE',
                prim_dark_light: '#CFD9E6',
                prim_light_dark: '#D8DEE8',
            },
        },
        turquoise: {
            left: {
                prim_dark: '#203640',
                prim_light: '#276782',
                prim_dark_light: '#284855',
                prim_light_dark: '#1D5973',
            },
            right: {
                prim_dark: '#2E5464',
                prim_light: '#3C99C1',
                prim_dark_light: '#34667B',
                prim_light_dark: '#3187AC',
            },
        },
        navy: {
            left: {
                prim_dark: '#253968',
                prim_light: '#2D498A',
                prim_dark_light: '#2C4379',
                prim_light_dark: '#223C7B',
            },
            right: {
                prim_dark: '#4869AE',
                prim_light: '#709DFF',
                prim_dark_light: '#709DFF',
                prim_light_dark: '#5C83D7',
            },
        },
        lightcarbon: {
            left: {
                prim_dark: '#141517',
                prim_light: '#36383D',
                prim_dark_light: '#26282B',
                prim_light_dark: '#2F3136',
            },
            right: {
                prim_dark: '#3E4042',
                prim_light: '#5B5D61',
                prim_dark_light: '#4A4C4F',
                prim_light_dark: '#56585C',
            },
        },
     
     
     
    },
    concrete: {
        classic: {
            left: '#A2A2A2',
            right: '#D1D1D1',
            top: '#E8E8E8',
        },
        dark: {
            left: '#8B8B8B',
            right: '#E8E8E8',
            top: '#A2A2A2',
        },
        brownstone: {
            left: '#555454',
            right: '#959293',
            top: '#D0C9CB',
        },
        limestone: {
            left: '#C3A495',
            right: '#F4DDC6',
            top: '#FFF3E8',
        }
    }
};
