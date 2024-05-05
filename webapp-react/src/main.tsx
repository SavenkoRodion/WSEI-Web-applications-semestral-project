import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout.tsx";
import Home from "./components/home/Home.tsx";
import ProjectList from "./components/project/ProjectList.tsx";
import ProjectCreate from "./components/project/ProjectCreate.tsx";
import { ProjectPageLayout } from "./components/layout/ProjectPageLayout.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route element={<Home />} index></Route>
          <Route element={<ProjectPageLayout />} path="project">
            <Route element={<ProjectList />} path="" />
            <Route element={<ProjectCreate />} path="create" />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
