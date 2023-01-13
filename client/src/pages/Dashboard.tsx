// import { Link } from "react-router-dom";

import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import React from "react";

export const Dashboard: React.FC = () => {
  return (
    <Flex direction="column" align="center" m="auto" justify="center">
      <Box pt="50px">
        <Heading>Envision Floral Recipes</Heading>
      </Box>
      <Spacer />
      <Box p="30px">
        <ButtonGroup spacing="8">
          <Button size="lg" colorScheme="pink">
            Projects
          </Button>
          <Button size="lg" colorScheme="pink">
            Flowers
          </Button>
        </ButtonGroup>
      </Box>
    </Flex>
  );
};
