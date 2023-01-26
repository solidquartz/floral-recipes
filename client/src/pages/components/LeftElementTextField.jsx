import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/input";
import { useField } from "formik";


//reusable text input component with left input element
export const LeftElementTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={meta.error && meta.touched}>
      <FormLabel htmlFor={props.name}>{label}</FormLabel>
      <InputGroup>
        <InputLeftAddon children={props.element} />
      <Input
        {...field}
        {...props}
        />
      </InputGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};