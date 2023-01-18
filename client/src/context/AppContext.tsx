import React, { useState, createContext, useContext, useMemo } from "react";
import { Project } from "../types/projectsTypes";
import { Flower } from "../types/flowersTypes";

export type AppContextData = {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  flowers: Flower[];
  setFlowers: (flowers: Flower[]) => void;
};


export const AppContext = createContext<AppContextData>({ projects: [], setProjects: () => void (0), flowers: [], setFlowers: () => void (0) });

export const useAppContext = () => useContext(AppContext);

type AppContextProviderProps = {
  children: React.ReactNode;
};

export const AppContextProvider: React.FC<
  AppContextProviderProps
> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [flowers, setFlowers] = useState<Flower[]>([]);

  const ctx = useMemo(() => ({
    projects,
    setProjects,
    flowers,
    setFlowers
  }), [projects, setProjects, flowers, setFlowers]);

  return (
    <AppContext.Provider value={ctx}>{children}</AppContext.Provider>
  );
};

/*
  React.createElement(Element, props, children)
*/