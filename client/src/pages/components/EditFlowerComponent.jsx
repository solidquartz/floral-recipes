import { Box, Button, ButtonGroup, Flex, VStack } from '@chakra-ui/react';
import { Formik } from 'formik';
import { Link, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { LeftElementTextField } from './LeftElementTextField';
import { TextField } from './TextField';

export const EditFlowerComponent = (props) => {

  //grab id from url
  const {id} = useParams();


  const initialValues = { flower_name: "", stem_price: "", rounded_up: "" };

  return (
    <>
      <Formik
        initialValues={initialValues}

        validationSchema={
          Yup.object({
            flower_name: Yup.string()
              .required("Please enter a flower name"),
            stem_price: Yup.string()
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
                <TextField name="rounded_up" type="text" placeholder="Rounded Up" label="Rounded Up" />

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
    </>
  );
};
