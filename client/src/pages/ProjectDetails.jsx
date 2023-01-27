// import { Link } from "react-router-dom";

import { Flex, Heading } from "@chakra-ui/react";
import { Header, ProjectDetailsComponent } from "./components";

export const ProjectDetails = () => {
  return (
    <>
      <Header />

      <Flex justify="center" direction="column" align="center">
          <ProjectDetailsComponent />
        </Flex>
    </>
  );
};
