import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FiInfo } from "react-icons/fi";
import { Dropdown, Icon } from "../shared";
import { getOrderSize, getTotalCost } from "./helpers";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextField } from '../shared';


export const ArrangementForm = ({
  arrangement,
  flowers
}) => {

  //shape data
  // const flowersInArrangement = useMemo(() => {
  // 	if (!flowers) {
  // 		return [];
  // 	}
  // 	return arrangement.flowers.map((x) => {
  // 		const flower = flowers.find((f) => f.id === x.flower_id);
  // 		const stemPrice = parseFloat(flower.stem_price);
  // 		const stemQuantity = parseFloat(x.stem_quantity);
  // 		const rounded = getOrderSize(stemQuantity, flower.rounded_up);
  // 		const baseCost = stemPrice * x.stem_quantity;
  // 		const roundedCost = rounded * stemPrice;

  // 		return {
  // 			name: flower.flower_name,
  // 			stem_price: stemPrice,
  // 			quantity: x.stem_quantity,
  // 			rounded,
  // 			base_cost: parseFloat(baseCost),
  // 			rounded_cost: roundedCost,
  // 			markup200: roundedCost * 2,
  // 			markup250: roundedCost * 2.5,
  // 		};
  // 	});
  // }, [flowers]);

  // const totalCost = getTotalCost(flowersInArrangement);
  // const costAllArrangements = totalCost * arrangement.arrangement_quantity;
  // const totalMarkup200 = costAllArrangements * 2;
  // const totalMarkup250 = costAllArrangements * 2.5;

  //initial values
  const initialValues = {};

  return (
    <Box borderBottom="1px solid #ececec" py="1rem" my="1rem">

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
      // validationSchema={}
      // onSubmit={}
      >
        {formik => (
          <>
            <Flex
              flexDirection="column"
            >
              <Heading size="md" textTransform="capitalize">
                Arrangement name (take from state)
              </Heading>
              <Flex
                flexDirection="column"
                paddingTop="5px"
                width="500px"
              >
                <TextField
                  name="arrangement_name"
                  type="text"
                  placeholder="Enter Name"
                />
                <TextField
                  name="arrangement_quantity"
                  type="text"
                  placeholder="0"
                  label="Quantity"
                />
              </Flex>

              <TableContainer whiteSpace="normal" maxW="1080px">
                <Table size="lg">

                  <Thead>
                    <Tr>
                      <Th>Flower Type</Th>
                      <Th></Th>
                      <Th>Price per Stem</Th>
                      <Th>Stems per Piece</Th>
                      <Th>Min Order Size</Th>
                      <Th>
                        <Icon
                          icon={<FiInfo />}
                          placement="end"
                          tooltipText="Total cost for the stem order of each flower type before rounding up"
                        >
                          Total
                        </Icon>
                      </Th>
                      <Th>Rounded Up Total</Th>
                      <Th>Markup 200%</Th>
                      <Th>Markup 250%</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    <Tr>
                      <Td colSpan="2">
                        {/* <Select name={`guests.${index}.meal_id`} placeholder="Meal Selection" isDisabled={values.guests[index].is_attending === 'false'}>
                          {mealOptions?.data.map((opt) => (
                            <option value={opt.meal_id} key={`option-${opt.meal_id}`}>
                              {opt.name}
                            </option>
                          ))}
                        </Select> */}
                        <Select name={"flowers.flower_name"} placeholder="Flower">
                          {flowers.map((flower) => (
                            <option value={flower.flower_name} key={flower.id}>
                              {flower.flower_name}
                            </option>
                          ))}
                        </Select>
                      </Td>
                      <Td textAlign="right">$1.00</Td>
                      <Td>
                        <TextField
                          name="stem_quantity"
                          type="text"
                        />
                      </Td>
                      <Td>5</Td>
                      <Td textAlign="right">$2.00</Td>
                      <Td textAlign="right">$5.00</Td>
                      <Td textAlign="right">$00</Td>
                      <Td textAlign="right">$00</Td>
                    </Tr>
                    {/* ))} */}
                  </Tbody>

                </Table>
              </TableContainer>

              <Flex paddingTop="10px" justifyContent="space-between">
                <Flex>
                  <ButtonGroup>
                    <Button
                      colorScheme="pink"
                      variant="outline"
                    >
                      Add Flower
                    </Button>
                    <Button
                      colorScheme="pink"
                    >
                      Save Flower
                    </Button>
                  </ButtonGroup>
                </Flex>
                <Flex>
                  <Button
                    colorScheme="teal"
                  >
                    Save Arrangement
                  </Button>
                </Flex>
              </Flex>
            </Flex>


            <Flex flexDirection="column" alignItems="flex-end" pr="30px" pt="20px">
              <Text fontSize="md" textTransform="uppercase" textAlign="right">
                {/* <b>Cost per Arrangement</b>: ${totalCost.toFixed(2)} */}
              </Text>
              <Text fontSize="md" textTransform="uppercase" textAlign="right">
                {/* <b>Arrangement Quantity</b>: {arrangement.arrangement_quantity} */}
              </Text>
              <Text fontSize="md" textTransform="uppercase" textAlign="right">
                {/* <b>Total (All Arrangements)</b>: ${costAllArrangements.toFixed(2)} */}
              </Text>

              {/* Put below into accordion */}
              <Text fontSize="md" textTransform="uppercase" textAlign="right">
                {/* <b>Total 200% Markup</b>: ${totalMarkup200.toFixed(2)} */}
              </Text>
              <Text fontSize="md" textTransform="uppercase" textAlign="right">
                {/* <b>Total 250% Markup</b>: ${totalMarkup250.toFixed(2)} */}
              </Text>
            </Flex>
            <Flex paddingTop="10px" justifyContent="flex-end">
              <Button
                colorScheme="teal"
                variant="outline"
              >
                Add Arrangement
              </Button>
            </Flex>
          </>
        )}
      </Formik>
    </Box>
  );
};

