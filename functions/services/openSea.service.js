const _ = require('lodash');
const axios = require('axios');
const {getAddressForNetwork} = require("./abi/networks");

// FIXME use firebase config
const API_KEY = "33afe84383074118ba5c4a54bf08db81";

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

class OpenSeaService {

    refreshTokenMetaData(network, tokenId) {
        const address = getAddressForNetwork(network);

        return axios
            .get(`${getApi(network)}/asset/${address}/${tokenId}/?force_update=true`, {
                'X-API-KEY': API_KEY
            })
            .then((result) => {
                return result.data;
            });
    }
}

module.exports = new OpenSeaService();
