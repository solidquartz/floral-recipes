import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
import { Dashboard, Flowers, Projects } from "./pages";

export const App: React.FC = () => (
  <AppContextProvider>
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/flowers" element={<Flowers />} />
        </Route>
      </Routes>
    </Router>
  </AppContextProvider>
);
