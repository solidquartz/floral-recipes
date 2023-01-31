// import { Link } from "react-router-dom";

import { Flex, Heading } from "@chakra-ui/react";
import { Header } from "../shared";
import { ProjectDetailsComponent } from "./ProjectDetailsComponent";


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
