// import { Link } from "react-router-dom";
import {
  Button,
  Flex,
  Heading,
  Input,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { BiBookAdd } from "react-icons/bi";
import { BiSearchAlt } from "react-icons/bi";
import api from "../api/api";
import { Header, ProjectTableItem } from "./components";

export const Projects: React.FC = () => {

  const [projects, setProjects] = useState();

  //get all projects
  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/projects");
      setProjects(response.data.data.projects)
    };

    fetchData()
      .catch(console.error);
  }, [])
  

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
          <Table variant="simple" size="lg">
            <Thead>
              <Tr>
                <Th>Project Name</Th>
                <Th>Event Date</Th>
                <Th>Last Updated</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* Body */}
              <ProjectTableItem />
              <ProjectTableItem />
              <ProjectTableItem />
              <ProjectTableItem />
              <ProjectTableItem />
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
};
