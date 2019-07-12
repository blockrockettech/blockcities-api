const _ = require('lodash');
const Eth = require('ethjs');
const Web3 = require('web3');

const {INFURA_KEY} = require('../constants');
const {blockCitiesAbi} = require('./blockcities.abi');

const connectToBlockCities = (network) => {
    return new Eth(new Eth.HttpProvider(getHttpProviderUri(network)))
        .contract(blockCitiesAbi)
        .at(getBlockCitiesNftAddressForNetwork(network));
};

const web3HttpInstance = (network) => {
    return new Web3(new Web3.providers.HttpProvider(getHttpProviderUri(network)));
};

const web3WebSocketInstance = (network) => {
    return new Web3(new Web3.providers.WebsocketProvider(getWebSocketProviderUri(network)));
};

const connectToBlockCitiesWebSocketWeb3 = (network) => {
    const web3 = new Web3(new Web3.providers.WebsocketProvider(`wss://${getNetwork(network)}.infura.io/ws/v3/${INFURA_KEY}`));
    return new web3.eth.Contract(blockCitiesAbi, getBlockCitiesNftAddressForNetwork(network));
};

function getHttpProviderUri(network) {
    if (_.toNumber(network) === 5777) {
        return 'http://127.0.0.1:7545'; // a.k.a. truffle
    }
    return `https://${getNetwork(network)}.infura.io/v3/${INFURA_KEY}`;
}

function getWebSocketProviderUri(network) {
    if (_.toNumber(network) === 5777) {
        return 'http://127.0.0.1:7545'; // a.k.a. truffle
    }
    return `wss://${getNetwork(network)}.infura.io/ws/v3/${INFURA_KEY}`;
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

const getBlockCitiesNftAddressForNetwork = (network) => {
    return networkSplitter(network, {
        mainnet: '0x2f2d5aA0EfDB9Ca3C9bB789693d06BEBEa88792F',
        ropsten: '0x86eD0a82dDc2EdEA8cC4Bc023eC2a4079DAB42c9',
        rinkeby: '0x70D0C5f857C0C57190566d45AaF53234b65B8bE9',
        local: '0x70D0C5f857C0C57190566d45AaF53234b65B8bE9'
    });
};

/**
 * @param address
 * @return {{address: *, abi: (*[]|*), network: string}}
 */
const getContractDetailsForAddress = (address) => {
    switch (address) {
        case '0x2f2d5aA0EfDB9Ca3C9bB789693d06BEBEa88792F':
            return {
                network: 'mainnet',
                abi: blockCitiesAbi,
                deploymentBlock: 7488550,
                address
            };
        case '0x86eD0a82dDc2EdEA8cC4Bc023eC2a4079DAB42c9':
            return {
                network: 'ropsten',
                abi: blockCitiesAbi,
                deploymentBlock: 5372025,
                address
            };
        case '0x70D0C5f857C0C57190566d45AaF53234b65B8bE9':
            return {
                network: 'rinkeby',
                abi: blockCitiesAbi,
                deploymentBlock: 4134483,
                address
            };
        default:
            throw new Error('Unkown address ' + address);
    }
};

module.exports = {
    getNetwork,
    getContractDetailsForAddress,
    connectToBlockCities,
    connectToBlockCitiesWebSocketWeb3,
    web3HttpInstance,
    web3WebSocketInstance,
    getBlockCitiesNftAddressForNetwork
};
