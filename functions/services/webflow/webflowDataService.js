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

    async getCollectionItems(collectionId) {
        const collection = await this.api.collection({collectionId: collectionId});
        return collection.items();
    }

    async removeCollection(collectionId) {
        const collection = await this.api.collection({collectionId: collectionId});
        const items = await collection.items();

        return Promise.all(items.items.map((i) => this.api.removeItem({
            collectionId: collectionId,
            itemId: i._id,
        }, {live: true})));
    }

    /**
     * @deprecated dont use until we have a mapping table
     */
    async upsertBuildData(collectionId, data) {
        try {
            const {tokenId} = data;

            const items = await this.getCollectionItems(collectionId);
            const tokens = items.items.filter((i) => i['token-id'] === tokenId);

            if (tokens.length !== 1) {
                throw new Error('Something bad happened, we do not have a single token');
            }

            // update
            const {_id, slug} = tokens[0];

            console.log(_id);

            const update = await this.updateBuildingForTokenId(collectionId, _id, {
                ...data,
            });

            return update;

        } catch (e) {
            console.error(e);
        }

        return this.addItemToCollection(collectionId, data);
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

    async updateBuildingForTokenId(collectionId, itemId, data) {
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

}

module.exports = new WebflowDataService();