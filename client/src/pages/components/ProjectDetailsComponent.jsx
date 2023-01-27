import { Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../api/api';
import { useAppContext } from '../../context/AppContext';

export const ProjectDetailsComponent = () => {

  //grab id from url
  const { id } = useParams();

  // //for project info
  const [projectName, setProjectName] = useState("");


  // const state = useAppContext();

  useEffect(() => {
    const fetchProject = async () => {
      const response = await api.get(`/projects/${id}`);
      setProjectName(response.data.data.project.project_name);

    };
    fetchProject();
  }, []);


  return (
    <>
      <Heading>{projectName}</Heading>
    </>
  );
};
