/**
 * Connection to the public blockchain instantiated here
 * listen to the user request data from blockchain through public blockchain
 * address - Public smart contract address
 * ABI - Public smart contract ABI
 */
const Web3 = require("web3");
const { getMedicalData, captureAcknowledgeEvent, medicalContract } = require("../router/Medical-Service/ethereum");

const web3 = new Web3("ws://127.0.0.1:8547");
const address = "0x80d4857b5Ccfc418BCA5cbD0EB69929c3E8D5301";

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
                "name": "",
                "type": "address"
            }
        ],
        "name": "users",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "email",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "birthdate",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "age",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "phoneNumber",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "streetAddress",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "city",
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
                "internalType": "bool",
                "name": "status",
                "type": "bool"
            },
            {
                "internalType": "string",
                "name": "data",
                "type": "string"
            }
        ],
        "name": "acknowledgeCall",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "email",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "birthdate",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "age",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "phoneNumber",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "streetAddress",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "city",
                "type": "string"
            }
        ],
        "name": "registerUser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getUser",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "email",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "birthdate",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "age",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "phoneNumber",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "streetAddress",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "city",
                        "type": "string"
                    }
                ],
                "internalType": "struct PublicCrossChain.User",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
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
            getMedicalData(event.returnValues.callerAddress);
        } else {
            return;
        }
    })
};

const acknowledgeData = async (acknowledgeData) => {
    await getAccounts()
        .then(accounts => {
            contract.methods.acknowledgeCall(15, 15, acknowledgeData)
                .send({ from: accounts[1] })
                .then((receipt) => {
                    console.log('Reciept', receipt)
                })
        })
        .catch(err => console.log(err))
};

const captureAcknowledgeData = () => {
    medicalContract.events.CallbackRequestAcknowledged(function (error, event) {
        console.log("🚀 ~ file: ethereum.js ~ line 326 ~ event", event)
        let data = event.returnValues.data;
        acknowledgeData(data);
    });
};


module.exports = {
    getData,
    captureCallEvent,
    captureAcknowledgeData
}