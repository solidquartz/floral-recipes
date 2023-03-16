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
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { useAppContext } from "../../context/AppContext";
import { Header } from "../shared";
import { ProjectTableItem } from "./ProjectTableItem";

export const Projects = () => {
  const state = useAppContext();
  const navigate = useNavigate();


  //get all projects
  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data");
      const response = await api.get("/projects");
      state.setProjects(response.data.data.projects);
    };

    if (!state.projects.length) {
      fetchData().catch(console.error);
    }
  }, [state]);

  //view project link
  const handleDetails = (id: number) => {
    navigate(`/projects/${id}/details`);
  };

  return (
    <>
      {/* Navbar */}
      <Header />

      {/* Title and Search */}
      <Flex
        m="auto"
        w="900px"
        justify="space-between"
        alignContent="center"
      >
        <Flex pr="20px" mb="40px">
          <Flex mr="20px">
            <Heading>Projects</Heading>
          </Flex>
          {/* <Flex>
            <Input type="text" placeholder="Search" />
            <Button
              colorScheme="pink"
              variant="outline"
              leftIcon={<BiSearchAlt />}
            >
              Search
            </Button>
          </Flex> */}
        </Flex>

        <Flex>
          <Link to="/projects/create">
            <Button
              variant="outline"
              colorScheme="cyan"
              leftIcon={<BiBookAdd />}
            >
              Create Project
            </Button>
          </Link>
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
              </Tr>
            </Thead>
            <Tbody>
              {/* Body */}
              {state.projects.map((project) => (
                <ProjectTableItem
                  key={project.id}
                  project={project}
                  handleDetails={handleDetails}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
};
