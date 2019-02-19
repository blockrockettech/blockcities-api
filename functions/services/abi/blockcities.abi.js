const tokenABI = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x01ffc9a7"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x06fdde03"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "getApproved",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x081812fc"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "to",
                "type": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x095ea7b3"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "account",
                "type": "address"
            }
        ],
        "name": "addWhitelisted",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x10154bad"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x18160ddd"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "cityPointer",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x20071a12"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "from",
                "type": "address"
            },
            {
                "name": "to",
                "type": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x23b872dd"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "account",
                "type": "address"
            }
        ],
        "name": "removeWhitelisted",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x291d9549"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "owner",
                "type": "address"
            },
            {
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "tokenOfOwnerByIndex",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x2f745c59"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "account",
                "type": "address"
            }
        ],
        "name": "isWhitelisted",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x3af32abf"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "tokenIdPointer",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x3b3a1a7a"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalBuildings",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x3ba5c722"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "from",
                "type": "address"
            },
            {
                "name": "to",
                "type": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x42842e0e"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "renounceWhitelistAdmin",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x4c5a628c"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "tokenBaseURI",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x4e99b800"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "tokenByIndex",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x4f6ccce7"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ownerOf",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x6352211e"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "cities",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x6a51b918"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x70a08231"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "account",
                "type": "address"
            }
        ],
        "name": "addWhitelistAdmin",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x7362d9c8"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x95d89b41"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "to",
                "type": "address"
            },
            {
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xa22cb465"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "from",
                "type": "address"
            },
            {
                "name": "to",
                "type": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "name": "_data",
                "type": "bytes"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xb88d4fde"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "account",
                "type": "address"
            }
        ],
        "name": "isWhitelistAdmin",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xbb5f747b"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "renounceWhitelisted",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xd6cd9473"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "owner",
                "type": "address"
            },
            {
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "isApprovedForAll",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xe985e9c5"
    },
    {
        "inputs": [
            {
                "name": "_tokenBaseURI",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor",
        "signature": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "_tokenId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "name": "_to",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_architect",
                "type": "address"
            }
        ],
        "name": "BuildingMinted",
        "type": "event",
        "signature": "0x90ac329ea07c00bb85a3b33470a0318e5d1a5e181fd50431248bc3c750695277"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "_cityId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "_cityName",
                "type": "bytes32"
            }
        ],
        "name": "CityAdded",
        "type": "event",
        "signature": "0xa2e4e22d1e9b0b4d3847dc1b106906a4ce32e6636b6169a9733c7f70949bbbe7"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "account",
                "type": "address"
            }
        ],
        "name": "WhitelistedAdded",
        "type": "event",
        "signature": "0xee1504a83b6d4a361f4c1dc78ab59bfa30d6a3b6612c403e86bb01ef2984295f"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "account",
                "type": "address"
            }
        ],
        "name": "WhitelistedRemoved",
        "type": "event",
        "signature": "0x270d9b30cf5b0793bbfd54c9d5b94aeb49462b8148399000265144a8722da6b6"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "account",
                "type": "address"
            }
        ],
        "name": "WhitelistAdminAdded",
        "type": "event",
        "signature": "0x22380c05984257a1cb900161c713dd71d39e74820f1aea43bd3f1bdd20961299"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "account",
                "type": "address"
            }
        ],
        "name": "WhitelistAdminRemoved",
        "type": "event",
        "signature": "0x0a8eb35e5ca14b3d6f28e4abf2f128dbab231a58b56e89beb5d636115001e165"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event",
        "signature": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "approved",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event",
        "signature": "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "ApprovalForAll",
        "type": "event",
        "signature": "0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_exteriorColorway",
                "type": "uint256"
            },
            {
                "name": "_windowColorway",
                "type": "uint256"
            },
            {
                "name": "_city",
                "type": "uint256"
            },
            {
                "name": "_base",
                "type": "uint256"
            },
            {
                "name": "_body",
                "type": "uint256"
            },
            {
                "name": "_roof",
                "type": "uint256"
            },
            {
                "name": "_architect",
                "type": "address"
            }
        ],
        "name": "createBuilding",
        "outputs": [
            {
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xa0168aa2"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "tokenURI",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xc87b56dd"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "attributes",
        "outputs": [
            {
                "name": "_exteriorColorway",
                "type": "uint256"
            },
            {
                "name": "_windowColorway",
                "type": "uint256"
            },
            {
                "name": "_city",
                "type": "uint256"
            },
            {
                "name": "_base",
                "type": "uint256"
            },
            {
                "name": "_body",
                "type": "uint256"
            },
            {
                "name": "_roof",
                "type": "uint256"
            },
            {
                "name": "_architect",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xd05dcc6a"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "tokensOfOwner",
        "outputs": [
            {
                "name": "",
                "type": "uint256[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x8462151c"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalCities",
        "outputs": [
            {
                "name": "_total",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xf09bea14"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_cityName",
                "type": "bytes32"
            }
        ],
        "name": "addCity",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x567629ce"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "burn",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x42966c68"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_newBaseURI",
                "type": "string"
            }
        ],
        "name": "updateTokenBaseURI",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x2295ee5b"
    }
];

module.exports = {
    abi: tokenABI
};
