const {
    getContractDetailsForAddress,
    web3WebSocketInstance
} = require('../abi/networks');

const blockProcessingService = require('./blockProcessingService');
const eventStoreService = require('../eventsStore.service');
const mapper = require('./mapper');

class EventsService {

    async processEventsForAddress(address) {

        const {abi, network, deploymentBlock} = getContractDetailsForAddress(address);

        const provider = web3WebSocketInstance(network);

        const latestBlock = await provider.eth.getBlockNumber();

        // Moving pointer approx 6 blocks behind the main chain to prevent chain re-orgs
        const numberOfConfirmations = 6;
        const blockMinusConfirmations = latestBlock - numberOfConfirmations;
        console.log(`Event Scrapper - using block [${blockMinusConfirmations}] which is [${numberOfConfirmations}] behind network [${network}] which is [${latestBlock}]`);

        const flow = blockProcessingService.getEventScrapperFlow(address, deploymentBlock);

        const lastProcessedBlock = await flow.getLastBlock();
        console.log(`Event Scrapper - last processed block [${lastProcessedBlock}] for network [${network}]`);

        // handle catching up the latest block number and limit scape to 10000 blocks at a time
        const toBlock = lastProcessedBlock + 10000 > blockMinusConfirmations
            ? blockMinusConfirmations
            : lastProcessedBlock + 10000;

        const WatchingContract = provider.eth.Contract(abi, address);

        // Get the next set of events
        const events = await WatchingContract.getPastEvents('allEvents', {
            fromBlock: lastProcessedBlock,
            toBlock: toBlock
        });

        console.log(`Event Scrapper - found a total of [${events.length}] events from [${lastProcessedBlock}] to [${toBlock}]`);

        // Process them all
        const promises = events.map(async event => {
            const block = await provider.eth.getBlock(event.blockNumber);
            const mappedEvent = mapper(event, block);
            return eventStoreService.upsertEvent(network, mappedEvent);
        });

        // Write them all to the DB
        await Promise.all(promises);

        // Update block pointer
        await flow.updateLastBlockProcessed({lastBlock: toBlock});

        // Success!
        return promises.length
    }

}

module.exports = new EventsService();
