import { Box, Button, ButtonGroup, Flex, Heading, VStack } from "@chakra-ui/react";
import { Formik } from "formik";
import { Header, TextField } from "../shared";
import * as Yup from 'yup';
import { Link } from "react-router-dom";

export const CreateProject = () => {

	const initialValues = {
		project_name: "",
		event_date: "",
	};

	return <>
		{/* Navbar */}
		<Header />

		{/* Formik Settings*/}
		<Flex justify="center" direction="column" align="center">
			<Heading>Create a New Project</Heading>
			<Flex pt="20px">
				<Formik
					initialValues={initialValues}

					validationSchema={
						Yup.object({
							project_name: Yup.string()
								.required("Please enter a name for this project"),
							event_date: Yup.number()
								.required("Please enter a price"),
							rounded_up: Yup.number()
								.required("Please enter a whole number"),
						})}

				// onSubmit={async (values) => {
				// 	const response = await api.post("/projects", {
				// 		project_name: values.project_name,
				// 		event_date: values.event_date,
				// 	});
				// 	state.upsertDate(response.data.data.project);
				// 	window.location = '/project/:id';
				// }}
				>

					{/* Form */}
					{formik => (
						<Flex align="center">
							<Box>
								<VStack as="form" mx="auto" spacing="5" justifyContent="center" onSubmit={formik.handleSubmit} w="350px">

									<TextField name="project_name" type="text" placeholder="Name" label="Project Name" />

									<TextField name="event_date" type="text" placeholder="0" label="Event Date" />


									{/* Buttons */}
									<ButtonGroup spacing="6">
										<Link to="/projects">
											<Button>Cancel</Button>
										</Link>
										<Button type="submit" colorScheme="pink">Create Project</Button>

									</ButtonGroup>
								</VStack>
							</Box>
						</Flex>
					)}
				</Formik>
			</Flex>
		</Flex>

	</>;
};
