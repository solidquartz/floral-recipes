import { Button, Flex, Heading, Box, VStack, ButtonGroup } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { Header } from "./components";
import * as Yup from 'yup';
import TextField from "./components/TextField";
import { Link } from "react-router-dom";

export const CreateFlower = () => {

  const initialValues = { name: "", price: "", roundedUp: 0 };



  return (
    <>
      {/* Navbar */}
      <Header />

      <Flex justify="center" direction="column" align="center">
        <Heading>Add a New Floral</Heading>
        <Flex pt="20px">
          <Formik
            initialValues={initialValues}
            validationSchema={
              Yup.object({
                name: Yup.string()
                  .required("Please enter a flower name"),
                price: Yup.string()
                  .required("Please enter a price"),
                rounded_up: Yup.number(),
              })
              // onSubmit
            }>

            {formik => (
              <Flex align="center">
                <Box>
                  <VStack as="form" mx="auto" spacing="5" justifyContent="center" onSubmit={formik.handleSubmit}>

                    <TextField name="name" type="text" placeholder="Floral Name" />
                    <TextField name="price" type="text" placeholder="Price" />
                    <TextField name="rounded_up" type="text" placeholder="Rounded Up" />

                    <ButtonGroup spacing="6">
                      <Link to="/flowers">
                        <Button>Cancel</Button>
                      </Link>
                      <Button type="submit" colorScheme="pink">Add</Button>

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
