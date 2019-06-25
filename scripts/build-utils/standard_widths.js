const imageBuilderService = require('../../functions/services/imageBuilder.service');

void async function () {
    for (let i = 0; i <= 15; i++) {
        let res;
        if (i !== 8) {
            res = await imageBuilderService.generateImageStats({
                building: i,
                base: 0,
                body: 0,
                roof: 0,
                exteriorColorway: 0,
                backgroundColorway: 0,
            });
        } else {
            res = await imageBuilderService.generateNoRoofImageStats({
                building: i,
                base: 0,
                body: 0,
                exteriorColorway: 0,
                backgroundColorway: 0,
            });
        }

        console.log(i + ':' + res.bodyConfig.width );
    }
}();
