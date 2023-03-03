import { Box, Button, ButtonGroup, Flex, Text, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as Yup from "yup";
import api from "../../api/api";
import { useAppContext } from "../../context/AppContext";
import { TextField } from "../shared";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

export const EditProjectComponent = () => {
	//grab id from url
	const { id } = useParams();

	//for initial values
	const [projectName, setProjectName] = useState("");
	const [eventDate, setEventDate] = useState("");

	const state = useAppContext();

	useEffect(() => {
		const fetchProject = async () => {
			const response = await api.get(`/projects/${id}`);
			setProjectName(response.data.data.project.name);
			const formattedEventDate = dayjs(response.data.data.project.event_date).format("YYYY-MM-DD");
			setEventDate(formattedEventDate);
		};
		fetchProject();
	}, []);

	const initialValues = {
		name: projectName,
		event_date: eventDate,
	};

	return (
		<>

			<Formik
				initialValues={initialValues}
				enableReinitialize={true}
				validationSchema={Yup.object({
					project_name: Yup.string().required("Please enter a project name"),
					stem_price: Yup.date().required("Please enter a date"),
				})}
				onSubmit={async (values) => {
					const response = await api.patch(`/projects/${id}`, {
						name: values.name,
						event_date: values.event_date,
					});
					state.upsertProject(response.data.data.project);
					window.location.href = `/projects/${response.data.data.project.id}/details`;
				}}
			>
				{/* Form */}
				{(formik) => (
					<Flex align="center">
						<Box>
							<VStack
								as="form"
								mx="auto"
								spacing="5"
								justifyContent="center"
								onSubmit={formik.handleSubmit}
								w="350px"
							>
								<TextField
									name="name"
									type="text"
									label="Project Name"
								/>
								<TextField
									name="event_date"
									type="date"
									label="Event Date"
								/>

								{/* <LocalizationProvider dateAdapter={AdapterDayjs}>
									<DatePicker
										label="Event Date"
										value={value}
										onChange={(newValue) => {
											setValue(newValue);
										}}
										renderInput={(params) => <TextField {...params} />}
									/>
									</LocalizationProvider> */}

								{/* Buttons */}
								<ButtonGroup spacing="6">
									<Link to={`/projects/${id}/details`}>
										<Button>Cancel</Button>
									</Link>
									<Button type="submit" colorScheme="pink">
										Update
									</Button>
								</ButtonGroup>
							</VStack>
						</Box>
					</Flex>
				)}
			</Formik>
		</>
	);
};
