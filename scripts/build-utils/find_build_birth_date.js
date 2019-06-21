const axios = require('axios');

const blockcitiesContractService = require('../../functions/services/blockcities.contract.service');

const wait = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 2000);
    });
};

void async function () {

    const NETWORK = 1;

    const {tokenIdPointer} = await blockcitiesContractService.tokenPointers(NETWORK);
    console.log(`Total tokens ${tokenIdPointer}`);

    for (let i = 1; i <= 5; i++) {
        // TODO get born date for building
        console.log((await blockcitiesContractService.birthEventForToken(NETWORK, i)));
    }

}();
