/*
    End user requesting personal data from public blockchain 
*/

const Web3 = require("web3");
const { getMedicalData } = require("../router/Medical-Service/ethereum");

const web3 = new Web3("ws://127.0.0.1:8547");
const address = "0xf5D9B7bCE5184c3ff6Da7B50caCb2493F86897C1";

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


const captureCallEvent = () => {
    contract.events.CallbackRequestInitiated(function (error, event) {
        getMedicalData();
    })
};

module.exports = {
    getData,
    captureCallEvent
}