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
      mb={8}
      p={8}
    >

        <Box>
          <Heading size="lg">Envision Floral Recipes</Heading>
        </Box>
        <Spacer />

        <Box>
          <ButtonGroup>
            <Button size="md" colorScheme="pink">
              Projects
            </Button>
            <Button size="md" colorScheme="pink">
              Flowers
            </Button>
          </ButtonGroup>
        </Box>
      </Flex>

  );
};
