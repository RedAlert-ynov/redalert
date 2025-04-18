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
import Quisommesnous from "./templates/qui_sommes_nous";import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/client";

import ArticleList from "./templates/article_list";
import NewArticle from "./templates/new_article";
import SingleArticle from "./templates/single_article";
import Dashboard from "./templates/dashboard";
import AdminDashboard from "./templates/admin_dashboard";
import AdminUserEdition from "./templates/admin_user_edition";
import AdminArticleEdition from "./templates/admin_article_edition";
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
        <Router>
            <Routes>
                <Route path="/" element={<Mainpage />} />
                <Route path="/concept" element={<Concept/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="qui_sommes_nous" element={<Quisommesnous/>}/>
                <Route path="/article_list" element={<ArticleList/>}/>
                <Route path="/new_article"element={<NewArticle/>}/>
                <Route path="/article/:slug" element={<SingleArticle/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/admin_dashboard" element={<AdminDashboard />} />
                <Route path="/admin_dashboard/users/:id" element={<AdminUserEdition />} />
                <Route path="/admin_dashboard/articles/:slug" element={<AdminArticleEdition />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </Router>
      </QueryClientProvider>
  );
};

export default App
