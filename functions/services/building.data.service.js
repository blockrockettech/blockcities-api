const _ = require('lodash');

const firestore = require('./firebase.service').firestore();
const storage = require('./firebase.service').storage();

const { getNetwork } = require('./abi/networks');

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

    async getArchitectedBuildingsForAddress(network, address, fromTimestamp) {
        return firestore
            .collection('data')
            .doc(getNetwork(network))
            .collection('buildings')
            .where('architect', '==', address)
            .get()
            .then(resultSet => {
                let buildings = [];
                if (!resultSet.empty) {
                    buildings = resultSet.docs
                        .map(doc => doc.data())
                        .filter(doc => doc.blockTimestamp >= fromTimestamp);
                }
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

    saveImageToStorage(buffer, path, mimetype) {
        return new Promise(resolve => {
            const bucket = storage.bucket();
            const file = bucket.file(path);

            const stream = file.createWriteStream({
                metadata: {
                    contentType: mimetype,
                    // Enable long-lived HTTP caching headers
                    // Use only if the contents of the file will never change
                    // (If the contents will change, use cacheControl: 'no-cache')                
                    cacheControl: 'public, max-age=31536000'
                },
                resumable: false
            });

            stream.on('finish', () => {
                file.makePublic().then(() => {
                    resolve(`https://storage.googleapis.com/block-cities.appspot.com/${path}`);
                });
            });

            stream.end(buffer);
        });
    }

}

module.exports = new BuildingDataService();
