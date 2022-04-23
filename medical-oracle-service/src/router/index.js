/*
    Calling medical router node in the blockchain router 
*/
const Web3 = require("web3");
const { getPatientData } = require("../service/MedicalRecords");

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

const contract = new web3.eth.Contract(ABI, address);

const getAccounts = () => {
    return web3.eth.getAccounts()
};

const returnMedicalData = async (callerAddress, sourceAddress) => {
    await getAccounts()
        .then(accounts => {
            getPatientData(callerAddress).then(data => {
                let patientData = {
                    patientName: data['patientName'],
                    patientDetailsJson: data['patientDetailsJson']
                }
                contract.methods.responseCall(sourceAddress, 45, JSON.stringify(patientData), callerAddress)
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
        let sourceAddress = event.returnValues.source;
        returnMedicalData(callerAddress, sourceAddress);
    });
};

module.exports = {
    captureCallEvent,
    returnMedicalData
}