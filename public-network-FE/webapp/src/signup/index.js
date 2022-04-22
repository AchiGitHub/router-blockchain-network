import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    HStack,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../Ethereum/PublicConnection';
import { onConnect } from '../EthereumAccount';

export const getUserAccount = () => {
    let userAccount = localStorage.getItem('userAccount');
    return JSON.parse(userAccount).account;
}

export default function SignUp() {

    let navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');

    const [userAccountAddress, setUserAccount] = useState('');

    useEffect(() => {
        onConnect()
            .then(() => {
                let userAccount = getUserAccount();
                setUserAccount(userAccount);
            });
    }, [])

    const register = () => {
        registerUser(name, email, birthday, age, phone, address, city, userAccountAddress, () => navigate('/home'));
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'3xl'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        Sign up to the public blockchain network 👾
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <HStack>
                            <FormControl id="name" isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input type="text" onChange={(e) => setName(e.target.value)} />
                            </FormControl>
                            <FormControl id="email" isRequired>
                                <FormLabel>E-mail</FormLabel>
                                <Input type="text" onChange={(e) => setEmail(e.target.value)} />
                            </FormControl>
                        </HStack>
                        <HStack>
                            <FormControl id="birthday" isRequired>
                                <FormLabel>Birthday</FormLabel>
                                <Input type="text" onChange={(e) => setBirthday(e.target.value)} />
                            </FormControl>
                            <FormControl id="age" isRequired>
                                <FormLabel>Age</FormLabel>
                                <Input type="text" onChange={(e) => setAge(e.target.value)} />
                            </FormControl>
                        </HStack>
                        <HStack>
                            <FormControl id="number" isRequired>
                                <FormLabel>Phone Number</FormLabel>
                                <Input type="text" onChange={(e) => setPhone(e.target.value)} />
                            </FormControl>
                            <FormControl id="address" isRequired>
                                <FormLabel>Street Address</FormLabel>
                                <Input type="text" onChange={(e) => setAddress(e.target.value)} />
                            </FormControl>
                        </HStack>
                        <FormControl id="city" isRequired>
                            <FormLabel>City</FormLabel>
                            <Input type="text" onChange={(e) => setCity(e.target.value)} />
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                onClick={() => register()}
                            >
                                Sign up
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}