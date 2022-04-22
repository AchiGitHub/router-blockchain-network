/**
 * Connection to the public blockchain instantiated here
 * listen to the user request data from blockchain through public blockchain
 * address - Public smart contract address
 * ABI - Public smart contract ABI
 */
const Web3 = require("web3");

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

const requestData = (userAccount) => {
    return contract.methods.requestCall(15, 15, 15)
        .send({ from: userAccount })
        .then((receipt) => {
            console.log('Reciept', receipt)
        })
};

const registerUser = (
    name,
    email,
    birthdate,
    age,
    phoneNumber,
    streetAddress,
    city,
    userAddress,
    callBack
) => {
    return contract.methods.registerUser(
        name,
        email,
        birthdate,
        age,
        phoneNumber,
        streetAddress,
        city
    )
        .send({ from: userAddress, gasLimit: 500000 })
        .then((receipt) => {
            console.log('Reciept', receipt);
            callBack();
        })
};

const getUserDetails = (userAddress) => {
    return contract.methods.getUser().call({ from: userAddress }).then(data => {
        return data;
    })
};

const getResponse = () => {
    return contract.events.CallbackRequestAcknowledged(function (error, event) {
        let data = event.returnValues.returnedData;
        localStorage.setItem('response', data)
    });
};

module.exports = {
    requestData,
    registerUser,
    getUserDetails,
    getResponse,
    contract
}