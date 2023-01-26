import React, { useState, createContext, useContext, useMemo } from "react";

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [flowers, setFlowers] = useState([]);

  const upsertFlower = (flower) => {
    const newFlowers = [
      ...flowers.filter(x => x.id !== flower.id), flower,]
    console.log(newFlowers);
    setFlowers(newFlowers);
  };


  const ctx = {
    projects,
    setProjects,
    flowers,
    setFlowers,
    upsertFlower
  }//, [projects, setProjects, flowers, setFlowers, upsertFlower]);

  return (
    <AppContext.Provider value={ctx}>{children}</AppContext.Provider>
  );
};
