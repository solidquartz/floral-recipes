import {
	Button,
	ButtonGroup,
	Flex,
	Heading,
} from "@chakra-ui/react";
import { Arrangement } from "../project/Arrangement";
import { Link } from "react-router-dom";
import { FloralOrder } from "./FloralOrder";
import { useState } from "react";
import { ArrangementForm } from "./ArrangementForm";


export const ProjectDetailsComponent = ({
	project,
	flowers
}) => {

	//app state
	const [viewing, setViewing] = useState(false);
	const [editing, setEditing] = useState(true);
	const [creating, setCreating] = useState(false);


	//navigation
	const setEditingHandler = () => {
		setViewing(false);
		setCreating(false);
		setEditing(true);
	};
	const setCreatingHandler = () => {
		setViewing(false);
		setEditing(false);
		setCreating(true);
	};
	const setViewingHandler = () => {
		setCreating(false);
		setEditing(false);
		setViewing(true);
	};

	// download project data from api -> put into formik initial values -> (formik -> api) -> redownload from api

	return (
		<>
			<Flex flexDirection="column" maxW="1080px">
				<Flex
					flexDirection="row"
					alignItems="baseline"
					justifyContent="space-between"
				>
					<Flex>
						<Heading>{project.name}</Heading>
					</Flex>

					{/* Buttons */}
					<Flex pt="20px">
						<ButtonGroup>
							<Link to="/projects">
								<Button>Back</Button>
							</Link>
							<Button
								colorScheme="blue"
								onClick={setEditingHandler}>Edit Project</Button>
							<Button
								colorScheme="teal"
								onClick={setCreatingHandler}>Create Project</Button>
						</ButtonGroup>
					</Flex>
				</Flex>

				{/* Floral Order Table */}
				<FloralOrder
					project={project}
					flowers={flowers}
				/>

				{/* Arrangements*/}
				<Flex p="25px" flexDirection="column">
					<Flex>
						<Heading size="lg">Arrangements</Heading>
					</Flex>
					<Flex>
						<Flex pt="20px" flexDirection="column" w="100%">
							<Flex flexDirection="column">
								{viewing &&
									project.arrangements.map((arrangement => (
										<Arrangement
											project={project}
											key={arrangement.id}
											arrangement={arrangement}
											flowers={flowers}
											viewing={viewing}
											editing={editing}
										/>
									)))
								}
								{editing &&
								<ArrangementForm />
								}
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};
