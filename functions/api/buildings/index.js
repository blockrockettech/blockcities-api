const _ = require('lodash');

const buildings = require('express').Router({mergeParams: true});

const blockCitiesDataService = require('../../services/blockcities.data.service');

buildings.get('/:buildingId', async (request, response) => {
    try {
        const {network, buildingId} = request.params;

        const building = await blockCitiesDataService.getBuildingData(network, buildingId);

        return response
            .status(200)
            .json(building);

    } catch (e) {
        next(e);
    }

});

buildings.get('/owner/:owner', async (request, response, next) => {
    try {
        const {network, owner} = request.params;

        const building = await blockCitiesDataService.getBuildingsForOwner(network, owner);

        return response
            .status(200)
            .json(building);

    } catch (e) {
        next(e);
    }
});

module.exports = buildings;
