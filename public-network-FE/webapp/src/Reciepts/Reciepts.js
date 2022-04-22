import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Container, Heading } from '@chakra-ui/react';
import React from 'react'
import Dashboard from '../Dashboard';
function Reciepts() {
    return (
        <Dashboard>
            <Container maxW={'container.lg'}>
                <Box textAlign={'center'} margin={10}>
                    <Heading>Recent Transaction Reciepts</Heading>
                </Box>
                {
                    JSON.parse(localStorage.getItem('reciepts')).map((data, idx) => {
                        return <Accordion allowToggle key={idx.toString()}>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box flex='1' textAlign='center'>
                                            {data.transactionHash}
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <pre style={{ whiteSpace: 'pre-wrap' }}>
                                        {JSON.stringify(data, null, 4)}
                                    </pre>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    })
                }
            </Container>
        </Dashboard>
    )
}

export default Reciepts