// import { Link } from "react-router-dom";

import { Button, Td, Tr } from "@chakra-ui/react";

export const ProjectTableItem: React.FC = () => {
  return (
    <>
      <Tr>
        <Td>Spock & Tali's Wedding</Td>
        <Td>2023/04/12</Td>
        <Td>2023/01/14</Td>
        <Td>Active</Td>
        <Td><Button variant="ghost">View</Button></Td>
        <Td><Button variant="ghost" colorScheme="cyan">Edit</Button></Td>
        <Td><Button variant="ghost" colorScheme="red">Delete</Button></Td>
      </Tr>
    </>
  );
};
