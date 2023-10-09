import React, { useState } from "react";
import "./App.css";
import Header from "./Components/Sections/Header";
import MainSection from "./Components/MainSection";
import Footer from "./Components/Sections/Footer";
// import Loader from "react-loader-spinner";

const App = () => {
  return (
    <div className="app">
      <Header />
      <MainSection />
      <Footer />
    </div>
  );
}

export default App;
