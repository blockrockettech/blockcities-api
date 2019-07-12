const functions = require('firebase-functions');

const events = require('express').Router({mergeParams: true});

const eventsService = require('../../services/events/events.service');

const eventStreamKey = functions.config().eventstream.api.key;
if (!eventStreamKey) {
    throw new Error('No event stream API Key found - is the project setup correctly - see README');
}

events.get('/process/:address', async (req, res, next) => {
    try {
        console.log('Event Parser - checking for new events', req.params, req.headers);

        if (req.query.key !== eventStreamKey) {
            console.error('Missing or invalid key');
            res
                .status(500)
                .send('Missing or invalid key');
            return;
        }

        const {address} = req.params;

        const processed = await eventsService.processEventsForAddress(address);

        return res
            .status(202)
            .send(`processed [${processed}] events`);

    } catch (e) {
        return next(e);
    }
});

module.exports = events;
