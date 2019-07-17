const Webflow = require('webflow-api');
const config = require('../config');

class WebflowDataService {

    constructor() {
        this.api = new Webflow({token: config.webflow.apiToken});
    }

    async getSites() {
        return this.api.sites({});
    }

    async getSite(siteId) {
        return this.api.site({siteId: siteId});
    }

    async getCollection(collectionId) {
        return this.api.collection({collectionId: collectionId});
    }

    async getCollectionItems(collectionId, limit = 100, offset = 0) {
        return await this.api.items({collectionId: collectionId}, {limit, offset});
    }

    async removeCollection(collectionId) {
        const collection = await this.api.collection({collectionId: collectionId});
        const items = await collection.items();

        return Promise.all(items.items.map((i) => this.api.removeItem({
            collectionId: collectionId,
            itemId: i._id,
        }, {live: true})));
    }

    async addItemToCollection(collectionId, data) {
        return this.api.createItem({
            collectionId: collectionId,
            fields: {
                _archived: false, // Items set to archived will not be published
                _draft: false, // Items set to draft will not be published
                ...data
            }
        }, {live: true}); // {live: true} = publishes data immediately
    }

    async updateItemInCollection(collectionId, itemId, data) {
        return this.api.updateItem({
            collectionId: collectionId,
            itemId: itemId,
            fields: {
                _archived: false, //Items set to archived will not be published
                _draft: false, //Items set to draft will not be published
                ...data
            }
        }, {live: true}); // {live: true} = publishes data immediately
    }

    async removeItemInCollection(collectionId, itemId) {
        return this.api.removeItem({collectionId: collectionId, itemId: itemId});
    }

}

module.exports = new WebflowDataService();
