module.exports = (backgroundColorway) => {
    switch (backgroundColorway) {
        case 0:
            return {hex: 'FFEEBF', name:'yellow'};
        case 1:
            return {hex:'D5F0F3', name:'aqua'};
        case 2:
            return {hex:'C4D7F3', name:'dullblue'};
        case 3:
            return {hex:'ACCAFF', name:'blueblue'};
        case 4:
            return {hex:'F4DCDC', name:'pink'};
        case 5:
            return {hex:'FCDBC8', name:'orange'};
        case 6:
            return {hex:'BEEBFF', name:'boldblue'};
        case 7:
            return {hex:'EBEDF0', name:'grey'};
        default:
            return {hex:'EBEDF0', name:'grey'};
    }
};