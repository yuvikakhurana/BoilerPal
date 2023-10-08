import React, { useState } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import "./App.css";
import Header from "./Components/Sections/Header";
import MainSection from "./Components/MainSection";
import Footer from "./Components/Sections/Footer";
import ForgotPassword from "./Components/Forgot"
// import Loader from "react-loader-spinner";
function App() {
  const [state, setState] = useState(false);
  setTimeout(() => {
    setState(true);
  }, 4000);
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/forgot-password" element = {<ForgotPassword />}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
