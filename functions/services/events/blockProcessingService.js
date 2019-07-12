const _ = require('lodash');
const database = require('../firebase.service').database();

/**
 * Basic wrapper class that can manage a firebase database connection, also providing block based step conditions
 */
class BlockProcessingFlow {
    constructor({_rootPath, _deploymentBlock}) {
        this.rootPath = _rootPath;
        this.deploymentBlock = _deploymentBlock;
    }

    async getLastBlock() {
        return database.ref(`${this.rootPath}`)
            .once('value')
            .then((snapshot) => {
                let data = snapshot.val();
                return _.get(data, 'lastBlock', this.deploymentBlock);
            });
    }

    async clearLastBlock() {
        return database.ref(`${this.rootPath}`).set(null);
    }

    async updateLastBlockProcessed({lastBlock}) {
        console.log(`Updating last block processed to [${lastBlock}] for rootPath [${this.rootPath}]`);
        return database.ref(`${this.rootPath}`).set({lastBlock});
    }

    getRootPath() {
        return this.rootPath;
    }
}

module.exports = {
    getEventScrapperFlow: (contractAddress, deploymentBlock) =>
        new BlockProcessingFlow({
            _deploymentBlock: deploymentBlock,
            _rootPath: `event-scrapper-${contractAddress}`
        }),
};
