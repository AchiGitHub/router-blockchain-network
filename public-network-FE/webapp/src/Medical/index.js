import {
    Accordion,
    Box,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    List,
    ListItem,
    ListIcon,
    Heading,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import App, { getUserAccount } from '../App'
import { contract, requestData } from '../Ethereum/PublicConnection'
import { RiAlarmWarningFill } from 'react-icons/ri';

function MedicalDashboard() {

    const [response, setResponse] = useState([]);

    /**
     * Get the acknowledgement from the user account
     * @returns The data requested from the thrid party blockchain network
     */
    const getResponse = () => {
        let userAddress = localStorage.getItem('userAccount');
        return contract.events.CallbackRequestAcknowledged({ filter: { callerId: JSON.parse(userAddress).account } }, function (error, event) {
            let reciepts = localStorage.getItem('reciepts');
            let newlitem = !reciepts ? [event] : [...JSON.parse(reciepts), event];
            localStorage.setItem('reciepts', JSON.stringify(newlitem));
            let data = event.returnValues.returnedData;
            let details = JSON.parse(JSON.parse(data).patientDetailsJson);
            setResponse(details)
        });
    };

    useEffect(() => {
        getResponse();
        requestData(getUserAccount())
    }, [])

    return (
        <App>
            <Box mt={5} textAlign={'center'}>
                <Heading>Medical Report</Heading>
            </Box>
            <Box mt={5}>
                {
                    !!response && response.map((data, idx) => {
                        return <Accordion allowToggle key={idx.toString()}>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box flex='1' textAlign='left'>
                                            {data.illness} : {data.value}
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <List spacing={3}>
                                        {data && data.remarks.map((item, idx) => {
                                            return <ListItem key={idx.toString()}>
                                                <ListIcon as={RiAlarmWarningFill} color='red.500' />
                                                {item}
                                            </ListItem>
                                        })
                                        }
                                    </List>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    })
                }
            </Box>
        </App>
    )
}

export default MedicalDashboard