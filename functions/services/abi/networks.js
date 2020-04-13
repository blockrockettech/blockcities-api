const _ = require('lodash');
const Eth = require('ethjs');
const Web3 = require('web3');
const functions = require('firebase-functions');

const INFURA_KEY = '1'; //functions.config().infura.key;
if (!INFURA_KEY) {
    throw new Error('No Infura key found');
}

const contracts = require('blockcities-contract-artifacts').contracts;
const tools = require('blockcities-contract-artifacts').tools;

const foamAbi = require('./foam.abi');

const connectToBlockCities = (network) => {
    return new Eth(new Eth.HttpProvider(getHttpProviderUri(network)))
        .contract(contracts.addresses.BlockCities(network).abi)
        .at(contracts.addresses.BlockCities(network).address);
};

const connectToFoamMainnet = () => {
    return new Eth(new Eth.HttpProvider(getHttpProviderUri(1)))
        .contract(foamAbi)
        .at('0x01eD068115ba99b94c65c7791D4Ac5Dee1253835');
};

const connectToLimitedVendingMachine = (network) => {
    return new Eth(new Eth.HttpProvider(getHttpProviderUri(network)))
        .contract(contracts.addresses.LimitedVendingMachine(network).abi)
        .at(contracts.addresses.LimitedVendingMachine(network).address);
};

const connectToCityBuildingValidator = (network) => {
    return new Eth(new Eth.HttpProvider(getHttpProviderUri(network)))
        .contract(contracts.addresses.CityBuildingValidator(network).abi)
        .at(contracts.addresses.CityBuildingValidator(network).address);
};

const web3HttpInstance = (network) => {
    return new Web3(new Web3.providers.HttpProvider(getHttpProviderUri(network)));
};

const web3WebSocketInstance = (network) => {
    return new Web3(new Web3.providers.WebsocketProvider(getWebSocketProviderUri(network)));
};

const connectToBlockCitiesWebSocketWeb3 = (network) => {
    const web3 = new Web3(new Web3.providers.WebsocketProvider(`wss://${tools.getNetworkName(network)}.infura.io/ws/v3/${INFURA_KEY}`));
    return new web3.eth.Contract(contracts.addresses.BlockCities(network).abi, getBlockCitiesNftAddressForNetwork(network));
};

function getHttpProviderUri(network) {
    if (_.toNumber(network) === 5777) {
        return 'http://127.0.0.1:7545'; // a.k.a. ganache
    }
    return `https://${tools.getNetworkName(network)}.infura.io/v3/${INFURA_KEY}`;
}

function getWebSocketProviderUri(network) {
    if (_.toNumber(network) === 5777) {
        return 'http://127.0.0.1:7545'; // a.k.a. ganache
    }
    return `wss://${tools.getNetworkName(network)}.infura.io/ws/v3/${INFURA_KEY}`;
}

const isMainnet = (network) => {

    const foundNetwork = tools.networkSplitter(network, {
        mainnet: 'mainnet',
        ropsten: 'ropsten',
        rinkeby: 'rinkeby',
        local: 'local'
    });
    return 'mainnet' === foundNetwork;
};

const getBlockCitiesNftAddressForNetwork = (network) => {
    return contracts.addresses.BlockCities(network).address;
};

const getBlockCitiesNftDeploymentBlockForNetwork = (network) => {
    const address = contracts.addresses.BlockCities(network).address;
    return getContractDetailsForAddress(address).deploymentBlock;
};

/**
 * @return {{deploymentBlock: number, address: *, abi: (*[]|*), network: string}}
 */
const getContractDetailsForAddress = (address) => {
    switch (address) {
        case contracts.addresses.BlockCities(1).address:
            return {
                network: 'mainnet',
                abi: contracts.addresses.BlockCities(1).abi,
                deploymentBlock: 7488550,
                address
            };
        case contracts.addresses.BlockCities(3).address:
            return {
                network: 'ropsten',
                abi: contracts.addresses.BlockCities(3).abi,
                deploymentBlock: 5372025,
                address
            };
        case contracts.addresses.BlockCities(4).address:
            return {
                network: 'rinkeby',
                abi: contracts.addresses.BlockCities(4).abi,
                deploymentBlock: 4134483,
                address
            };
        default:
            throw new Error('Unkown address ' + address);
    }
};

module.exports = {
    isMainnet,
    getContractDetailsForAddress,
    connectToBlockCities,
    connectToBlockCitiesWebSocketWeb3,
    web3HttpInstance,
    web3WebSocketInstance,
    getBlockCitiesNftAddressForNetwork,
    getBlockCitiesNftDeploymentBlockForNetwork,
    connectToFoamMainnet,
    connectToLimitedVendingMachine,
    connectToCityBuildingValidator,
};
