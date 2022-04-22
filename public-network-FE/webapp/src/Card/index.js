import {
    Heading,
    Avatar,
    Box,
    Flex,
    Text,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react';

export default function Card({ name, email }) {
    return (
        <Box
            maxW={'290px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'2xl'}
            rounded={'md'}
            overflow={'hidden'}>
            <Flex justify={'center'} mt="8">
                <Avatar
                    size={'xl'}
                    src={
                        'https://www.cnet.com/a/img/resize/0b8aea076935c5f2921df9bb329af25b16277292/2021/12/13/d319cda7-1ddd-4855-ac55-9dcd9ce0f6eb/unnamed.png?auto=webp&width=940'
                    }
                    alt={'Author'}
                    css={{
                        border: '2px solid white',
                    }}
                />
            </Flex>

            <Box p={6}>
                <Stack spacing={0} align={'center'} mb={5}>
                    <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                        {name}
                    </Heading>
                    <Text color={'gray.500'}>{email}</Text>
                </Stack>
            </Box>
        </Box>
    );
}