import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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
  Tr,
} from "@chakra-ui/react";
import { FiInfo } from "react-icons/fi";
import { useMemo } from "react";
import { ArrangedFlowerRow, Arrangement, Flower, Project } from "src/types";
import { getTotalCost, makeArrangedFlower } from "../helpers";
import { Icon } from "../../shared";

export type ArrangementProps = {
  arrangement: Arrangement;
  project: Project;
  flowers: Flower[];
  viewing: boolean;
  editing: boolean;
};

export const ArrangementComponent: React.FC<ArrangementProps> = ({
  arrangement,
  flowers,
}) => {

  //shape data
  const flowersInArrangement: ArrangedFlowerRow[] = useMemo(() => {
    if (!flowers) {
      return [];
    }
    return arrangement.flowers
      .map((x) => makeArrangedFlower(x, flowers))
      .filter((x): x is ArrangedFlowerRow => !!x);
  }, [flowers]);

  //for arrangement totals
  const totalCost = getTotalCost(flowersInArrangement);
  const costAllArrangements = totalCost * arrangement.arrangement_quantity;
  const totalMarkup200 = costAllArrangements * 2;
  const totalMarkup250 = costAllArrangements * 2.5;

  return (
    <Box pb="100px">
      <Flex flexDirection="column">
        <Heading size="lg" textTransform="capitalize" mb="20px">
          {arrangement.arrangement_name}
        </Heading>

        {/* Arrangement Table */}
        <TableContainer whiteSpace="normal">
          <Table size="lg">
            <Thead>
              <Tr>
                <Th>Flower Type</Th>
                <Th>Price per Stem</Th>
                <Th>Stems per Piece</Th>
                <Th>Min Order Size</Th>
                <Th>
                  <Icon
                    icon={<FiInfo />}
                    placement="end"
                    tooltipText="Total cost for the stem order of each flower type before rounding up"
                  >
                    Total
                  </Icon>
                </Th>
                <Th>Rounded Up Total</Th>
                <Th>Markup 200%</Th>
                <Th>Markup 250%</Th>
              </Tr>
            </Thead>

            <Tbody>
              {flowersInArrangement.map((x, idx) => (
                <Tr key={idx}>
                  <Td textTransform="capitalize">{x.name}</Td>
                  <Td textAlign="right">${x.stem_price.toFixed(2)}</Td>
                  <Td textAlign="right">{x.quantity}</Td>
                  <Td textAlign="right">{x.rounded}</Td>
                  <Td textAlign="right">${x.base_cost.toFixed(2)}</Td>
                  <Td textAlign="right">${x.rounded_cost.toFixed(2)}</Td>
                  <Td textAlign="right">${x.markup200.toFixed(2)}</Td>
                  <Td textAlign="right">${x.markup250.toFixed(2)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>

      {/* Totals */}
      <Flex w="100%" justifyContent="right" pr="30px" pt="20px">
        <Flex w="800px">
          <Accordion allowToggle w="100%">
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="right">
                    Arrangement Totals
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <Table size="md" variant="unstyled">
                  <Tbody>
                    <Tr>
                      <Th>Arrangement Quantity</Th>
                      <Td>{arrangement.arrangement_quantity}</Td>
                      <Th>Cost per Arrangement</Th>
                      <Td>${totalCost.toFixed(2)}</Td>
                      <Th>Total (All Arrangements)</Th>
                      <Td>${costAllArrangements.toFixed(2)}</Td>
                    </Tr>
                    <Tr>
                      <Th>Total 200% Markup</Th>
                      <Td>${totalMarkup200.toFixed(2)}</Td>
                      <Th>Total 250% Markup</Th>
                      <Td>${totalMarkup250.toFixed(2)}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Flex>
      </Flex>
    </Box>
  );
};
