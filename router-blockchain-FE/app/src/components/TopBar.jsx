import * as React from "react";
import { Container, Heading } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

function TopBar() {
  return (
    <Container
      maxW="800px"
      display="flex"
      justifyContent="space-between"
      mt="10px"
      mb="10px"
    >
      <Heading mb={4}>Router Blockchain</Heading>
      <ColorModeSwitcher />
    </Container>
  );
}

export default TopBar;
