// import { Link } from "react-router-dom";

import {
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useGetProjectByIdQuery } from "./projectApi";



export const Arrangement = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useGetProjectByIdQuery(id);

  if (isLoading) {
    return <div>loading..........</div>;
  }

  const { project } = data.data;

  return (
    <Flex pt="20px" flexDirection="column" w="100%">
      <Flex flexDirection="column">
        <Flex flexDirection="row" alignItems="center">
          <Flex pr="35px">
            <Heading size="md">{project.arrangements[0].arrangement_name}</Heading>
          </Flex>
          <TableContainer whiteSpace="normal" maxW="1080px">
            <Table size="lg">
              <Thead>
                <Tr>
                  <Th>Total Pieces</Th>
                  <Th>Flowers</Th>
                  <Th>Stems per Piece</Th>
                  <Th>Total Stems</Th>
                  <Th>Total Cost</Th>
                  <Th>MarkUp 200%</Th>
                  <Th>MarkUp 250%</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>2</Td>
                  <Td>Lilac</Td>
                  <Td>7</Td>
                  <Td>14</Td>
                  <Td>$60</Td>
                  <Td>$150</Td>
                  <Td>$200</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
        <Flex justifyContent="right" pr="40px" pt="20px">
          <Text fontSize="md" fontWeight="semibold" textTransform="uppercase">
            Cost per Arrangement: $200
          </Text>
        </Flex>
        <Flex justifyContent="right" pr="40px" pt="20px">
          <Text fontSize="md" fontWeight="semibold" textTransform="uppercase">
            Total Cost: $400
          </Text>
        </Flex>
      </Flex>

    </Flex>

  );
};
