const blockcitiesDataService = require('../../functions/services/blockcities.data.service');

const wait = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 500);
    });
};

const NETWORK = 1;

void async function () {

    try {
        const {tokenIdPointer} = await blockcitiesDataService.tokenPointers(NETWORK);
        console.log(`Total tokens ${tokenIdPointer}`);

        for (let tokenId = 1; tokenId <= 25; tokenId++) {
            await blockcitiesDataService.exportWebflowBuildProfile(NETWORK, tokenId);
            await wait();
        }

        console.log('Completed');
        process.exit();
    } catch (e) {
        console.error(e);
        process.exit();
    }
}();
