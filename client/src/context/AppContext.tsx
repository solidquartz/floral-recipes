import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  Dispatch
} from "react";
import { Flower, Project } from "../types";
import api from "../api/api";


export type AppContextType = {
  projects: Project[];
  setProjects: Dispatch<React.SetStateAction<Project[]>>;
  flowers: Flower[];
  setFlowers: Dispatch<React.SetStateAction<Flower[]>>;
  upsertFlower: (flower: Flower) => void;
  upsertProject: (project: Project) => void;
};

export const AppContext = createContext<AppContextType>({
  projects: [],
  setProjects: () => { },
  flowers: [],
  setFlowers: () => { },
  upsertFlower: () => { },
  upsertProject: () => { },
});

export const useAppContext = () => useContext(AppContext);

export type AppContextProviderProps = {
  children: React.ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [flowers, setFlowers] = useState<Flower[]>([]);

  const upsertFlower = (flower: Flower) => {
    const newFlowers = [...flowers.filter((x) => x.id !== flower.id), flower];
    console.log(newFlowers);
    setFlowers(newFlowers);
  };

  const upsertProject = (project: Project) => {
    const newProjects = [
      ...projects.filter((x) => x.id !== project.id),
      project,
    ];

    console.log(newProjects);
    setProjects(newProjects);
  };




  //get all flowers
  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/flowers");
      setFlowers(response.data.data.flowers);
    };

    if (!flowers.length) {
      fetchData().catch(console.error);
    }
  }, [flowers]);

  //move get all projects here

  const ctx = {
    projects,
    setProjects,
    flowers,
    setFlowers,
    upsertFlower,
    upsertProject,
  };

  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
};
