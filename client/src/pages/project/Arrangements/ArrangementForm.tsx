import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import type { Arrangement, Flower, Project } from "../../../types";
import { Fragment } from "react";
import { EditFlowerTable } from "./EditFlowerTable";
import { TextField } from '../../shared';
import { AiOutlineDelete, AiOutlineSave } from 'react-icons/ai';

export type ArrangementFormProps = {
  flowers: Flower[];
  project: Project;
  editing: boolean;
};

export type ArrangementFormType = {
  arrangements: Arrangement[];
};

export const ArrangementForm: React.FC<ArrangementFormProps> = ({
  flowers,
  project,
  editing,
}) => {
  
  //initial values
  const initialValues: ArrangementFormType = {
    arrangements: project?.arrangements ?? [
      {
        arrangement_name: "",
        arrangement_quantity: 0,
        flowers: [
          {
            flower_id: 1,
            stem_quantity: 0,
          },
        ],
      },
    ],
  };

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        // validationSchema={}
        onSubmit={() => void 0}
      >
        {({ values, errors, isSubmitting, isValid }) => (
          <Form>
            <FieldArray name="arrangements">
              {(arrangementHelpers) => (
                <>
                  {values.arrangements.map((_, index) => (
                    <Fragment key={`arrangement-${index}`}>
                      <Flex
                        flexDirection="column"
                        key={index}
                      >
                        <Heading size="md" textTransform="capitalize">
                          {/* {arrangement?.arrangement_name} */}
                        </Heading>

                        <Flex
                          flexDirection="column"
                          paddingTop="5px"
                          width="500px"
                        >
                          <TextField
                            label=""
                            name={`arrangements.${index}.arrangement_name`}
                            type="text"
                            placeholder="Enter Name"
                          />
                          <TextField
                            name={`arrangements.${index}.arrangement_quantity`}
                            type="text"
                            placeholder="0"
                            label="Quantity"
                          />
                        </Flex>

                        <EditFlowerTable index={index} flowers={flowers} />

                        <Flex paddingTop="10px" justifyContent="space-between">
                          <Flex>
                            <Button colorScheme="teal" type="submit">
                              <AiOutlineSave />
                            </Button>
                          </Flex>
                          <Flex>
                            <Button
                              colorScheme="red"
                              onClick={() => arrangementHelpers.remove(index)}
                            >
                              <AiOutlineDelete />
                            </Button>
                          </Flex>
                        </Flex>
                      </Flex>

                      <Flex
                        flexDirection="column"
                        alignItems="flex-end"
                        pr="30px"
                        pt="20px"
                      >
                        <Text
                          fontSize="md"
                          textTransform="uppercase"
                          textAlign="right"
                        >
                          {/* <b>Cost per Arrangement</b>: ${totalCost.toFixed(2)} */}
                        </Text>
                        <Text
                          fontSize="md"
                          textTransform="uppercase"
                          textAlign="right"
                        >
                          {/* <b>Arrangement Quantity</b>: {arrangement.arrangement_quantity} */}
                        </Text>
                        <Text
                          fontSize="md"
                          textTransform="uppercase"
                          textAlign="right"
                        >
                          {/* <b>Total (All Arrangements)</b>: ${costAllArrangements.toFixed(2)} */}
                        </Text>

                        {/* Put below into accordion */}
                        <Text
                          fontSize="md"
                          textTransform="uppercase"
                          textAlign="right"
                        >
                          {/* <b>Total 200% Markup</b>: ${totalMarkup200.toFixed(2)} */}
                        </Text>
                        <Text
                          fontSize="md"
                          textTransform="uppercase"
                          textAlign="right"
                        >
                          {/* <b>Total 250% Markup</b>: ${totalMarkup250.toFixed(2)} */}
                        </Text>
                      </Flex>
                    </Fragment>
                  ))}
                  <Flex paddingTop="10px" justifyContent="flex-end">
                    <Button
                      colorScheme="teal"
                      variant="outline"
                      onClick={() =>
                        arrangementHelpers.push({
                          arrangement_name: "",
                          arrangement_quantity: 0,
                          flowers: [
                            {
                              flower_id: 1,
                              stem_quantity: 0,
                            },
                          ],
                        })
                      }
                    >
                      Add Arrangement
                    </Button>
                  </Flex>
                </>
              )}
            </FieldArray>
            <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
