import { Button, ButtonGroup, Flex, Heading, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FloralOrder } from "./FloralOrder";
import { useState } from "react";
import dayjs from "dayjs";
import { Flower, Project } from "src/types";
import { ArrangementComponent, ArrangementForm } from "./Arrangements";

export type ProjectDetailsComponentProps = {
  project: Project;
  flowers: Flower[];
};

export const ProjectDetailsComponent: React.FC<
  ProjectDetailsComponentProps
> = ({ project, flowers }) => {
  //app state
  const [viewing, setViewing] = useState(true);
  const [editing, setEditing] = useState(false);
  // const [creating, setCreating] = useState(true);

  //navigation
  const setEditingHandler = () => {
    setViewing(false);
    setEditing(true);
  };

  const setViewingHandler = () => {
    setEditing(false);
    setViewing(true);
  };

  //edit project link
  let navigate = useNavigate();
  const handleEditProject = (id: number) => {
    navigate(`/projects/${id}/edit`);
  };

  //date format
  const lastUpdated = dayjs(project.last_updated).format("MMMM D, YYYY h:mm A");
  const eventDate = dayjs(project.event_date).format("MMMM D, YYYY");

  // download project data from api -> put into formik initial values -> (formik -> api) -> redownload from api

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
          </Flex>

          {/* Buttons */}
          <Flex pb="20px" justifyContent="flex-end">
            <ButtonGroup>
              {!editing && (
                <Link to="/projects">
                  <Button>Back</Button>
                </Link>
              )}
              {!editing && (
                <Button colorScheme="blue" onClick={setEditingHandler}>
                  Edit Project
                </Button>
              )}
              {viewing && (
                <Link to="/projects/create">
                  <Button colorScheme="teal">Create Project</Button>
                </Link>
              )}
              {editing && (
                <>
                  <Button
                    variant="outline"
                    colorScheme="blue"
                    onClick={() => handleEditProject(project.id)}
                  >
                    Edit Name & Date
                  </Button>
                  <Button
                    variant="outline"
                    colorScheme="red"
                    onClick={setViewingHandler}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </ButtonGroup>
          </Flex>
        </Flex>

        {/* Floral Order Table */}
        <FloralOrder project={project} flowers={flowers} />

        {/* Arrangements*/}
        <Flex p="25px" flexDirection="column">
          <Flex>
            <Heading size="lg">Arrangements</Heading>
          </Flex>
          <Flex>
            <Flex pt="20px" flexDirection="column">
              <Flex flexDirection="column">
                {viewing &&
                  project.arrangements.map((arrangement) => (
                    <ArrangementComponent
                      key={arrangement.id}
                      project={project}
                      arrangement={arrangement}
                      flowers={flowers}
                      viewing={viewing}
                      editing={editing}
                    />
                  ))}
                {editing && (
                  <ArrangementForm
                    project={project}
                    flowers={flowers}
                    editing={editing}
                  />
                )}
              </Flex>
            </Flex>
          </Flex>
          {editing && (
            <Flex paddingTop="10px">
              <Button colorScheme="teal" variant="outline">
                Add Arrangement
              </Button>
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  );
};
