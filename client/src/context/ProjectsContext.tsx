import React, { useState, createContext, useContext, useMemo } from "react";
import { Project } from "../types/projectsTypes";

export type ProjectsContextData = {
  projects: Project[];
  setProjects: (projects: Project[]) => void;

  // flowers: Flower[];
  // setFlowers: (flowers: Flower[]) => void;
};

export const ProjectsContext = createContext<ProjectsContextData>({ projects: [], setProjects: () => void (0) });

export const useProjectContext = () => useContext(ProjectsContext);

type ProjectsContextProviderProps = {
  children: React.ReactNode;
};

export const ProjectsContextProvider: React.FC<
  ProjectsContextProviderProps
> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  const ctx = useMemo(() => ({
    projects,
    setProjects,
    //add flowers here too
  }), [projects, setProjects]);

  return (
    <ProjectsContext.Provider value={ctx}>{children}</ProjectsContext.Provider>
  );
};

/*
  React.createElement(Element, props, children)
*/