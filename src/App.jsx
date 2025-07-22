import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./secure/User/Register.jsx";
import Login from "./secure/User/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Navbar from "./layouts/Navbar.jsx";
import Protect from "./secure/User/Protect.jsx";
import Home from "./pages/Home.jsx";
import CreatCourse from "./components/course/CreatCourse.jsx";
import Footer from "./layouts/Footer.jsx";
import Contact from "./components/Contact/Contact.jsx";
import AdminProtect from "./secure/User/ProtectAdmin.jsx";
import Admin from "./pages/Admin.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes (no Navbar) */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes (with Navbar) */}
        <Route
          path="/profile"
          element={
            <Protect>
              <Navbar />
              <Profile />
            </Protect>
          }
        />
        <Route
          path="/home"
          element={
            <Protect>
              <Navbar />
              <Home />
              <Footer />
            </Protect>
          }
        />
        <Route
          path="/create-course"
          element={
            <Protect>
              <Navbar />
              <CreatCourse />
            </Protect>
          }
        />
        <Route
          path="/contact"
          element={
            <Protect>
              <Navbar />
              <Contact />
            </Protect>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminProtect>

              <Protect>
              <Navbar />
              <Admin />
            </Protect>
            </AdminProtect>
          }
        />
      </Routes>
      
    </BrowserRouter>
    
  );
}

export default App;
