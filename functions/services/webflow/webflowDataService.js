const Webflow = require('webflow-api');
const config = require('./config');

class WebflowDataService {

    constructor() {
        this.api = new Webflow({token: config.apiToken});
    }

    async geSites() {
        return this.api.sites({});
    }

    async geSite(siteId) {
        return this.api.site({siteId: siteId});
    }

    async getSiteCollections(siteId) {
        return this.api.site({siteId: siteId});
    }

    async getCollection(collectionId) {
        return this.api.collection({collectionId: collectionId});
    }

    async getCollectionItems(collectionId) {
        return this.api.collection({collectionId: collectionId});
    }

    async upsertBuildData(collectionId, data) {
        const {tokenId} = data;

        const results = await this.findItemsInCollectionByTokenId(collectionId, tokenId);
        const {items, total} = results;
        console.log(items);

        if (total > 1) {
            throw new Error('Something bad happened, we have multiple for the same token?');
        }

        if (total === 1) {
            // update
            const {_id, slug} = items[0];

            return await this.updateBuildForTokenId(collectionId, _id, {
                ...data,
                'token-id': tokenId,
                slug: slug
            });
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

    // FIXME this isnt working ... doesnt look like a way to find by field?
    // we need to store ITEM ID in our DB for this to work correctly since
    // https://wishlist.webflow.com/ideas/WEBFLOW-I-1449
    async findItemsInCollectionByTokenId(collectionId, tokenId) {
        return this.api.items({
            collectionId: collectionId,
        }, {
            'token-id': tokenId,
            'slug': tokenId
        });
    }

    async updateBuildForTokenId(collectionId, itemId, data) {
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
