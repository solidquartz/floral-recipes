import {
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FieldArray, useFormikContext } from "formik";
import { Fragment } from "react";
import { FiInfo } from "react-icons/fi";
import { SiAddthis } from "react-icons/si";
import { Dropdown, Icon, TextField } from "../../shared";
import type { ArrangementFormType } from "./ArrangementForm";
import type { Flower } from "../../../types";
import { EditFlowerTableRow } from "./EditFlowerTableRow";

export type FlowerTableProps = {
  index: number;
  flowers: Flower[];
};

export const EditFlowerTable: React.FC<FlowerTableProps> = ({
  index,
  flowers,
}) => {
  const { values } = useFormikContext<ArrangementFormType>();

  return (
    <FieldArray name={`arrangements.${index}.flowers`}>
      {(flowerHelpers) => (
        <Fragment key={`arrangement-${index}`}>
          <TableContainer whiteSpace="normal">
            <Table size="lg" variant="simple">
              <Thead>
                <Tr>
                  <Th>Flower Type</Th>
                  <Th>Stems per Piece</Th>
                  <Th>Price per Stem</Th>
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
                  <Th />
                </Tr>
              </Thead>

              <Tbody>
                {values.arrangements[index].flowers.map((_, flowerIdx) => (
                  <EditFlowerTableRow
                    key={`arrangement-${index}-flower-${flowerIdx}`}
                    arrangementIndex={index}
                    flowerIndex={flowerIdx}
                    flowers={flowers}
                    remove={() => flowerHelpers.remove(flowerIdx)}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Flex pt="10px" pl="5px">
            <Button
              colorScheme="green"
              variant="outline"
              onClick={() =>
                flowerHelpers.push({
                  flower_id: 0,
                  stem_quantity: 0,
                })
              }
            >
              + Flower
            </Button>
          </Flex>
        </Fragment>
      )}
    </FieldArray>
  );
};
