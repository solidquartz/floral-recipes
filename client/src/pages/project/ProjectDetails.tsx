import { Flex, Text } from "@chakra-ui/react";
import { Header } from "../shared";
import { ProjectDetailsComponent } from "./ProjectDetailsComponent";
import { useParams } from "react-router-dom";
import { useGetProjectByIdQuery } from "../../api";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from 'react-router-dom';


export const ProjectDetails = () => {
  const { id } = useParams();
  const { flowers } = useAppContext();
  const navigate = useNavigate();

  if (!id) {
    navigate('/projects');
    return null;
  }

  //loading data
  const { data: project, error, isLoading } = useGetProjectByIdQuery(id);

  if (isLoading) {
    return (
      <Text>loading...........</Text>
    );
  }

  if (error || !project) {
    return (
      <Text>Something went wrong! Please try again later.</Text>
    );
  }

  return (
    <>
      <Header />
      <Flex
        justify="center"
        direction="column"
        align="center"
        pl="80px"
        pr="80px"
      >
        <ProjectDetailsComponent project={project} flowers={flowers} />
      </Flex>
    </>
  );
};
