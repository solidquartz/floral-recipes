import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
import { CreateFlower, CreateProject, Dashboard, EditFlower, Flowers, ProjectDetails, Projects } from "./pages";

export const App= () => (
  <AppContextProvider>
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/create" element={<CreateProject />} />
          <Route path="/projects/:id/details" element={<ProjectDetails/>} />
          <Route path="/flowers" element={<Flowers />} />
          <Route path="/flowers/create" element={<CreateFlower />} />
          <Route path="/flowers/:id/edit" element={<EditFlower />} />
        </Route>
      </Routes>
    </Router>
  </AppContextProvider>
);
