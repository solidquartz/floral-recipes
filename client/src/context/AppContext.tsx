import React, { useEffect, useState, createContext, useContext, useMemo } from "react";
import api from "../api/api";

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [flowers, setFlowers] = useState([]);

  const upsertFlower = (flower) => {
    const newFlowers = [
      ...flowers.filter(x => x.id !== flower.id), flower,];
    console.log(newFlowers);
    setFlowers(newFlowers);
  };

  const upsertProject = (project) => {
    const newProjects = [
      ...projects.filter(x => x.id !== project.id),
      project
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
    upsertProject
  };//, [projects, setProjects, flowers, setFlowers, upsertFlower]);

  return (
    <AppContext.Provider value={ctx}>{children}</AppContext.Provider>
  );
};
