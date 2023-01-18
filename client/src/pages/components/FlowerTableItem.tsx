import { Button, Td, Tr } from "@chakra-ui/react";
import { Flower } from "../../types/flowersTypes";


export type FlowerTableItemProps = {
  flower: Flower;
};

export const FlowerTableItem: React.FC<FlowerTableItemProps> = ({
  flower,
}) => {


  return (
    <Tr>
      <Td>{flower.flower_name}</Td>
      <Td>{flower.stem_price}</Td>
      <Td>{flower.rounded_up}</Td>
      <Td>
        <Button variant="ghost" colorScheme="cyan" size="sm">
          Edit
        </Button>
      </Td>
      <Td>
        <Button variant="ghost" colorScheme="red" size="sm">
          Delete
        </Button>
      </Td>
    </Tr>
  );
};
