import { Link } from "react-router-dom";

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
        <Link to="/">
          <Heading size="lg">Envision Floral Recipes</Heading>
        </Link>
      </Box>
      <Spacer />
      <Box>
        <ButtonGroup spacing="4">
          <Link to="/projects">
            <Button size="md" colorScheme="pink">
              Projects
            </Button>
          </Link>
          <Link to="/flowers">
            <Button size="md" colorScheme="pink">
              Flowers
            </Button>
          </Link>
          <Button size="md" colorScheme="pink" variant="outline">
            Log Out
          </Button>
        </ButtonGroup>
      </Box>
    </Flex>
  );
};
