/**
    Calling medical router node in the blockchain router 
*/
const Web3 = require("web3");

const web3 = new Web3("ws://127.0.0.1:8545");
const address = "0x7237d63Ceb2C1f34DFA88A962893588900B4E7b8";

const ABI = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "routingAddresses",
        "outputs": [
            {
                "internalType": "string",
                "name": "blokchainName",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "priority",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "blockchainAddress",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "timestamp",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "applicationInterface",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "node",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "blockchainName",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "priorirty",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "blockchainAddress",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "timestamp",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "applicationInterface",
                "type": "string"
            }
        ],
        "name": "setRouter",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "getRouterNode",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "blokchainName",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "priority",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "blockchainAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "timestamp",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "applicationInterface",
                        "type": "string"
                    }
                ],
                "internalType": "struct Router.RouterInformation",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllNodes",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "blokchainName",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "priority",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "blockchainAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "timestamp",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "applicationInterface",
                        "type": "string"
                    }
                ],
                "internalType": "struct Router.RouterInformation[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const contract = new web3.eth.Contract(ABI, address);

const setRouterNode = (node, blockchainName, priority, blockchainAddress, userAddress, abi) => {
    let timestamp = new Date().toISOString();
    contract.methods.setRouter(node, blockchainName, priority, blockchainAddress, timestamp, abi)
        .send({ from: userAddress, gasLimit: 500000 })
        .then((receipt) => {
            console.log('Reciept', receipt)
        })
};

const getRouterNodes = (userAddress) => {
    return contract.methods.getAllNodes().call({ from: userAddress }).then(data => {
        let items = [];
        data.forEach((item, idx) => {
            items.push({
                blockchainAddress: item[2],
                name: item[0],
                priority: item[1],
                node: idx,
                applicationInterface: item.applicationInterface
            })
        });
        return items;
    })
}

module.exports = {
    setRouterNode,
    getRouterNodes
}