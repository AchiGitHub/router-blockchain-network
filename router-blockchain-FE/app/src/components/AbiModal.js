import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'

function AbiModal({ isOpen, onOpen, onClose, data }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size={'5xl'} scrollBehavior={'inside'} isCentered>
            <ModalOverlay />
            <ModalContent w={600}>
                <ModalHeader>ABI</ModalHeader>
                <ModalCloseButton />
                <ModalBody h={200}>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>
                        {JSON.stringify(js)}
                    </pre>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default AbiModal


const js = [
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
]