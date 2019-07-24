const _ = require('lodash');

const configs = require('express').Router({mergeParams: true});

// Used for admin app - listing out specials we current can mint
configs.get('/:building/base/:base/body/:body/roof/:roof/exterior/:exterior/windows/:windows', async (req, res, next) => {
    response
        .status(200)
        .json(require('./services/metadata/special-data-mapping.js'));
});

module.exports = configs;
