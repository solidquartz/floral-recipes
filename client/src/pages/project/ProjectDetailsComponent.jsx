import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Arrangement } from "../project/Arrangement";
import { Link, useParams } from "react-router-dom";
import { useGetProjectByIdQuery } from "./projectApi";
import { FloralOrderItem } from "./FloralOrderItem";

export const ProjectDetailsComponent = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetProjectByIdQuery(id);

  if (isLoading) {
    return (
      <div>loading...........</div>
    );
  }

  if (error) {
    return (
      <div>Something went wrong. Please try again later.</div>
    );
  }

  const { project } = data.data;
  console.log(project);

  // download project data from api -> put into formik initial values -> (formik -> api) -> redownload from api

  return (
    <>
      <Flex flexDirection="column" maxW="1080px">
        <Flex
          flexDirection="row"
          alignItems="baseline"
          justifyContent="space-between"
        >
          <Flex>
            <Heading>{project.name}</Heading>
          </Flex>

          {/* Buttons */}
          <Flex pt="20px">
            <ButtonGroup>
              <Link to="/projects">
                <Button>Back</Button>
              </Link>
              <Button colorScheme="blue">Edit Project</Button>
            </ButtonGroup>
          </Flex>
        </Flex>
        {/* Floral Order Table */}

        <Flex p="25px" width="100%" m="auto" flexDirection="column">
          <TableContainer whiteSpace="normal" maxW="1080px">
            <Heading size="lg">Floral Order</Heading>
            <Table size="lg">
              <Thead>
                <Tr>
                  <Th>Item</Th>
                  <Th>Stems</Th>
                  <Th>Rounded Up</Th>
                  <Th>Price per Stem</Th>
                  <Th>Total</Th>
                  <Th>Marked Up Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                {/* {project.map((project) => (
                <FloralOrderItem
                    project={project} />
                ))} */}
              </Tbody>
            </Table>
          </TableContainer>
          <Flex justifyContent="right" pr="40px" pt="20px">
            <Text fontSize="md" fontWeight="semibold" textTransform="uppercase">
              Floral Budget: $30
            </Text>
          </Flex>
          <Flex justifyContent="right" pr="40px" pt="20px">
            <Text fontSize="md" fontWeight="semibold" textTransform="uppercase">
              With Markup: $75
            </Text>
          </Flex>
        </Flex>

        {/* Arrangements*/}
        <Flex p="25px" flexDirection="column">
          <Flex>
            <Heading size="lg">Arrangements</Heading>
          </Flex>
          <Flex>
            <Arrangement />
          </Flex>
        </Flex>
      </Flex>


    </>
  );
};

/*
  const reducer = (state, action) => {
    switch (action.type) {
      case 'changeProjectName':
        return {
          ...state,
          name: action.payload
        }
      default:
        return state;
    }
  }

  dispatch({
    type: 'changeProjectName',
    payload: {
      name: 'something'
    }
  });
*/
