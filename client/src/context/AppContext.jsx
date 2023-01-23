import React, { useState, createContext, useContext, useMemo } from "react";

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [flowers, setFlowers] = useState([]);

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
