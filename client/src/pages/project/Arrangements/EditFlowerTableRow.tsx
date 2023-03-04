import { Button, Flex, Td, Tr } from "@chakra-ui/react";
import { Dropdown, TextField } from "../../shared";
import type { Flower } from "../../../types";
import { AiOutlineDelete, AiOutlineSave } from "react-icons/ai";

export type EditFlowerTableRowProps = {
  prefix: string;
  flowers: Flower[];
  remove: () => void;
};

export const EditFlowerTableRow: React.FC<EditFlowerTableRowProps> = ({
  prefix,
  flowers,
  remove,
}) => {
  return (
    <Tr>
      <Td>
        <Dropdown name={`${prefix}.flower_id`} placeholder="Flower">
          {flowers.map((flower) => (
            <option value={flower.id} key={flower.id}>
              {flower.flower_name}
            </option>
          ))}
        </Dropdown>
      </Td>
      <Td>
        <TextField name={`${prefix}.stem_quantity`} type="text" label="" />
      </Td>
      <Td textAlign="right">$1.00</Td>
      <Td>5</Td>
      <Td textAlign="right">$2.00</Td>
      <Td textAlign="right">$5.00</Td>
      <Td textAlign="right">$00</Td>
      <Td textAlign="right">$00</Td>
      <Td>
        <Flex justifyContent="space-between" gap=".5rem">
          <Button colorScheme="green" variant="outline" type="submit">
            <AiOutlineSave />
          </Button>
          <Button colorScheme="red" variant="outline" onClick={remove}>
            <AiOutlineDelete />
          </Button>
        </Flex>
      </Td>
    </Tr>
  );
};
