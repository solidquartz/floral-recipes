// import { Link } from "react-router-dom";

import { Box, Button, ButtonGroup, Flex, Heading, Spacer } from "@chakra-ui/react";
import React from "react";

export const Header: React.FC = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb="15px"
      p="25px"
    >

        <Box>
          <Heading size="lg">Envision Floral Recipes</Heading>
        </Box>
        <Spacer />
        <Box>
          <ButtonGroup spacing="4">
            <Button size="md" colorScheme="pink">
              Projects
            </Button>
            <Button size="md" colorScheme="pink">
              Flowers
            </Button>
            <Button size="md" colorScheme="pink" variant="outline">
              Log Out
            </Button>
          </ButtonGroup>
        </Box>
      </Flex>

  );
};
