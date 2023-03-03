import { Box, Button, ButtonGroup, Flex, Heading, VStack } from "@chakra-ui/react";
import { Formik } from "formik";
import { Header, TextField } from "../shared";
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import api from "../../api/api";
import { useAppContext } from "../../context/AppContext";

export const CreateProject = () => {

  const state = useAppContext();

  const initialValues = {
    project_name: "",
    event_date: "",
  };

  return (
    <>
      <Header />

      {/* Formik Settings*/}
      <Flex justify="center" direction="column" align="center">
        <Heading>Create a New Project</Heading>
        <Flex pt="20px">
          <Formik
            initialValues={initialValues}

            validationSchema={
              Yup.object({
                project_name: Yup.string()
                  .required("Please enter a name for this project"),
                event_date: Yup.date()
                  .required("Please enter an event date"),
              })}

            onSubmit={async (values) => {
              const response = await api.post("/projects", {
                project_name: values.project_name,
                event_date: dayjs(values.event_date).format(),
              });
              console.log(response);
              state.upsertProject(response.data.data.project);
              window.location = `/projects/${response.data.data.project.id}/details`;
            }}
          >

            {/* Form */}
            {formik => (
              <Flex align="center">
                <Box>
                  <VStack
                    as="form"
                    mx="auto"
                    spacing="5"
                    justifyContent="center"
                    onSubmit={formik.handleSubmit}
                    w="350px"
                  >

                    <TextField
                      name="project_name"
                      type="text"
                      placeholder="Name"
                      label="Project Name" 
                      />

                    <TextField
                      name="event_date"
                      type="date"
                      placeholder="Date"
                      label="Event Date" 
                      />

                    {/* Buttons */}
                    <ButtonGroup spacing="6">
                      <Link to="/projects">
                        <Button>
                          Cancel
                        </Button>
                      </Link>
                      <Button
                        type="submit"
                        colorScheme="pink">
                        Create Project
                      </Button>

                    </ButtonGroup>
                  </VStack>
                </Box>
              </Flex>
            )}
          </Formik>
        </Flex>
      </Flex>

    </>
  );
};
