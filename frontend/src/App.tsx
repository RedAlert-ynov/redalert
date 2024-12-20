//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Mainpage from './templates/mainpage';
import Concept from "./templates/concept";
import Error404 from "./templates/404";

const App: React.FC = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Mainpage />} />
              < Route path="/concept" element={<Concept/>}/>
              <Route path="*" element={<Error404 />} />
          </Routes>
      </Router>
  );
};

export default App
