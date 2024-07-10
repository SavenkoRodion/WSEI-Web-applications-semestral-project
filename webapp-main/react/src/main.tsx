import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout.tsx";
import Home from "./pages/home/Home.tsx";
import ProjectList from "./pages/project/ProjectList.tsx";
import ProjectStories from "./pages/project/ProjectStories.tsx";
import Login from "./pages/home/Login.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route element={<Home />} index />
          <Route element={<Login />} path="login" />
          <Route element={<ProjectList />} path="project" />
          <Route element={<ProjectStories />} path="project/:projectId" />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
