import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
} from "@chakra-ui/react";
import { FieldArray, Form, Formik } from "formik";
import { array, number, object, string } from "yup";
import type { Arrangement, Flower, Project } from "../../../types";
import { Fragment, useState } from "react";
import { EditFlowerTable } from "./EditFlowerTable";
import { TextField } from "../../shared";
import { AiOutlineDelete, AiOutlineSave } from "react-icons/ai";
import api from "../../../api/api";
import { useParams } from "react-router-dom";
import { SnackbarCloseReason } from "@mui/base/useSnackbar";
import Snackbar from "../../shared/Snackbar";

export type ArrangementFormProps = {
  flowers: Flower[];
  project: Project;
  editing: boolean;
  // arrangement: Arrangement;
};

export type ArrangementFormType = {
  arrangements: Arrangement[];
};

export const ArrangementForm: React.FC<ArrangementFormProps> = ({
  flowers,
  project,
}) => {
  const { id } = useParams();

  const initialValues: ArrangementFormType = {
    arrangements: project?.arrangements ?? [
      {
        arrangement_name: "",
        arrangement_quantity: 0,
        flowers: [
          {
            flower_id: 0,
            stem_quantity: 0,
          },
        ],
      },
    ],
  };

  //snackbar
  const [open, setOpen] = useState(false);
  const handleCloseSnackbar = (_: any, reason: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleOpenSnackbar = () => {
    setOpen(true);
  };

  //saves (upserts) all arrangements in the project
  const handleSubmit = async (values: ArrangementFormType) => {
    const response = await api.post(`/projects/${id}/arrangement`, values);
    console.log("response", response);
    handleOpenSnackbar();
  };

  const handleDelete = async (values: ArrangementFormType) => {
    // const response = await api.delete(
    //   `/projects/${id}/delete-arr`,
    //   values.arrangements.id
    // );
    handleOpenSnackbar();
  };

  return (
    <Box pb="100px" maxW="1400px">
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={object({
          arrangements: array(
            object({
              arrangement_name: string().required(
                "Please enter a name for this arrangement."
              ),
              arrangement_quantity: number().required(
                "Please enter the quantity of this arrangement."
              ),
              flowers: array(
                object({
                  flower_id: number().required("Please select a flower."),
                  stem_quantity: number().required(
                    "Please enter the quantity of stems."
                  ),
                })
              ),
            })
          ),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <FieldArray name="arrangements">
              {(arrangementHelpers) => (
                <>
                  {values.arrangements.map((_, index) => (
                    <Fragment key={`arrangement-${index}`}>
                      <Flex flexDirection="column" key={index}>
                        <Flex
                          flexDirection="column"
                          paddingTop="5px"
                          width="500px"
                        >
                          <TextField
                            name={`arrangements.${index}.arrangement_name`}
                            type="text"
                            placeholder="Enter Name"
                            label="Arrangement Name"
                          />
                          <TextField
                            name={`arrangements.${index}.arrangement_quantity`}
                            type="text"
                            placeholder="0"
                            label="Quantity"
                          />
                        </Flex>

                        <EditFlowerTable index={index} flowers={flowers} />
                      </Flex>

                      <Flex
                        flexDirection="column"
                        alignItems="flex-end"
                        pr="30px"
                        pt="20px"
                      >
                        {/* extract out? */}
                        <Flex w="800px">
                          <Accordion allowToggle w="100%">
                            <AccordionItem>
                              <h2>
                                <AccordionButton>
                                  <Box as="span" flex="1" textAlign="right">
                                    Arrangement Totals
                                  </Box>
                                  <AccordionIcon />
                                </AccordionButton>
                              </h2>
                              <AccordionPanel>
                                <Table size="md" variant="unstyled">
                                  <Tbody>
                                    <Tr>
                                      <Th>Arrangement Quantity</Th>
                                      <Td textAlign="right">
                                        {/* {arrangement.arrangement_quantity} */}
                                      </Td>
                                      <Th>Cost per Arrangement</Th>
                                      <Td textAlign="right">
                                        {/* ${totalCost.toFixed(2)} */}
                                      </Td>
                                      <Th>Total (All Arrangements)</Th>
                                      <Td textAlign="right">
                                        {/* ${costAllArrangements.toFixed(2)} */}
                                      </Td>
                                    </Tr>
                                    <Tr>
                                      <Th>Total 200% Markup</Th>
                                      <Td textAlign="right">
                                        {/* ${totalMarkup200.toFixed(2)} */}
                                      </Td>
                                      <Th>Total 250% Markup</Th>
                                      <Td textAlign="right">
                                        {/* ${totalMarkup250.toFixed(2)} */}
                                      </Td>
                                    </Tr>
                                  </Tbody>
                                </Table>
                              </AccordionPanel>
                            </AccordionItem>
                          </Accordion>
                        </Flex>
                        {/* end arrangement totals */}
                      </Flex>

                      <Flex
                        paddingTop="20px"
                        paddingBottom="30px"
                        justifyContent="flex-end"
                      >
                        <Flex>
                          <Button
                            colorScheme="red"
                            isLoading={isSubmitting}
                            variant="outline"
                            onClick={
                              project?.arrangements[index]?.id !== undefined
                                ? () => {
                                    handleDelete(values);
                                  }
                                : () => arrangementHelpers.remove(index)
                            }
                          >
                            <AiOutlineDelete />
                            Delete Arrangement
                          </Button>
                        </Flex>
                      </Flex>
                    </Fragment>
                  ))}
                  <Flex paddingTop="10px" justifyContent="flex-start">
                    <Button
                      colorScheme="blue"
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
                      + Arrangement
                    </Button>
                  </Flex>
                </>
              )}
            </FieldArray>
            <Box position="fixed" w="100%" bgColor="white" bottom={0} p="10px">
              <Flex justifyContent="flex-end" pr="200px">
                <Button
                  colorScheme="teal"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  <AiOutlineSave /> Save Project
                </Button>
              </Flex>
            </Box>
            {/* <pre>{JSON.stringify({ values, errors }, null, 4)}</pre> */}
          </Form>
        )}
      </Formik>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        Success!
      </Snackbar>
    </Box>
  );
};
