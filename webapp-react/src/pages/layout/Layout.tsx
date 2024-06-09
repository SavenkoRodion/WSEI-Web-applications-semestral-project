import {
  AppBar,
  Box,
  CssBaseline,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { Project, SelectedProjectId } from "../../model/Project";
import ProjectRepository from "../../repository/ProjectRepository";
import IRepository from "../../repository/interfaces/IRepository";
import { useEffect, useMemo, useState } from "react";
import SelectedProjectRepository from "../../repository/SelectedProjectRepository";

export type TProjectContext = {
  projects: Project[];
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
};

const Layout = () => {
  const projectRepository: IRepository<Project> = new ProjectRepository();
  const projects = projectRepository.getAll();

  const selectedProjectRepository: IRepository<SelectedProjectId> = useMemo(
    () => new SelectedProjectRepository(),
    []
  );

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    selectedProjectRepository.getAll()[0]?.id ?? null
  );
  const [selectedProject, setSelectedProject] = useState<Project | null>(
    projects.filter((e) => e.id === selectedProjectId)[0] ?? null
  );

  const context: TProjectContext = {
    projects: projects,
    selectedProjectId: selectedProjectId,
    setSelectedProjectId: setSelectedProjectId,
  };

  useEffect(() => {
    selectedProjectRepository.create(new SelectedProjectId(selectedProjectId));
    setSelectedProject(projects.filter((e) => e.id === selectedProjectId)[0]);
  }, [selectedProjectId, selectedProjectRepository, projects]);

  return (
    <Box>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <Typography>
            <Link href="/" sx={{ color: "white", textDecoration: "underline" }}>
              Home
            </Link>
          </Typography>
          <Typography>
            <Link
              href="/project"
              sx={{
                color: "white",
                textDecoration: "underline",
                marginLeft: "16px",
              }}
            >
              Project list
            </Link>
          </Typography>
          <Typography>
            <Link
              href={`/project/${selectedProject?.id ?? ""}`}
              sx={{
                color: "white",
                textDecoration: "underline",
                marginLeft: "16px",
              }}
            >
              Selected project: {selectedProject?.name ?? "none"}
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box>
        <Outlet context={context} />
      </Box>
    </Box>
  );
};

export default Layout;
