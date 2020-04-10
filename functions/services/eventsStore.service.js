const _ = require('lodash');

const firestore = require('./firebase.service').firestore();

const tools =  require('blockcities-contract-artifacts').tools;

class EventsStoreService {

    async upsertEvent(network, eventData) {
        return firestore
            .collection('events')
            .doc(tools.getNetworkName(network))
            .collection('data')
            .doc(eventData.id)
            .set(eventData)
            .then(ref => {
                return ref.id;
            });
    }

}

module.exports = new EventsStoreService();
