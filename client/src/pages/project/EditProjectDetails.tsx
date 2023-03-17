import { Flex, Text } from "@chakra-ui/react";
import { Header } from "../shared";
import { useParams } from "react-router-dom";
import { useGetProjectByIdQuery } from "../../api";
import { useAppContext } from "../../context/AppContext";
import { EditProjectDetailsComponent } from "./EditProjectDetailsComponent";

export const EditProjectDetails = () => {
  const { id } = useParams();
  const { flowers } = useAppContext();

  if (!id) {
    return null;
  }

  //loading data
  const { data: project, error, isLoading } = useGetProjectByIdQuery(id);

  if (isLoading) {
    return <Text>loading...........</Text>;
  }

  if (error || !project) {
    return <Text>Something went wrong! Please try again later.</Text>;
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
        <EditProjectDetailsComponent project={project} flowers={flowers} />
      </Flex>
    </>
  );
};
