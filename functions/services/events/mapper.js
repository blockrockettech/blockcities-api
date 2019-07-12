const _ = require('lodash');

/**
 * An event mapper which will create a uniquely identifier record for persistence
 */
module.exports = (event, block) => {

    return {
        id: `${event.transactionHash}_${event.logIndex}`,
        event: event.event,
        address: event.address,
        signature: event.signature,

        blockHash: event.blockHash,
        blockNumber: event.blockNumber,
        blockTimestamp: block.timestamp,

        mappedDatetime: Date.now(),

        logIndex: event.logIndex,
        transactionHash: event.transactionHash,
        transactionIndex: event.transactionIndex,
        data: _.get(event, 'data', ''),
        topics: _.get(event, 'topics', []),

        // All raw event args
        returnValues: _.mapValues(event.returnValues, (v) => v.toNumber ? v.toNumber() : v.toString()),

        // query by array-contains
        event_array: [event.event],

        // and/or boolean queries
        event_object: {
            [event.event]: true
        }
    };
};
