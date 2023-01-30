// import { Link } from "react-router-dom";

import { Flex, Heading, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";

export const Arrangement = () => {
  return (
    <Flex pt="20px" flexDirection="column" w="100%">
      <Flex flexDirection="column">
      <TableContainer>
        <Heading size="md">Bouquet</Heading>
        <Table size="lg">
          <Thead>
            <Tr>
              <Th>Total Pieces</Th>
              <Th>Flowers</Th>
              <Th>Stems per Piece</Th>
              <Th>Total Stems</Th>
              <Th>Total Cost</Th>
              <Th>Mark Up 200%</Th>
              <Th>Mark Up 250%</Th>
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
              <Td>$90</Td>
            </Tr>
          </Tbody>
        </Table>
        </TableContainer>
        <Flex justifyContent="right" pr="40px" pt="20px">
          <Text fontSize="md" fontWeight="semibold" textTransform="uppercase">
            Cost per Arrangement: $30
          </Text>
        </Flex>
        <Flex justifyContent="right" pr="40px" pt="20px">
          <Text fontSize="md" fontWeight="semibold" textTransform="uppercase">
            Total Cost: $75
          </Text>
        </Flex>
      </Flex>

    </Flex>

  );
};
