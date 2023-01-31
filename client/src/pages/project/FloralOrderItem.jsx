import { Td, Tr } from "@chakra-ui/react";

export const FloralOrderItem = (props) => {

  const project = props.project;

  return (
    <Tr>
      <Td>Lilac</Td>
      <Td>7</Td>
      <Td>10</Td>
      <Td>$3</Td>
      <Td>$30</Td>
      <Td>$75</Td>
    </Tr>);
};
