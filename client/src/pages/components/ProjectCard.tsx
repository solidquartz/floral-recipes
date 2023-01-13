// import { Link } from "react-router-dom";

import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";

export const ProjectCard: React.FC = () => {
  return (
    <Card maxW="md" maxH="md" m="auto">
      <CardHeader>
        <Flex direction="column" align="center">
          <Heading size="md">Tali & Spock's Wedding</Heading>
          <Text size="sm">02/05/2023</Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex align="center" justify="center">
          <Text size="sm">Last Updated 01/19/2023</Text>
        </Flex>
      </CardBody>
      <Divider />
      <CardFooter justify="center" flexWrap="wrap">
          <ButtonGroup spacing="3" size="sm">
            <Button colorScheme="pink">View Project</Button>
            <Button variant="outline" colorScheme="pink">
              Edit Project
            </Button>
            <Button variant="outline" colorScheme="gray">
              Unpin
            </Button>
          </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
