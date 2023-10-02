import React, { useState } from "react";
import "./App.css";
import Header from "./Components/Sections/Header";
import MainSection from "./Components/MainSection";
import Footer from "./Components/Sections/Footer";
// import Loader from "react-loader-spinner";
function App() {
  const [state, setState] = useState(false);
  setTimeout(() => {
    setState(true);
  }, 4000);
  return (
    <div className="app">
      <Header />
      <MainSection />
      <Footer />
    </div>
  );
}

export default App;
