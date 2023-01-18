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
import { useEffect } from "react";
import { BiBookAdd } from "react-icons/bi";
import { BiSearchAlt } from "react-icons/bi";
import api from "../api/api";
import { useProjectContext } from "../context/ProjectsContext";
import { Header, ProjectTableItem } from "./components";

export const Projects: React.FC = () => {

  const state = useProjectContext();

  //get all projects
  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data");
      const response = await api.get("/projects");
      state.setProjects(response.data.data.projects);
      console.log(response.data.data.projects);
    };

    if (!state.projects.length) {
      fetchData().catch(console.error);
    }
  }, [state]);

  //my projects are in state.projects

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
          <Button
            colorScheme="pink"
            variant="outline"
            leftIcon={<BiSearchAlt />}
          >
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
              {state.projects.map(project => (
                <ProjectTableItem key={project.id} project={project} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
};
