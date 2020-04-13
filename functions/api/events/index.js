const _ = require('lodash');
const functions = require('firebase-functions');

const events = require('express').Router({ mergeParams: true });

const eventsService = require('../../services/events/events.service');
const buildingDataService = require('../../services/building.data.service');

const eventStreamKey = '1'; //functions.config().eventstream.api.key;
if (!eventStreamKey) {
    throw new Error('No event stream API Key found - is the project setup correctly - see README');
}

events.get('/process/:address', async (req, res, next) => {
    try {
        console.log('Event Parser - checking for new events');

        if (req.query.key !== eventStreamKey) {
            console.error('Missing or invalid key');
            res
                .status(500)
                .send('Missing or invalid key');
            return;
        }

        const { address } = req.params;

        const processed = await eventsService.processEventsForAddress(address);

        return res
            .status(202)
            .send(`processed [${processed}] events for contract [${address}]`);

    } catch (e) {
        return next(e);
    }
});

events.get('/betakey/valid/:betaKey', async (req, res, next) => {
    try {
        const { betaKey } = req.params;

        const isValid = await buildingDataService.checkBetaKeyIsValid(betaKey);

        return res.status(200).json({
            valid: isValid
        });
    } catch (e) {
        return next(e);
    }
});

events.get('/betakey/consume/:betaKey/:userID', async (req, res, next) => {
    try {
        const { betaKey, userID } = req.params;

        const success = await buildingDataService.consumeBetaKey(betaKey, userID);

        return res.status(200).json({
            success: success
        })
    } catch (e) {
        return next(e);
    }
});

module.exports = events;
