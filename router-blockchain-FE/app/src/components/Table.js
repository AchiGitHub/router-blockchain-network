import React from 'react';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

function TableComponent({ data }) {
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
                    {data.map((item, idx) => {
                        return <Tr key={idx}>
                            <Td>{idx}</Td>
                            <Td>{item.name}</Td>
                            <Td>{item.blockchainAddress}</Td>
                            <Td>{item.priority}</Td>
                        </Tr>
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default TableComponent