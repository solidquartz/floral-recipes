import { Button, Td, Tr } from "@chakra-ui/react";
import { Flower } from "src/types";

export type FlowerTableItemProps = {
  flower: Flower;
  handleEditFlower: (id: number) => void;
  handleDeleteFlower: (id: number) => void;
}

export const FlowerTableItem: React.FC<FlowerTableItemProps> = ({ flower, ...props }) => (
  <Tr>
    <Td>{flower.flower_name}</Td>
    <Td>${flower.stem_price}</Td>
    <Td>{flower.rounded_up}</Td>
    <Td>
      <Button
        variant="ghost"
        colorScheme="cyan"
        size="sm"
        onClick={() => props.handleEditFlower(flower.id)}>
        Edit
      </Button>
    </Td>
    <Td>
      <Button
        variant="ghost"
        colorScheme="red"
        size="sm"
        onClick={() => props.handleDeleteFlower(flower.id)}
      >
        Delete
      </Button>
    </Td>
  </Tr>
);
