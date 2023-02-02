import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Arrangement } from "../project/Arrangement";
import { Link, useParams } from "react-router-dom";
import { useGetProjectByIdQuery } from "./projectApi";
import { FloralOrder } from "./FloralOrder";

export const ProjectDetailsComponent = () => {
  const { id } = useParams();
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
  console.log(project);

  // download project data from api -> put into formik initial values -> (formik -> api) -> redownload from api

  return (
    <>
      <Flex flexDirection="column" maxW="1080px">
        <Flex
          flexDirection="row"
          alignItems="baseline"
          justifyContent="space-between"
        >
          <Flex>
            <Heading>{project.name}</Heading>
          </Flex>

          {/* Buttons */}
          <Flex pt="20px">
            <ButtonGroup>
              <Link to="/projects">
                <Button>Back</Button>
              </Link>
              <Button colorScheme="blue">Edit Project</Button>
            </ButtonGroup>
          </Flex>
        </Flex>
        {/* Floral Order Table */}

        <FloralOrder project={project} />

        {/* Arrangements*/}
        <Flex p="25px" flexDirection="column">
          <Flex>
            <Heading size="lg">Arrangements</Heading>
          </Flex>
          <Flex>
            <Flex pt="20px" flexDirection="column" w="100%">
              <Flex flexDirection="column">
                {project.arrangements.map((arrangement => (
                  <Arrangement
                    project={project}
                    key={arrangement.id}
                    arrangement={arrangement}
                    />
                )))}
              </Flex>
            </Flex>
          </Flex>

        </Flex>
      </Flex>


    </>
  );
};

/*
  const reducer = (state, action) => {
    switch (action.type) {
      case 'changeProjectName':
        return {
          ...state,
          name: action.payload
        }
      default:
        return state;
    }
  }

  dispatch({
    type: 'changeProjectName',
    payload: {
      name: 'something'
    }
  });
*/
