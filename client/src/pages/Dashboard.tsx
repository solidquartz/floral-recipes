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
import { Header, ProjectCard } from "./components";

export const Dashboard: React.FC = () => {
  return (
    <>
      <Header />

      <Flex direction="column" align="center" m="auto" justify="center">
        <Box pt="10px">
          <Heading>Dashboard</Heading>
        </Box>
        <Spacer />
        <Box p="30px">
          <ButtonGroup spacing="8" variant="outline">
            <Button size="lg" colorScheme="pink">
              Projects
            </Button>
            <Button size="lg" colorScheme="pink">
              Flowers
            </Button>
          </ButtonGroup>
        </Box>
      </Flex>

      <Flex>
        <ProjectCard />
      </Flex>
    </>
  );
};
