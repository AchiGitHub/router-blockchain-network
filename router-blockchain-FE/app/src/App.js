import { Box, Button, Container, Grid, Heading, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import './App.css';
import InputComponent from './components/Input';
import Table from './components/Table';
import TopBar from './components/TopBar';
import { onConnect } from './Ethereum/InitiateConnection';
import { getRouterNodes, setRouterNode } from './Ethereum/RouterConnection';
import { getUserAccount } from './util/common';

function App() {

  const [blockchainName, setBlockchainName] = useState('');
  const [blockchainAddress, setBlockchainAddress] = useState('');
  const [nodeId, setNodeId] = useState('');
  const [priority, setPriority] = useState('');
  const [userAccountState, setUserAccount] = useState('');
  const [routerNodes, setRouterNodes] = useState([]);

  useEffect(() => {
    onConnect()
      .then(() => {
        let userAccount = getUserAccount();
        setUserAccount(userAccount);
        let routes = getRouterNodes(userAccount);
        console.log("🚀 ~ file: App.js ~ line 26 ~ .then ~ routes", routes)
      });
  }, []);

  const addRouter = (e) => {
    setRouterNode(nodeId, blockchainName, priority, blockchainAddress, userAccountState);
  }

  return (
    <VStack>
      <TopBar />
      <Container maxW='800px'>
        <Table />
        <Heading mb={4}>Add Router Node</Heading>
        <Grid templateColumns='repeat(2, 1fr)' columnGap={4}>
          <InputComponent name='Node Id' onChange={(value) => setNodeId(value)} />
          <InputComponent name='Priority' onChange={(value) => setPriority(value)} />
          <InputComponent name='Blockchain Name' onChange={(value) => setBlockchainName(value)} />
          <InputComponent name='Blockchain Address' onChange={(value) => setBlockchainAddress(value)} />
        </Grid>
      </Container>
      <Container maxW='800px'>
        <Box w='100%' h='10' mt='10px'>
          <Button colorScheme='blue' width='100%' onClick={(e) => addRouter(e)}>Add Router Node</Button>
        </Box>
      </Container>
    </VStack >
  );
}

export default App;
