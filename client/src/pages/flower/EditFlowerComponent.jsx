import { Box, Button, ButtonGroup, Flex, VStack } from '@chakra-ui/react';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import api from '../../api/api';
import { useAppContext } from '../../context/AppContext';
import { LeftElementTextField, TextField } from '../shared';


export const EditFlowerComponent = (props) => {

  //grab id from url
  const { id } = useParams();

  //for initial values
  const [flowerName, setFlowerName] = useState("");
  const [stemPrice, setStemPrice] = useState("");
  const [roundedUp, setRoundedUp] = useState("");

  const state = useAppContext();

  useEffect(() => {
    const fetchFlower = async () => {
      const response = await api.get(`/flowers/${id}`);
      setFlowerName(response.data.data.flower.flower_name);
      setStemPrice(response.data.data.flower.stem_price);
      setRoundedUp(response.data.data.flower.rounded_up);
    };
    fetchFlower();
  }, []);


  const initialValues = {
    flower_name: flowerName,
    stem_price: stemPrice,
    rounded_up: roundedUp
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}

        validationSchema={
          Yup.object({
            flower_name: Yup.string()
              .required("Please enter a flower name"),
            stem_price: Yup.number()
              .required("Please enter a price only using numbers")
              .typeError("Must be a number"),
            rounded_up: Yup.number()
              .required("Please enter a number")
              .typeError("Must be a number"),
          })}

        onSubmit={async (values) => {
          const response = await api.patch(`/flowers/${id}`, {
            flower_name: values.flower_name,
            stem_price: values.stem_price,
            rounded_up: values.rounded_up,
          });
          state.upsertFlower(response.data.data.flower);
          window.location = '/flowers';
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
                  name="flower_name"
                  type="text"
                  placeholder="Name"
                  label="Floral Name" 
                  />
                
                <LeftElementTextField
                  name="stem_price"
                  type="text"
                  placeholder="0.00"
                  label="Price"
                  element="$" 
                />
                
                <TextField
                  name="rounded_up"
                  type="text"
                  placeholder="Rounded Up"
                  label="Rounded Up" />

                {/* Buttons */}
                <ButtonGroup spacing="6">
                  <Link to="/flowers">
                    <Button>
                      Cancel
                    </Button>
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
