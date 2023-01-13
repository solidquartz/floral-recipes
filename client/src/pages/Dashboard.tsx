// import { Link } from "react-router-dom";

import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Spacer,
  SimpleGrid
} from "@chakra-ui/react";
import { BiBookAdd } from "react-icons/bi";
import { GiFlowerPot } from "react-icons/gi";
import React from "react";
import { Header, ProjectCard, PinProjectCard } from "./components";

export const Dashboard: React.FC = () => {
  return (
    <>
      {/* Navbar */}
      <Header />

      {/* Dashboard hero */}
      <Flex direction="column" align="center" m="auto" justify="center">
        <Box pt="10px">
          <Heading>Dashboard</Heading>
        </Box>
        <Spacer />
        <Box p="30px">
          <ButtonGroup spacing="8" variant="outline">
            <Button size="lg" colorScheme="pink" leftIcon={<BiBookAdd />}>
              Create a Project
            </Button>
            <Button size="lg" colorScheme="pink" leftIcon={<GiFlowerPot />}>
              Add New Florals
            </Button>
          </ButtonGroup>
        </Box>
      </Flex>

      {/* Pinned Projects */}
      <SimpleGrid columns={3} spacing={10} minChildWidth="400px" p="30px">
        <Box>
          <ProjectCard />
        </Box>
        <Box>
          <ProjectCard />
        </Box>
        <Box>
          <ProjectCard />
        </Box>
        <Box>
          <ProjectCard />
        </Box>
        <Box>
          <PinProjectCard />
        </Box>
      </SimpleGrid>
    </>
  );
};
