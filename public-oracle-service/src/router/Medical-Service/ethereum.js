/*
    Calling medical router node in the blockchain router 
    ABI - Router ABI 
    Contract address - Router Medical contract oracle
*/
const Web3 = require("web3");

const web3 = new Web3("ws://127.0.0.1:8545");
const address = "0xc81327e325a1877625C67E05eA065Cbd88a87d5E";

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
                "indexed": true,
                "internalType": "address",
                "name": "source",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "destination",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "data",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "callerAddress",
                "type": "address"
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
                "internalType": "address",
                "name": "source",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "destination",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "data",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "callerAddress",
                "type": "address"
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
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "source",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "destination",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "data",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "callerAddress",
                "type": "address"
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
                "internalType": "address",
                "name": "source",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "destination",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "data",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "callerAddress",
                "type": "address"
            }
        ],
        "name": "responseCall",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const medicalContract = new web3.eth.Contract(ABI, address);

const getAccounts = () => {
    return web3.eth.getAccounts()
};

const getMedicalData = (callerAddress, sourceAddress) => {
    return new Promise((resolve, reject) => {
        getAccounts()
            .then(accounts => {
                medicalContract.methods.requestCall(sourceAddress, 69, "60", callerAddress)
                    .send({ from: accounts[1] })
                    .then((receipt) => {
                        // console.log('Reciept', receipt)
                    })
            })
            .catch(err => console.log(err))
    })
};

const captureCallEvent = () => {
    medicalContract.events.CallbackRequestInitiated(function (error, event) { console.log('Event data', event); })
};

const captureAcknowledgeEvent = () => {
    return medicalContract.events.CallbackRequestAcknowledged(function (error, event) {
        let data = event.returnValues.data;
        let patientData = JSON.parse(data).patientDetailsJson;
        return JSON.parse(patientData);
    })
}

module.exports = {
    getMedicalData,
    captureCallEvent,
    captureAcknowledgeEvent,
    medicalContract
}