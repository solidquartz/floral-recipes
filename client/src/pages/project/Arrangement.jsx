import {
  Box,
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
import { useAppContext } from "../../context/AppContext";


export const Arrangement = ({
  arrangement_name,
  arrangement_quantity
}) => {

  const { flowers } = useAppContext();

  return (
          <Box>
            <Flex flexDirection="row" alignItems="center">
              <Flex pr="35px">
                <Heading size="md">{arrangement_name}</Heading>
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
                <Td>{arrangement_quantity}</Td>
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
                Total: $400
              </Text>
            </Flex>
          </Box>


  );
};
