/**
 * Connection to the public blockchain instantiated here
 * listen to the user request data from blockchain through public blockchain
 * address - Public smart contract address
 * ABI - Public smart contract ABI
 */
const Web3 = require("web3");
const { getMedicalData, captureAcknowledgeEvent } = require("../router/Medical-Service/ethereum");

const web3 = new Web3("ws://127.0.0.1:8547");
const address = "0xd94Aa5cA6D5FEE4DC15A442FC14b1E71c7B63a6d";

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
                "name": "callId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "status",
                "type": "bool"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "returnedData",
                "type": "string"
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
    }
];

const contract = new web3.eth.Contract(ABI, address);

const getAccounts = () => {
    return web3.eth.getAccounts()
};

const getData = () => {
    return new Promise((resolve, reject) => {
        getAccounts()
            .then(accounts => {
                contract.methods.requestCall(15, 15, 15)
                    .send({ from: accounts[1] })
                    .then((receipt) => {
                        console.log('Reciept', receipt)
                    })
            })
            .catch(err => console.log(err))
    })
};


const captureCallEvent = (id) => {
    contract.events.CallbackRequestInitiated(function (error, event) {
        if (id === 1) {
            getMedicalData();
        } else {
            return;
        }
    })
};

const captureAcknowledgeData = () => {
    captureAcknowledgeEvent();
};

module.exports = {
    getData,
    captureCallEvent,
    captureAcknowledgeData
}