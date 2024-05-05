import { AppBar, Box, Link, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import IRepository from "../../repository/IRepository";
import { Project, SelectedProject } from "../../model/Project";
import SelectedProjectRepository from "../../repository/SelectedProjectRepository";
import ProjectRepository from "../../repository/ProjectRepository";
import { useState } from "react";

export type TProjectContext = {
  projects: Project[];
  selectedProjectId: string;
  setSelectedProjectId: (id: string) => void;
};

export const ProjectPageLayout = () => {
  const projectRepository: IRepository<Project> = new ProjectRepository();
  const projects = projectRepository.getAll();

  const selectedProjectRepository: IRepository<SelectedProject> =
    new SelectedProjectRepository();
  const [selectedProjectId, setSelectedProjectId] = useState(
    selectedProjectRepository.getAll()[0].id
  );
  const [selectedProject] = useState(
    projects.filter((e) => e.id === selectedProjectId)[0]
  );

  const context: TProjectContext = {
    projects: projects,
    selectedProjectId: selectedProjectId,
    setSelectedProjectId: setSelectedProjectId,
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <Typography>
            <Link
              href="/project"
              sx={{ color: "white", textDecoration: "underline" }}
            >
              Project list
            </Link>
          </Typography>
          <Typography>
            <Link
              href="project/create"
              sx={{
                color: "white",
                textDecoration: "underline",
                marginLeft: "16px",
              }}
            >
              Create project
            </Link>
          </Typography>
          <Typography>
            <Link
              href="/project/create"
              sx={{
                color: "white",
                textDecoration: "underline",
                marginLeft: "16px",
              }}
            >
              Selected project: {selectedProject.name ?? "none"}
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box>
        <Outlet context={context} />
      </Box>
    </>
  );
};
