import { Box, Container, Heading } from '@chakra-ui/react'
import React from 'react'
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
            </Container>
        </App>
    )
}

export default Home