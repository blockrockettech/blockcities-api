const _ = require('lodash');
const imageBuilderService = require('../../services/imageBuilder.service');

const builder = require('express').Router({mergeParams: true});

// builder.get('/:building/:baseNo/:bodyNo/:roofNo', async (request, response) => {
//
//     try {
//
//         function getRandomArbitrary(max) {
//             return Math.floor(Math.random() * max);
//         }
//
//         const allBases = [];
//         for (let x = 0; x < parseInt(request.params.baseNo); x++) {
//             for (let y = 0; y < parseInt(request.params.bodyNo); y++) {
//                 for (let z = 0; z < parseInt(request.params.roofNo); z++) {
//                     allBases.push(imageBuilderService.generateImage({
//                         building: parseInt(request.params.building),
//                         base: x,
//                         body: y,
//                         roof: z,
//                         exteriorColorway: getRandomArbitrary(20),
//                         backgroundColorway: getRandomArbitrary(7),
//                     }));
//                 }
//             }
//         }
//
//         const buildings = await Promise.all(allBases);
//
//         return response
//             .contentType('text/html')
//             .send(buildings.reduce((p, b) => p + b, ''));
//     } catch (e) {
//         console.error(e);
//     }
// });

// The image tester
builder.get('/:building/base/:base/body/:body/roof/:roof/exterior/:exterior/svg', async (request, response) => {
    try {
        const image = await imageBuilderService.generatePureSvg({
            building: parseInt(request.params.building),
            base: parseInt(request.params.base),
            body: parseInt(request.params.body),
            roof: parseInt(request.params.roof),
            exteriorColorway: parseInt(request.params.exterior),
            backgroundColorway: 2,
        });

        return response
            .contentType('image/svg+xml')
            .send(image);
    } catch (e) {
        console.error(e);
    }

});

// The special image tester
builder.get('/special/:specialId/svg', async (request, response) => {
    try {
        const specialSvg = await imageBuilderService.loadSpecialPureSvg(parseInt(request.params.specialId));

        return response
            .contentType('image/svg+xml')
            .send(specialSvg);
    } catch (e) {
        console.error(e);
    }

});

module.exports = builder;
