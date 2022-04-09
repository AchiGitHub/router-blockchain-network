import { Box, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import React from 'react'

function InputComponent({ name, placeholder, onChange }) {
    return (
        <Box mt='2'>
            <InputGroup>
                <InputLeftAddon children={name} />
                <Input type='tel' onChange={(e) => onChange(e.target.value)} />
            </InputGroup>
        </Box>
    )
}

export default InputComponent