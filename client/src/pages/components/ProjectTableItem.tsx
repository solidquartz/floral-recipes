// import { Link } from "react-router-dom";

import { Button, Td, Tr } from "@chakra-ui/react";
import { Project } from "../../types/projectsTypes";

export type ProjectTableItemProps = {
  project: Project;
};

export const ProjectTableItem: React.FC<ProjectTableItemProps> = ({ project }) => (
  <Tr>
    <Td>{project.project_name}</Td>
    <Td>{project.event_date}</Td>
    <Td>{project.last_updated}</Td>
    <Td>{project.active ? '✅' : '❌'}</Td>
    <Td><Button variant="ghost">View</Button></Td>
    <Td><Button variant="ghost" colorScheme="cyan">Edit</Button></Td>
    <Td><Button variant="ghost" colorScheme="red">Delete</Button></Td>
  </Tr>
);
