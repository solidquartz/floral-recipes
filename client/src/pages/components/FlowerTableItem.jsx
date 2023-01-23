import { Button, Td, Tr } from "@chakra-ui/react";

export const FlowerTableItem = ({ flower, ...props }) => {

  return (
    <Tr>
      <Td>{flower.flower_name}</Td>
      <Td>${flower.stem_price}</Td>
      <Td>{flower.rounded_up}</Td>
      <Td>
        <Button variant="ghost" colorScheme="cyan" size="sm">
          Edit
        </Button>
      </Td>
      <Td>
        <Button
          variant="ghost"
          colorScheme="red"
          size="sm"
          onClick={() => props.handleDelete(flower.id)}
        >
          Delete
        </Button>
      </Td>
    </Tr>
  );
};
