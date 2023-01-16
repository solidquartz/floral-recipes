// import { Link } from "react-router-dom";

import {
  Button,
  Flex,
  Heading,
  Input,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { BiBookAdd } from "react-icons/bi";
import { BiSearchAlt } from "react-icons/bi";
import { Header } from "./components";

export const Projects: React.FC = () => {
  return (
    <>
      {/* Navbar */}
      <Header />

      {/* Title and Search */}
      <Flex m="auto" p="20px" justify="space-around">
        <Flex>
          <Flex pr="20px" align-items="center">
            <Heading>Projects</Heading>
          </Flex>
          <Flex>
            <Button
              variant="outline"
              colorScheme="cyan"
              leftIcon={<BiBookAdd />}
            >
              Create Project
            </Button>
          </Flex>
        </Flex>

        <Flex>
          <Input type="text" placeholder="Search" />
          <Button colorScheme="pink" variant="outline" leftIcon={<BiSearchAlt/>}>
            Search
          </Button>
        </Flex>
      </Flex>

      {/* Table of Projects */}
      <Flex justify="center">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Project Name</Th>
                <Th>Event Date</Th>
                <Th>Last Updated</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody></Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
};
