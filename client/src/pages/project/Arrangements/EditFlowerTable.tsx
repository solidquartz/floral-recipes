import {
  Button,
  Flex,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FieldArray, useFormikContext } from "formik";
import { Fragment } from "react";
import { FiInfo } from "react-icons/fi";
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
            <Table size="lg" variant="striped">
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
                  <Th />
                </Tr>
              </Thead>

              <Tbody>
                {values.arrangements[index].flowers.map((_, flowerIdx) => (
                  <EditFlowerTableRow
                    key={`arrangement-${index}-flower-${flowerIdx}`}
                    prefix={`arrangements.${index}.flowers.${flowerIdx}`}
                    flowers={flowers}
                    remove={() => flowerHelpers.remove(flowerIdx)}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Flex>
            <Button
              colorScheme="pink"
              variant="outline"
              onClick={() =>
                flowerHelpers.push({
                  flower_id: 1,
                  stem_quantity: 0,
                })
              }
            >
              Add Flower
            </Button>
          </Flex>
        </Fragment>
      )}
    </FieldArray>
  );
};
