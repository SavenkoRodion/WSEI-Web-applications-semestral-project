import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/layout/Layout.tsx";
import Home from "./pages/home/Home.tsx";
import ProjectList from "./pages/project/ProjectList.tsx";
import { ProjectPageLayout } from "./pages/layout/ProjectPageLayout.tsx";
import ProjectStories from "./pages/project/ProjectStories.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route element={<Home />} index></Route>
          <Route element={<ProjectPageLayout />} path="project">
            <Route element={<ProjectList />} path="" />
            <Route element={<ProjectStories />} path=":projectId" />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
