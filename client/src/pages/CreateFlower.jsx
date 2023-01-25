import { Button, Flex, Heading, Box, VStack, ButtonGroup } from "@chakra-ui/react";
import { Formik } from "formik";
import { Header } from "./components";
import * as Yup from 'yup';
import TextField from "./components/TextField";
import { Link } from "react-router-dom";
import axios from "axios";
import api from "../api/api";

export const CreateFlower = () => {

  const initialValues = { name: "", price: "", rounded_up: 0 };


  return (
    <>
      {/* Navbar */}
      <Header />

      {/* Formik Settings*/}
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
                rounded_up: Yup.number()
                  .optional(),
              })}

            onSubmit={(values) => {
              api.post("/flowers", {
                name: values.name,
                price: values.price,
                rounded_up: values.rounded_up,
              }).then((response) => {
                console.log(response);
              });
            }}
          >

            {/* Form */}
            {formik => (
              <Flex align="center">
                <Box>
                  <VStack as="form" mx="auto" spacing="5" justifyContent="center" onSubmit={formik.handleSubmit}>

                    <TextField name="name" type="text" placeholder="Floral Name" />
                    <TextField name="price" type="text" placeholder="Price" />
                    <TextField name="rounded_up" type="text" placeholder="Rounded Up" />

                    {/* Buttons */}
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
