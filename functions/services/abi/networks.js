const Eth = require('ethjs');

const {INFURA_KEY} = require('../constants');
const {abi} = require('./blockcities.abi');


const connectToBlockCities = (network) => {
    return new Eth(new Eth.HttpProvider(getHttpProviderUri(network)))
        .contract(abi)
        .at('0x194bAfbf8eb2096e63C5d9296363d6DAcdb32527'); // TODO this is local, use a lookup switch
};

function getHttpProviderUri(network) {
    if (network === 5777) {
        return 'http://127.0.0.1:7545'; // a.k.a. truffle
    }
    return `https://${getNetwork(network)}.infura.io/v3/${INFURA_KEY}`;
}

const networkSplitter = (network, {ropsten, rinkeby, mainnet, local}) => {
    switch (network) {
        case 1:
        case '1':
        case 'mainnet':
            return mainnet;
        case 3:
        case '3':
        case 'ropsten':
            return ropsten;
        case 4:
        case '4':
        case 'rinkeby':
            return rinkeby;
        case 5777:
        case '5777':
        case 'local':
            // This may change if a clean deploy
            return local;
        default:
            throw new Error(`Unknown network ID ${network}`);
    }
};

const getNetwork = (network) => {
    return networkSplitter(network, {
        mainnet: 'mainnet',
        ropsten: 'ropsten',
        rinkeby: 'rinkeby',
        local: 'local'
    });
};


module.exports = {
    connectToBlockCities
};
