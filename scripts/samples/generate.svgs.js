const fs = require('fs');
const _ = require('lodash');

const blockcitiesContractService = require('../../functions/services/blockcities.contract.service');
const imageBuilderService = require('../../functions/services/imageBuilder.service');

void async function () {

    const NETWORK = 5777;

    const {tokenIdPointer} = await blockcitiesContractService.tokenPointers(NETWORK);

    for (let i = 1; i < tokenIdPointer; i++) {
        const image = await imageBuilderService.generateTokenImage(NETWORK, i);
        const wstream = fs.createWriteStream(`./scripts/samples/generated/token-${i}.svg`);
        wstream.write(image);
        wstream.end();
    }

}();
