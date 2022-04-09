import React from 'react';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

function TableComponent() {
    return (
        <TableContainer mb='22px'>
            <Table variant='striped'>
                <Thead>
                    <Tr>
                        <Th>Id</Th>
                        <Th>Blockchain Name</Th>
                        <Th>Blockchain Address</Th>
                        <Th>Priority</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>1</Td>
                        <Td>Medical Blockchain</Td>
                        <Td>0xasdasdasdasd</Td>
                        <Td>1</Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default TableComponent