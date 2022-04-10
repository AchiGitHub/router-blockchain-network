/*
    Calling medical smart contract to get data in medical blockchain 
*/
const Web3 = require("web3");

const web3 = new Web3("ws://127.0.0.1:8546");
const address = "0x16F436cf8778030524a6fE0e571067Efc9b6bcC2";

const ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "medicalRecords",
        "outputs": [
            {
                "internalType": "string",
                "name": "patientName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "patientDetailsJson",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "patientName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "patientDetailsJson",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "callerAddress",
                "type": "address"
            }
        ],
        "name": "addPatient",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "patientAddress",
                "type": "address"
            }
        ],
        "name": "getPatient",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "patientName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "patientDetailsJson",
                        "type": "string"
                    }
                ],
                "internalType": "struct MedicalRecords.MedicalInformation",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }
];

const contract = new web3.eth.Contract(ABI, address);

const getAccounts = () => {
    return web3.eth.getAccounts()
};

const saveMedicalRecord = async (patientName, patientData, patientAddress) => {
    await getAccounts()
        .then(accounts => {
            contract.methods.addPatient(patientName, patientData, patientAddress)
                .send({ from: accounts[1], gasLimit: 500000 })
                .then((receipt) => {
                    console.log('Reciept', receipt)
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
};

const getPatientData = async (patientAddress) => {
    return await getAccounts()
        .then(accounts => {
            return contract.methods.getPatient(patientAddress).call({ from: accounts[0] }).then(data => {
                return data;
            })
        })
        .catch(err => console.log(err))
}

module.exports = {
    saveMedicalRecord,
    getPatientData
}