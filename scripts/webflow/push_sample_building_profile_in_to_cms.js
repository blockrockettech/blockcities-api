const webflowDataService = require('../../functions/services/webflow/webflowDataService');

const config = require('../../functions/services/webflow/config');

void async function () {

    const TOKEN_ID = 1000;

    // await webflowDataService.addItemToCollection(config.collections.buildings, {
    //     name: 'Jimbobs Building',
    //     'token-id': TOKEN_ID,
    //     city: 'Manchester',
    //     slug: TOKEN_ID.toString(), // slug is used to define URL
    // });

    const {items, total} = await webflowDataService.findItemsInCollectionByTokenId(
        config.collections.buildings,
        TOKEN_ID
    );
    console.log(items);


    // // Could be multiple - we need to enforce this on the
    // console.log(items);
    //
    // const {_id, slug} = items[0];
    // // console.log(_id);
    //
    // try {
    //
    //     await webflowDataService.updateBuildForTokenId(config.collections.buildings, _id, {
    //         name: 'Preston\'s Building',
    //         'token-id': TOKEN_ID,
    //         city: 'Atlanta',
    //         slug: slug // slug is important and needed
    //     });
    //
    // } catch (e) {
    //     console.log(e);
    // }


    // await webflowDataService.upsertBuildData(config.collections.buildings, {
    //     name: 'Andys Building',
    //     'token-id': 1001,
    //     city: 'Centre Parks'
    // });

}();
