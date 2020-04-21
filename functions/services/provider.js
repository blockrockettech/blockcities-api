const functions = require('firebase-functions');
const tools = require('blockcities-contract-artifacts').tools;
const {Wallet, ethers} = require('ethers');

const bc1 = functions.config().bc1.key;

const httpProviderWeb3 = {};
const walletForNetwork = {};

function createWallet(network) {
    let provider = ethers.getDefaultProvider(tools.getNetworkName(network));
    return new Wallet(bc1, provider);
}

const getHttpProvider = (network) => {
    if (httpProviderWeb3[network]) {
        return httpProviderWeb3[network];
    }

    const wallet = createWallet(network);
    httpProviderWeb3[network] = wallet.provider;
    walletForNetwork[network] = wallet;
    return httpProviderWeb3[network];
};

const getWallet = (network) => {
    if (walletForNetwork[network]) {
        return walletForNetwork[network];
    }

    const wallet = createWallet(network);
    httpProviderWeb3[network] = wallet.provider;
    walletForNetwork[network] = wallet;
    return walletForNetwork[network];
};

module.exports = {
    getHttpProvider,
    getWallet
};