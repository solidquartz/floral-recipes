import {
  Button,
  Flex,
  Heading,
  Input,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { GiFlowerPot } from "react-icons/gi";
import { Link } from "react-router-dom";
import api from "../api/api";
import { useAppContext } from "../context/AppContext";
import { Header, FlowerTableItem } from "./components";

export const Flowers = () => {
  const state = useAppContext();

  //get all flowers
  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/flowers");
      state.setFlowers(response.data.data.flowers);
    };

    if (!state.flowers.length) {
      fetchData().catch(console.error);
    }
  }, [state]);

  //my flowers are in state.flowers

  //delete a flower
  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/flowers/${id}`);
      console.log(response);
    } catch (err) { }
  };

  return (
    <>
      {/* Navbar */}
      <Header />

      {/* Title and Search */}
      <Flex m="auto" pr="70px" pl="70px" justify="space-between">
        <Flex>
          <Flex pr="20px" align-items="center">
            <Heading>Flowers</Heading>
          </Flex>
          <Flex>
            <Link to="/flowers/create">
              <Button
                variant="outline"
                colorScheme="cyan"
                leftIcon={<GiFlowerPot />}
              >
                Add Flower
              </Button>
            </Link>
          </Flex>
        </Flex>

        <Flex>
          <Input type="text" placeholder="Search" />
          <Button
            colorScheme="pink"
            variant="outline"
            leftIcon={<BiSearchAlt />}
          >
            Search
          </Button>
        </Flex>
      </Flex>

      {/* Table of Projects */}
      <Flex justify="center">
        <TableContainer>
          <Table variant="simple" size="lg">
            <Thead>
              <Tr>
                <Th>Flower Name</Th>
                <Th>Price Per Stem</Th>
                <Th>Rounded Up</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* Body */}
              {state.flowers.map((flower) => (
                <FlowerTableItem
                  key={flower.id}
                  flower={flower}
                  handleDelete={handleDelete}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
};
