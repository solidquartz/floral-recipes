// import { Link } from "react-router-dom";

import { Button, ButtonGroup, Flex, Heading } from "@chakra-ui/react";
import React from "react";


export const Dashboard: React.FC = () => {
  return (
    <Flex
      direction="column"
      align="center"
      m="auto"
    >

        <Heading>Dashboard</Heading>

        <ButtonGroup>
          <Button size="lg" colorScheme="pink">
            Projects
          </Button>
          <Button size="lg" colorScheme="pink">
            Flowers
          </Button>
        </ButtonGroup>

    </Flex>
  );
};
