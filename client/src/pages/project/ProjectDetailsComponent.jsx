import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { Arrangement } from "../project/Arrangement";
import { Link } from "react-router-dom";
import { FloralOrder } from "./FloralOrder";
import { useAppContext } from "../../context/AppContext";

export const ProjectDetailsComponent = ({ project}) => {

  // download project data from api -> put into formik initial values -> (formik -> api) -> redownload from api

	const { flowers } = useAppContext();

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
				<FloralOrder
					project={project}
					flowers={flowers}
					/>

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
										flowers={flowers}
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
