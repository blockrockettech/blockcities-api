const config = require('../../functions/services/webflow/config');
const webflowDataService = require('../../functions/services/webflow/webflowDataService');

const blockcitiesDataService = require('../../functions/services/blockcities.data.service');

const wait = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 1500);
    });
};

const NETWORK = 1;

void async function () {

    try {
        // await webflowDataService.removeCollection(config.collections.buildings);
        // console.log(`Collection removed`);

        const {tokenIdPointer} = await blockcitiesDataService.tokenPointers(NETWORK);
        console.log(`Total tokens ${tokenIdPointer}`);

        for (let tokenId = 5; tokenId <= 15; tokenId++) {
            await blockcitiesDataService.exportWebflowBuildProfile(NETWORK, tokenId);
            await wait();
        }

        // kill it
        process.exit();

    } catch (e) {
        console.error(e);

        // kill it
        process.exit();
    }
}();
