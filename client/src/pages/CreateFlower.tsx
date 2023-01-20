// import { Link } from "react-router-dom";

import { Button, Flex, Heading } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { Header } from "./components";

export const CreateFlower: React.FC = () => {
  interface FlowerFormValues {
    name: String;
    price: String;
    roundedUp: Number;
  }

  const initialValues: FlowerFormValues = { name: "", price: "", roundedUp: 0 };

  return (
    <>
      {/* Navbar */}
      <Header />

      <Flex justify="center">
        <Heading>Add a New Flower</Heading>

        {/* <Formik
          initialValues={{ initialValues }}
          onSubmit={(values, actions) => {
            console.log(values, actions);
          }}
        >
          <Form>
            <Field name="name" id="name" placeholder="Flower Name">
              <Button type="submit">Add Flower</Button>
            </Field>
          </Form>
        </Formik> */}
      </Flex>
    </>
  );
};
