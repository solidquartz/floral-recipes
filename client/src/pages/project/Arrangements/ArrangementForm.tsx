import { Box, Button, Flex, Text } from "@chakra-ui/react";
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
import SnackbarUnstyled from "@mui/base/SnackbarUnstyled";
import Snackbar from "../../shared/Snackbar";

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

  const [saving, setSaving] = useState(false);

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
    setSaving(true);
    const response = await api.post(`/projects/${id}/arrangement`, values);
    handleOpenSnackbar();
    setSaving(false);
  };

  // const handleDelete = async (values: ArrangementFormType) => {
  //   const response = await api.delete(
  //     `/projects/${id}/delete-arr`,
  //     values.arrangements.id
  //   );
  //   handleOpenSnackbar();
  //   return response;
  // };

  return (
    <Box>
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
        {({ values, errors, isSubmitting }) => (
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
                        <Text
                          fontSize="md"
                          textTransform="uppercase"
                          textAlign="right"
                        >
                          <b>Cost per Arrangement</b>:
                          {/* ${totalCost.toFixed(2)} */}
                        </Text>
                        <Text
                          fontSize="md"
                          textTransform="uppercase"
                          textAlign="right"
                        >
                          <b>Arrangement Quantity</b>:
                          {/* {arrangement.arrangement_quantity} */}
                        </Text>
                        <Text
                          fontSize="md"
                          textTransform="uppercase"
                          textAlign="right"
                        >
                          <b>Total (All Arrangements)</b>:
                          {/* ${costAllArrangements.toFixed(2)} */}
                        </Text>

                        {/* Put below into accordion */}
                        <Text
                          fontSize="md"
                          textTransform="uppercase"
                          textAlign="right"
                        >
                          <b>Total 200% Markup</b>:
                          {/* ${totalMarkup200.toFixed(2)} */}
                        </Text>
                        <Text
                          fontSize="md"
                          textTransform="uppercase"
                          textAlign="right"
                        >
                          <b>Total 250% Markup</b>:
                          {/* ${totalMarkup250.toFixed(2)} */}
                        </Text>
                      </Flex>

                      <Flex paddingTop="10px" justifyContent="flex-end">
                        <Flex>
                          <Button
                            colorScheme="red"
                            isLoading={isSubmitting}
                            // onClick={
                            //   project?.arrangements[index]?.id !== undefined
                            //     ? () => {handleDelete(values)}
                            //     : () => arrangementHelpers.remove(index)
                            // }
                          >
                            <AiOutlineDelete />
                          </Button>
                        </Flex>
                      </Flex>
                    </Fragment>
                  ))}
                  <Flex paddingTop="10px" justifyContent="flex-start">
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
            <Flex>
              <Button colorScheme="teal" type="submit" isLoading={saving}>
                <AiOutlineSave /> Save Project
              </Button>
            </Flex>
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
