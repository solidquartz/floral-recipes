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
import { Arrangement } from "./Arrangement";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/api";
import { useAppContext } from "../../context/AppContext";

export const ProjectDetailsComponent = () => {

  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [arrangements, setArrangements] = useState();

  // const state = useAppContext();

  useEffect(() => {
    const fetchProject = async () => {
      const response = await api.get(`/projects/${id}`);
      setProject(response.data.data.project);
    };

    if (!project) {
      fetchProject();
    }
  }, []);

  return (
    <>
      <Flex flexDirection="column" maxW="1080px">
        <Flex
          flexDirection="row"
          alignItems="baseline"
          justifyContent="space-between"
        >
          <Flex>
            <Heading>Project</Heading>
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
                <Tr>
                  <Td>Lilac</Td>
                  <Td>7</Td>
                  <Td>10</Td>
                  <Td>$3</Td>
                  <Td>$30</Td>
                  <Td>$75</Td>
                </Tr>
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

      {/* <table>
        <tbody>
          {project.arrangements.map((a, idx) => (
            <tr key={idx}>
              <td>{a.name}</td>
              <td>{a.quantity}</td>
              <td>
                <ul>
                  {a.flowers.map((flower, flower_idx) => (
                    <li>
                      {/* name - quantity */}
      {/* {state.flowers.find(x => x.id === flower.id)?.name} - {flower.quantity}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      // </table> */}
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
