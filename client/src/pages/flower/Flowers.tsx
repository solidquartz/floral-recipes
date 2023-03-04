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
import { BiSearchAlt } from "react-icons/bi";
import { GiFlowerPot } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { useAppContext } from "../../context/AppContext";
import { Header } from "../shared";
import { FlowerTableItem } from "./FlowerTableItem";

export const Flowers = () => {
  const state = useAppContext();
  const navigate = useNavigate();

  //delete a flower
  const handleDeleteFlower = async (id: number) => {
    try {
      const response = await api.delete(`/flowers/${id}`);
      state.setFlowers(state.flowers.filter(flower => {
        return flower.id !== id;
      }));
    } catch (err) { }
  };

  //edit flower link
  const handleEditFlower = (id: number) => {
    navigate(`/flowers/${id}/edit`);
  };

  console.log(state.flowers);
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
                  handleDeleteFlower={handleDeleteFlower}
                  handleEditFlower={handleEditFlower}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
};
