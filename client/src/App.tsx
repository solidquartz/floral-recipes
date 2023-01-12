import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/index";

export const App: React.FC = () => (
  <Router>
    <Routes>
        <Route index element={<Dashboard />} />
        {/* <Route path="/travel" element={<Travel />} />
        <Route path="/registry" element={<Registry />} />
        <Route path="/rsvp" element={<Rsvp />} />
        <Route path="/confirmation" element={<Confirmation />} /> */}
    </Routes>
  </Router>
);
