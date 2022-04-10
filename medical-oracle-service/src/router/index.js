/*
    Calling medical router node in the blockchain router 
*/
const Web3 = require("web3");
const { getPatientData } = require("../service/MedicalRecords");

const web3 = new Web3("ws://127.0.0.1:8545");
const address = "0x6D59C93a5e9f0Eb22b9EBaF6d258e07BAf9c693A";

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
                "internalType": "string",
                "name": "data",
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
                "internalType": "string",
                "name": "data",
                "type": "string"
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

const returnMedicalData = async (callerAddress) => {
    await getAccounts()
        .then(accounts => {
            getPatientData(callerAddress).then(data => {
                let patientData = {
                    patientName: data['patientName'],
                    patientDetailsJson: data['patientDetailsJson']
                }
                contract.methods.responseCall(45, 45, JSON.stringify(patientData))
                    .send({ from: accounts[1] })
                    .then((receipt) => {
                        console.log('Reciept', receipt)
                    })
                    .catch(err => console.log(err))
            })
        })
        .catch(err => console.log(err))
};

const captureCallEvent = () => {
    contract.events.CallbackRequestInitiated(function (error, event) {
        let callerAddress = event.returnValues.callerAddress;
        returnMedicalData(callerAddress);
    });
};

module.exports = {
    captureCallEvent,
    returnMedicalData
}