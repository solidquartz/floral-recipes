import { Button, Flex, Heading, Box, VStack, ButtonGroup } from "@chakra-ui/react";
import { Formik } from "formik";
import { Header, LeftElementTextField, TextField } from "./components";
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAppContext } from "../context/AppContext";


export const CreateFlower = () => {

  const state = useAppContext();
  const navigate = useNavigate();
  const initialValues = { flower_name: "", stem_price: "", rounded_up: "" };


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
              state.addFlower(response.data.data.flower);
              navigate('/flowers');
            }}
          >

            {/* Form */}
            {formik => (
              <Flex align="center">
                <Box>
                  <VStack as="form" mx="auto" spacing="5" justifyContent="center" onSubmit={formik.handleSubmit} w="350px">
                    
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
            )}
          </Formik>
        </Flex>
      </Flex>
    </>
  );
};
