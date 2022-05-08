import { Box, Container, Heading, List, ListIcon, ListItem } from '@chakra-ui/react'
import React from 'react'
import { MdCheckCircle } from 'react-icons/md';
import App from '../App'

function Home() {
    let balance = JSON.parse(localStorage.getItem('userAccount')) && JSON.parse(localStorage.getItem('userAccount')).balance;
    return (
        <App>
            <Container maxW={'container.lg'}>
                <Box textAlign={'center'} margin={10}>
                    <Heading size={'lg'}>Account Balance</Heading>
                    <Heading size={'lg'}>{parseFloat(balance).toFixed(4)} ETH</Heading>
                </Box>
                <Box textAlign={'center'} margin={10}>
                    <Heading size={'md'}>Recent Transactions</Heading>
                    {!!localStorage.getItem('reciepts') ? <Box
                        height={100}
                        borderRadius={10}
                        borderColor={'whiteAlpha.600'}
                        borderWidth={1}
                        maxH={600}
                        h={600}
                        overflowY={'scroll'}
                        mt={5}
                        scrollBehavior={'smooth'}
                    >
                        <List spacing={3}>
                            {
                                JSON.parse(localStorage.getItem('reciepts')).map((data, idx) => {
                                    return <ListItem key={idx.toString()}>
                                        <ListIcon as={MdCheckCircle} color='green.500' />
                                        {data.transactionHash}
                                    </ListItem>
                                })
                            }
                        </List>
                    </Box> : <Heading size={'sm'}>No Recent Transactions</Heading>}
                </Box>
            </Container>
        </App>
    )
}

export default Home