import React, { useState } from 'react';
import { Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import AbiModal from './AbiModal';

function TableComponent({ data }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [abidata, setAbidata] = useState('');

    return (
        <TableContainer mb='22px'>
            <Table variant='striped'>
                <Thead>
                    <Tr>
                        <Th>Id</Th>
                        <Th>Blockchain Name</Th>
                        <Th>Blockchain Address</Th>
                        <Th>Priority</Th>
                        <Th>ABI</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((item, idx) => {
                        return <Tr key={idx}>
                            <Td>{idx}</Td>
                            <Td>{item.name}</Td>
                            <Td>{item.blockchainAddress}</Td>
                            <Td>{item.priority}</Td>
                            <Td><Button onClick={() => { onOpen(); setAbidata(item.applicationInterface); }}>View</Button></Td>
                        </Tr>
                    })}
                </Tbody>
            </Table>
            <AbiModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} data={abidata} />
        </TableContainer>
    )
}

export default TableComponent