const config = require('../../functions/services/webflow/config');
const webflowDataService = require('../../functions/services/webflow/webflowDataService');

void async function () {
    try {
        await webflowDataService.removeCollection(config.collections.buildings);
        console.log(`Collection removed`);

        process.exit();
    } catch (e) {
        console.error(e);
        process.exit();
    }
}();
