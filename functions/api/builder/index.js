const _ = require('lodash');

const buildings = require('express').Router({mergeParams: true});

const imageApi = require('../image');

// The image tester
buildings.get('/:building/base/:base/body/:body/roof/:roof/exterior/:exterior/windows/:windows', async (request, response) => {
    return imageApi.generateTestImage(request, response);

});

buildings.get('/:building/:baseNo/:bodyNo/:roofNo', async (request, response) => {
    return imageApi.generateTestImages(request, response);

});

module.exports = buildings;
