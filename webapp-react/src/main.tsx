import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/layout/Layout.tsx";
import Home from "./pages/home/Home.tsx";
import ProjectList from "./pages/project/ProjectList.tsx";
import ProjectStories from "./pages/project/ProjectStories.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route element={<Home />} index />
          <Route element={<ProjectList />} path="project" />
          <Route element={<ProjectStories />} path="project/:projectId" />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
