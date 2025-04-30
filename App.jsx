import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AddLocal from "./pages/AddLocal";
import AddAffiliate from "./pages/AddAffiliate";
import Search from "./pages/Search";
import Statistics from "./pages/Statistics";
import StartProject from "./pages/StartProject";
import Settings from "./pages/Settings";
import ContactUs from "./pages/ContactUs";
import ProjectDetail from "./pages/ProjectDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-local" element={<AddLocal />} />
        <Route path="/add-affiliate" element={<AddAffiliate />} />
        <Route path="/search" element={<Search />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/start-project" element={<StartProject />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
