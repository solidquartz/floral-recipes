import { Button, Td, Tr } from "@chakra-ui/react";
import { Project } from "../../types/projectsTypes";
import dayjs from 'dayjs';

export type ProjectTableItemProps = {
  project: Project;
};



export const ProjectTableItem: React.FC<ProjectTableItemProps> = ({ project }) => {

  const lastUpdated = dayjs(project.last_updated).format("MMMM D, YYYY h:mm A");
  const eventDate = dayjs(project.event_date).format("MMMM D, YYYY");

  return (
    <Tr>
      <Td>{project.project_name}</Td>
      <Td>{eventDate}</Td>
      <Td>{lastUpdated}</Td>
      <Td>{project.active ? "Active" : "Inactive"}</Td>
      <Td>
        <Button variant="ghost" size="sm">View</Button>
      </Td>
      <Td>
        <Button variant="ghost" colorScheme="cyan" size="sm">
          Edit
        </Button>
      </Td>
      <Td>
        <Button variant="ghost" colorScheme="red" size="sm">
          Delete
        </Button>
      </Td>
    </Tr>
  );
};
