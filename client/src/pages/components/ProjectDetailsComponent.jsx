import { Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../api/api';
import { useAppContext } from '../../context/AppContext';

export const ProjectDetailsComponent = () => {

  //grab id from url
  const { id } = useParams();

  // //for project info
  const [project, setProject] = useState(null);
  const [arrangements, setArrangements] = useState();

  // const state = useAppContext();

  useEffect(() => {
    const fetchProject = async () => {
      const response = await api.get(`/projects/${id}`);
      setProject(response.data.data.project);

    };

    if (!project) {
      fetchProject();
    }
  }, []);


  return (
    <>
      <Heading>{projectName}</Heading>

      <table>
        <tbody>
          {project.arrangements.map((a, idx) => (
            <tr key={idx}>
              <td>{a.name}</td>
              <td>{a.quantity}</td>
              <td>
                <ul>
                  {a.flowers.map((flower, flower_idx) => (
                    <li>
                      {/* name - quantity */}
                      {state.flowers.find(x => x.id === flower.id)?.name} - {flower.quantity}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

/*
  const reducer = (state, action) => {
    switch (action.type) {
      case 'changeProjectName':
        return {
          ...state,
          name: action.payload
        }
      default:
        return state;
    }
  }

  dispatch({
    type: 'changeProjectName',
    payload: {
      name: 'something'
    }
  });
*/