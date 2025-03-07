//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Mainpage from './templates/mainpage';
import Concept from "./templates/concept";
import Error404 from "./templates/404";
import Register from "./templates/register";
import Login from "./templates/login";
import Quisommesnous from "./templates/qui_sommes_nous";
const App: React.FC = () => {
return (
    <Router>
        <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/concept" element={<Concept/>}/>
            <Route path="*" element={<Error404 />} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="qui_sommes_nous" element={<Quisommesnous/>}/>
        </Routes>
    </Router>
  );
};

export default App
