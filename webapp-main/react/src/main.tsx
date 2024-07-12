import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout.tsx";
import Home from "./pages/home/Home.tsx";
import ProjectList from "./pages/project/ProjectList.tsx";
import ProjectStories from "./pages/project/ProjectStories.tsx";
import Login from "./pages/home/Login.tsx";
import BaselineLayout from "./components/layout/BaselineLayout.tsx";
import AnonLayout from "./components/layout/AnonLayout.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<BaselineLayout />}>
          <Route element={<Layout />}>
            <Route element={<Home />} path="/" />
            <Route element={<Login />} path="login" />
            <Route element={<ProjectList />} path="project" />
            <Route element={<ProjectStories />} path="project/:projectId" />
          </Route>
          <Route element={<AnonLayout />} path="anonymous">
            <Route path="login" element={<Login />} index />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
