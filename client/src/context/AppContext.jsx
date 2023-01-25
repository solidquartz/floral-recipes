import React, { useState, createContext, useContext, useMemo } from "react";

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [flowers, setFlowers] = useState([]);

  const addFlower = (flower) => {
    setFlowers([...flowers, flower]);
}


  const ctx = useMemo(() => ({
    projects,
    setProjects,
    flowers,
    setFlowers,
    addFlower
  }), [projects, setProjects, flowers, setFlowers, addFlower]);

  return (
    <AppContext.Provider value={ctx}>{children}</AppContext.Provider>
  );
};
