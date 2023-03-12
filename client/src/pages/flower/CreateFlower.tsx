import { Button, Flex, Heading, Box, VStack, ButtonGroup } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import api from "../../api/api";
import { useAppContext } from "../../context/AppContext";
import { Header, LeftElementTextField, TextField } from "../shared";


export const CreateFlower = () => {

  const state = useAppContext();
  const initialValues = { flower_name: "", stem_price: "", rounded_up: "" };


  return (
    <>
      {/* Navbar */}
      <Header />

      {/* Formik Settings*/}
      <Flex justify="center" direction="column" align="center">
        <Heading>Add a New Flower</Heading>
        <Flex pt="20px">
          <Formik
            initialValues={initialValues}

            validationSchema={
              Yup.object({
                flower_name: Yup.string()
                  .required("Please enter a flower name"),
                stem_price: Yup.number()
                  .required("Please enter a price"),
                rounded_up: Yup.number()
                  .required("Please enter a whole number"),
              })}

            onSubmit={async (values) => {
              const response = await api.post("/flowers", {
                flower_name: values.flower_name,
                stem_price: values.stem_price,
                rounded_up: values.rounded_up,
              });
              state.upsertFlower(response.data.data.flower);
              window.location.href = '/flowers';
            }}
          >
            <Form>
              <Flex align="center">
                <Box>
                  <VStack mx="auto" spacing="5" justifyContent="center" w="350px">

                    <TextField name="flower_name" type="text" placeholder="Name" label="Floral Name" />

                    <LeftElementTextField name="stem_price" type="text" placeholder="0.00" label="Price" element="$" />


                    <TextField name="rounded_up" type="text" placeholder="0" label="Rounded Up" />


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
            </Form>
          </Formik>
        </Flex>
      </Flex>
    </>
  );
};
