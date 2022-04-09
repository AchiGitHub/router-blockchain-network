/*
    Calling medical router node in the blockchain router 
*/
const Web3 = require("web3");

const web3 = new Web3("ws://127.0.0.1:8545");
const address = "0x2e6531Ab7DcAA83E2a23f8551f7C8521617d4c8E";

const ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "source",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "destination",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "data",
                "type": "uint256"
            }
        ],
        "name": "CallbackRequestAcknowledged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "source",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "destination",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "data",
                "type": "uint256"
            }
        ],
        "name": "CallbackRequestInitiated",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "source",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "destination",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "data",
                "type": "uint256"
            }
        ],
        "name": "requestCall",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "source",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "destination",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "data",
                "type": "uint256"
            }
        ],
        "name": "responseCall",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const contract = new web3.eth.Contract(ABI, address);

const getAccounts = () => {
    return web3.eth.getAccounts()
};

const getMedicalData = () => {
    return new Promise((resolve, reject) => {
        getAccounts()
            .then(accounts => {
                contract.methods.requestCall(69, 69, 69)
                    .send({ from: accounts[1] })
                    .then((receipt) => {
                        // console.log('Reciept', receipt)
                    })
            })
            .catch(err => console.log(err))
    })
};

const captureCallEvent = () => {
    contract.events.CallbackRequestInitiated(function (error, event) { console.log('Event data', event); })
};

const captureAcknowledgeEvent = () => {
    contract.events.CallbackRequestAcknowledged(function (error, event) { console.log('Acknowledge Event data to public Bc', event); })
}

module.exports = {
    getMedicalData,
    captureCallEvent,
    captureAcknowledgeEvent
}