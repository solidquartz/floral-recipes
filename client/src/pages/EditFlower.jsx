// import { Link } from "react-router-dom";

import { Flex, Heading } from "@chakra-ui/react";
import { Header, EditFlowerComponent } from "./components";

export const EditFlower = () => {
  return (
    <>
      <Header />

      <Flex justify="center" direction="column" align="center">
        <Heading>Edit Floral</Heading>
        <Flex pt="20px">
          <EditFlowerComponent />
        </Flex>
      </Flex>
    </>
  );
};
