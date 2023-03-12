import { Button, ButtonGroup, Flex, Heading, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FloralOrder } from "./FloralOrder";
import { useState } from "react";
import dayjs from "dayjs";
import { Flower, Project } from "src/types";
import { ArrangementForm } from "./Arrangements";

export type EditProjectDetailsComponentProps = {
  project: Project;
  flowers: Flower[];
};

export const EditProjectDetailsComponent: React.FC<
  EditProjectDetailsComponentProps
> = ({ project, flowers }) => {
  //edit project link
  let navigate = useNavigate();
  const handleEditProject = (id: number) => {
    navigate(`/projects/${id}/edit`);
  };

  //edit project link
  const handleViewProjectDetails = (id: number) => {
    navigate(`/projects/${id}/details`);
  };

  // const lastUpdated = dayjs(project.last_updated).format("MMMM D, YYYY h:mm A");
  const eventDate = dayjs(project.event_date).format("MMMM D, YYYY");

  return (
    <>
      <Flex flexDirection="column">
        <Flex
          flexDirection="row"
          alignItems="baseline"
          justifyContent="space-between"
        >
          <Flex flexDirection="column">
            <Flex paddingBottom="10px">
              <Heading>{project.name}</Heading>
            </Flex>
            <Flex>
              <Text>Event Date: {eventDate}</Text>
            </Flex>
            {/* <Flex>
              <Text>Last Updated: {lastUpdated}</Text>
            </Flex> */}
          </Flex>

          {/* Buttons */}
          <Flex pb="20px" justifyContent="flex-end">
            <ButtonGroup>
              <Button
                variant="outline"
                colorScheme="red"
                onClick={() => handleViewProjectDetails(project.id)}
              >
                Stop Editing
              </Button>
              <Button
                variant="outline"
                colorScheme="blue"
                onClick={() => handleEditProject(project.id)}
              >
                Edit Name & Date
              </Button>
            </ButtonGroup>
          </Flex>
        </Flex>

        {/* Floral Order Table */}
        <FloralOrder project={project} flowers={flowers} />

        {/* Arrangements*/}
        <Flex p="25px" flexDirection="column">
          <Flex>
            <Flex pt="20px" flexDirection="column">
              <Flex flexDirection="column">

                  <ArrangementForm
                    project={project}
                    flowers={flowers}
                  />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
