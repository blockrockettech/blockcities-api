const _ = require('lodash');

const configs = require('express').Router({mergeParams: true});

// Used for admin app - listing out specials we current can mint
configs.get('/buildings/specials', async (req, res, next) => {
    res
        .status(200)
        .json(require('../../services/metadata/special-data-mapping.js'));
});

module.exports = configs;
