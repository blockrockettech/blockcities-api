const _ = require('lodash');
const axios = require('axios');
const {getBlockCitiesNftAddressForNetwork} = require('./abi/networks');

const getApi = (networkId) => {
    switch (_.toString(networkId)) {
        case '1':
            return 'https://api.opensea.io/api/v1';
        case '3':
            return 'https://rinkeby-api.opensea.io/api/v1';
        default:
            throw new Error(`Unhandled network - open sea only supports network ID 1 & 3 - provided [${networkId}]`);
    }
};

const config = require('./config');

class OpenSeaService {

    refreshTokenMetaData(network, tokenId) {
        const address = getBlockCitiesNftAddressForNetwork(network);

        return axios
            .get(`${getApi(network)}/asset/${address}/${tokenId}/?force_update=true`, {
                'X-API-KEY': config.openSea.apiToken
            })
            .then((result) => {
                return result.data;
            });
    }
}

module.exports = new OpenSeaService();
