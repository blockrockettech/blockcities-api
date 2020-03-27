const _ = require('lodash');

const admin = require('firebase-admin');

let db;
let firestore;
let storage;

module.exports = {
    database: (overriddenAdmin = false) => {
        if (db) {
            // console.log("using cached DB instance");
            return db;
        }
        if (!overriddenAdmin && !admin) {
            throw new Error('Service not setup...!');
        }
        db = overriddenAdmin
            ? overriddenAdmin.database()
            : admin.database();
        return db;
    },
    firestore: (overriddenAdmin = false) => {
        if (firestore) {
            // console.log("using cached firestore instance");
            return firestore;
        }
        if (!overriddenAdmin && !admin) {
            throw new Error('Service not setup...!');
        }

        // When invoking from a script (see ./scripts/) we need to bootstrap firebase earlier
        firestore = overriddenAdmin
            ? overriddenAdmin.firestore()
            : admin.firestore();

        const settings = { timestampsInSnapshots: true };
        firestore.settings(settings);
        return firestore;
    },
    storage: (overriddenAdmin = false) => {
        if (storage) {
            return storage;
        }
        if (!overriddenAdmin && !admin) {
            throw new Error('Service not setup...!');
        }

        // When invoking from a script (see ./scripts/) we need to bootstrap firebase earlier
        storage = overriddenAdmin
            ? overriddenAdmin.storage()
            : admin.storage();
        return storage;
    }
};
