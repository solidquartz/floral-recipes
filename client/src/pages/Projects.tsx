// import { Link } from "react-router-dom";

import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
} from "@chakra-ui/react";
import { Header } from "./components";

export const Projects: React.FC = () => {
  return (
    <>
      <Header />

      <Flex m="auto" p="20px" justify="space-around">
        <Heading>Projects</Heading>

        <Flex>
          <Input type="text" placeholder="Search" />
          <Button colorScheme="pink" variant="outline" size="md">
            Search
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
