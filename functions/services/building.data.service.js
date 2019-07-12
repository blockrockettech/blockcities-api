const _ = require('lodash');

const firestore = require('./firebase.service').firestore();

const {getNetwork} = require('./abi/networks');

class BuildingDataService {

    async saveBuilding(network, data) {
        return firestore
            .collection('data')
            .doc(getNetwork(network))
            .collection('buildings')
            .doc(_.toString(data.id))
            .set(data)
            .then(ref => {
                return ref.id;
            });
    }

}

module.exports = new BuildingDataService();
