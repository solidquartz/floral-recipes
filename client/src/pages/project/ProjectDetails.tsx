import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { Header } from "../shared";
import { ProjectDetailsComponent } from "./ProjectDetailsComponent";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProjectByIdQuery, useGetAllFlowersQuery } from "../../api";
import { useState } from "react";
import { useDeleteProjectMutation } from "../../api";


export const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate("/projects");
    return null;
  }


  //loading data
  const { data: project, error, isLoading } = useGetProjectByIdQuery(id);
  const { data: flowers, isLoading: flowersLoading } = useGetAllFlowersQuery();

  //delete confirmation modal logic
  const [projectToDelete, setProjectToDelete] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [deleteProject, { isLoading: deleteHappening }] =
    useDeleteProjectMutation();

  //delete a project
  const handleDeleteProject = async (id: number) => {
    try {
      const response = await deleteProject(id);

      if ("error" in response) {
        // handle
      }

      navigate('/projects');
    } catch (err) {}

    onClose();
  };

  if (isLoading || flowersLoading) {
    return <Text>loading...........</Text>;
  }

  if (error || !project || !flowers) {
    return <Text>Something went wrong! Please try again later.</Text>;
  }

  return (
    <>
      <Header />
      <Flex
        justify="center"
        direction="column"
        align="center"
        pl="80px"
        pr="80px"
      >
        <ProjectDetailsComponent
          project={project}
          flowers={flowers}
          onOpen={onOpen}
          setProjectToDelete={setProjectToDelete}
        />
      </Flex>
    

      {/* Confirm Delete Modal */}
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Project?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this project? This cannot be undone.
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => handleDeleteProject(projectToDelete)}
            >
              Delete
            </Button>
            <Button colorScheme="gray" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </>
  );
};
