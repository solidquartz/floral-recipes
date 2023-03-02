import { Flex, Text } from "@chakra-ui/react";
import { Header } from "../shared";
import { ProjectDetailsComponent } from "./ProjectDetailsComponent";
import { useParams } from "react-router-dom";
import { useGetProjectByIdQuery } from "./projectApi";
import { useAppContext } from "../../context/AppContext";


export const ProjectDetails = () => {
  const { id } = useParams();
  const { flowers } = useAppContext();

  //loading data
  const { data, error, isLoading } = useGetProjectByIdQuery(id);
  if (isLoading) {
    return (
      <Text>loading...........</Text>
    );
  }
  if (error) {
    return (
      <Text>Something went wrong! Please try again later.</Text>
    );
  }
  const { project } = data.data;

  return (
    <>
      <Header />
      <Flex justify="center" direction="column" align="center">
        <ProjectDetailsComponent
          project={project}
          flowers={flowers}
        />
      </Flex>

    </>
  );
};