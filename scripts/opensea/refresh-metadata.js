const blockcitiesContractService = require('../../functions/services/blockcities.contract.service');
const openSeaService = require('../../functions/services/openSea.service');

const wait = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 1000);
    });
};

void async function () {
    const NETWORK = 1;

    const {tokenIdPointer} = await blockcitiesContractService.tokenPointers(NETWORK);
    console.log(`Total tokens ${tokenIdPointer}`);

    for (let i = 2002; i <= 2005; i++) {
        await openSeaService.refreshTokenMetaData(NETWORK, i);
        await wait();
        console.log(`Refreshed token ID [${i}]`);
    }
}();
