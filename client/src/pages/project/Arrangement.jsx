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


export const Arrangement = ({ arrangement }) => {
  const { flowers } = useAppContext();
  
  console.log('arrangement in arrangement', arrangement)


  //working here to get flowers to map over in ArrangementItem
  const flowersInArrangement = arrangement.flowers
    .map(x => x.flowers)
    .flat()
    .reduce((acc, cur) => {
      const flower = flowers.find((x) => x.flower_id === cur.flower_id);

      acc.push({
        id: cur.flower_id,
        flower_name: flower.flower_name,
        stem_quantity: cur.stem_quantity,
      })
      return acc;
    }, [])
  

  return (
    <Box>
      <Flex flexDirection="row" alignItems="center">
        <Flex pr="35px">
          <Heading size="md">{arrangement.arrangement_name}</Heading>
          <Text>Qty: {arrangement.arrangement_quantity}</Text>
        </Flex>
        <TableContainer whiteSpace="normal" maxW="1080px">
          <Table size="lg">
            <Thead>
              <Tr>
                <Th>Flowers</Th>
                <Th>Stems per Piece</Th>
                <Th>Total Stems</Th>
                <Th>Total Cost</Th>
                <Th>MarkUp 200%</Th>
                <Th>MarkUp 250%</Th>
              </Tr>
            </Thead>
            <Tbody>

              {flowersInArrangement.map((x) => (
                <ArrangementItem
                  key={x.id}
                  arrangement_quantity={x.arrangement_quantity}
                  flowers={x.flowers} />
              ))}
            
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

export const ArrangementItem = ({

}) => (
  <Tr>
    <Td>Lilac</Td>
    <Td>7</Td>
    <Td>14</Td>
    <Td>$60</Td>
    <Td>$150</Td>
    <Td>$200</Td>
  </Tr>
);
