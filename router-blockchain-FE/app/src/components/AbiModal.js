import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'

function AbiModal({ isOpen, onOpen, onClose, data }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>ABI</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>
                        {data}
                    </pre>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default AbiModal