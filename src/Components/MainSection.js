import React from "react";
import Home from "./Sections/Home";
import Connect from "./Sections/Connect";
import College from "./Sections/College";
import Intern from "./Sections/Intern";
import Jobs from "./Sections/Jobs";
import Scholarships from "./Sections/Scholarships";
import Competitions from "./Sections/Competitions";
import Events from "./Sections/Events";
import Sliders from "./Sections/Slider";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";


const MainSection = () => {
  return (
    <section className="main_sec home_page">
      <BrowserRouter >
        <CssBaseline />
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/college" element={<College />} />
          <Route path="/intern" element={<Intern />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/competitions" element={<Competitions />} />
          <Route path="/events" element={<Events />} />
          <Route path="/sliders" element={<Sliders />} />
        </Routes>
      </BrowserRouter>
      <Home />
      <Connect />
    </section>
  );
};

export default MainSection;
