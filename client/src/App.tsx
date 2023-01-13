import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages";

export const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/">
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  </Router>
);