import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard, Projects } from "./pages";

export const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/">
        <Route index element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
      </Route>
    </Routes>
  </Router>
);