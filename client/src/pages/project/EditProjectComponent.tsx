import { Box, Button, ButtonGroup, Flex, VStack } from "@chakra-ui/react";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as Yup from "yup";
import api from "../../api/api";
import { useAppContext } from "../../context/AppContext";
import { TextField } from "../shared";

export const EditProjectComponent = () => {
  //grab id from url
  const { id } = useParams();

  //for initial values
  const [projectName, setProjectName] = useState("");
  const [eventDate, setEventDate] = useState("");

  const state = useAppContext();

  useEffect(() => {
    const fetchProject = async () => {
      const response = await api.get(`/projects/${id}`);
      setProjectName(response.data.data.project.project_name);
      setEventDate(response.data.data.project.event_date);
    };
    fetchProject();
  }, []);


  const initialValues = {
    project_name: projectName,
    event_date: eventDate,
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={Yup.object({
          project_name: Yup.string().required("Please enter a project name"),
          stem_price: Yup.date().required("Please enter a date"),
        })}
        onSubmit={async (values) => {
          const response = await api.patch(`/projects/${id}`, {
            project_name: values.project_name,
            event_date: values.event_date,
          });
          state.upsertProject(response.data.data.project);
          window.location.href = `/projects/${response.data.data.project.id}/details`;
        }}
      >
        {/* Form */}
        {(formik) => (
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
                  placeholder={projectName}
                  label="Project Name"
                />
                <TextField
                  name="event_date"
                  type="date"
                  placeholder={eventDate}
                  label="Event Date"
                />

                {/* Buttons */}
                <ButtonGroup spacing="6">
                  <Link to="/projects">
                    <Button>Cancel</Button>
                  </Link>
                  <Button
                    type="submit"
                    colorScheme="pink">
                    Update
                  </Button>
                </ButtonGroup>
              </VStack>
            </Box>
          </Flex>
        )}
      </Formik>
    </>
  );
};
