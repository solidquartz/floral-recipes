import { Box, Button, Flex, Heading, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { Header, TextField } from "../shared";
import * as Yup from "yup";
import api from "../../api/api";

export const Login = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        mb="15px"
        p="25px"
      >
        <Box>
          <Heading size="lg">Envision Floral Recipes</Heading>
        </Box>
      </Flex>

      <Flex justify="center" direction="column" align="center">
        <Heading>Log In</Heading>
        <Flex pt="20px">
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
              username: Yup.string().required("Please enter your username"),
              password: Yup.string().required("Please enter your password"),
            })}
            onSubmit={async (values: typeof initialValues) => {
              const response = await api.post("/auth/login", {
                username: values.username,
                password: values.password,
              });
              console.log(response);

              window.location.href = `/projects/`;
            }}
          >
            <Form>
              <Flex align="center">
                <Box>
                  <VStack
                    mx="auto"
                    spacing="5"
                    justifyContent="center"
                    w="350px"
                  >
                    <TextField
                      name="username"
                      type="text"
                      placeholder="Username"
                      label="Username"
                    />

                    <TextField
                      name="password"
                      type="password"
                      placeholder="Password"
                      label="Password"
                    />

                    {/* Buttons */}
                    <Button type="submit" colorScheme="pink">
                      Log In
                    </Button>
                  </VStack>
                </Box>
              </Flex>
            </Form>
          </Formik>
        </Flex>
      </Flex>
    </>
  );
};
