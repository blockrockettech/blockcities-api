const blockcitiesContractService = require('../../functions/services/blockcities.contract.service');

void async function () {

    const NETWORK = 1;

    const {tokenIdPointer} = await blockcitiesContractService.tokenPointers(NETWORK);
    console.log(`Total tokens ${tokenIdPointer}`);

    for (let i = 1; i <= 5; i++) {
        console.log((await blockcitiesContractService.birthEventForToken(NETWORK, i)));
    }

}();
