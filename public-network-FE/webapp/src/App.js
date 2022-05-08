import { Box, Container, Grid, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Card from './Card'
import Dashboard from './Dashboard'
import { getUserDetails } from './Ethereum/PublicConnection'
import { onConnect } from './EthereumAccount'

export const getUserAccount = () => {
    let userAccount = localStorage.getItem('userAccount');
    return JSON.parse(userAccount).account;
}
function App({ children }) {

    const [userDetials, setUserDetails] = useState('');

    useEffect(() => {
        onConnect()
            .then(() => {
                let userAccount = getUserAccount();
                getUserDetails(userAccount).then(data => {
                    setUserDetails({
                        age: data['age'],
                        birthdate: data['birthdate'],
                        city: data['city'],
                        email: data['email'],
                        name: data['name'],
                        phoneNumber: data['phoneNumber'],
                        address: data['streetAddress'],
                    })
                })
            });
    }, []);

    return (
        <Dashboard>
            {/* <Flex> */}
            <Container maxW={'2xl'} display={'flex'} justifyContent={'center'}>
                <Card name={userDetials && userDetials.name} email={userDetials && userDetials.email} />
            </Container>
            <Grid templateColumns='repeat(5, 1fr)' columnGap={4}>
                <Box>
                    <VStack padding={'30px'}>
                        <Text fontWeight="semibold">Phone Number</Text>
                        <Text fontSize={{ base: 'md' }}>
                            {userDetials && userDetials.phoneNumber}
                        </Text>
                    </VStack>
                </Box>
                <Box>
                    <VStack padding={'30px'}>
                        <Text fontWeight="semibold">Age</Text>
                        <Text fontSize={{ base: 'md' }}>
                            {userDetials && userDetials.age}
                        </Text>
                    </VStack>
                </Box>
                <Box>
                    <VStack padding={'30px'}>
                        <Text fontWeight="semibold">Birthdate</Text>
                        <Text fontSize={{ base: 'md' }}>
                            {userDetials && userDetials.birthdate}
                        </Text>
                    </VStack>
                </Box>
                <Box>
                    <VStack padding={'30px'}>
                        <Text fontWeight="semibold">Street Address</Text>
                        <Text fontSize={{ base: 'md' }}>
                            {userDetials && userDetials.address}
                        </Text>
                    </VStack>
                </Box>
                <Box>
                    <VStack padding={'30px'}>
                        <Text fontWeight="semibold">City</Text>
                        <Text fontSize={{ base: 'md' }}>
                            {userDetials && userDetials.city}
                        </Text>
                    </VStack>
                </Box>
            </Grid>
            {/* </Flex> */}
            <Container maxW={'container.lg'}>
                {children}
            </Container>
        </Dashboard>
    )
}

export default App