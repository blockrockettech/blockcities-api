const _ = require('lodash');

const firestore = require('./firebase.service').firestore();

const {getNetwork} = require('./abi/networks');

class BuildingDataService {

    async saveBuilding(network, data) {
        return firestore
            .collection('data')
            .doc(getNetwork(network))
            .collection('buildings')
            .doc(_.toString(data.tokenId))
            .set(data)
            .then(ref => {
                return ref.id;
            });
    }

    async getBuildingsForOwner(network, owner) {
        return firestore
            .collection('data')
            .doc(getNetwork(network))
            .collection('buildings')
            .where('owner', '==', owner)
            .get()
            .then((querySet) => {
                const buildings = [];
                querySet.forEach((doc) => {
                    buildings.push(doc.data());
                });
                return buildings;
            });
    }

    async getBuildingByTokenId(network, tokenId) {
        return firestore
            .collection('data')
            .doc(getNetwork(network))
            .collection('buildings')
            .doc(_.toString(tokenId))
            .get()
            .then((doc) => {
                if (doc.exists) {
                    return doc.data();
                }
                return null;
            });
    }

}

module.exports = new BuildingDataService();