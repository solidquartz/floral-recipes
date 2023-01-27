import { Button, Td, Tr } from "@chakra-ui/react";
import dayjs from 'dayjs';


export const ProjectTableItem = ({ project, ...props }) => {

  const lastUpdated = dayjs(project.last_updated).format("MMMM D, YYYY h:mm A");
  const eventDate = dayjs(project.event_date).format("MMMM D, YYYY");

  return (
    <Tr>
      <Td>{project.project_name}</Td>
      <Td>{eventDate}</Td>
      <Td>{lastUpdated}</Td>
      <Td>{project.active ? "Active" : "Inactive"}</Td>
      <Td>
        <Button variant="ghost" size="sm" onClick={() => props.handleDetails(project.id)}>View</Button>
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
