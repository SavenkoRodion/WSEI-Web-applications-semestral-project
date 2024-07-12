import {
  AppBar,
  Box,
  CircularProgress,
  Link,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Outlet, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import Project from "@savenkorodion/webapp-model/entities/Project";
import ProjectRepository from "../../repository/backend/ProjectRepository";
import CreateProjectRequest from "@savenkorodion/webapp-model/requests/CreateProjectRequest";
import IAsyncCrudRepository from "../../repository/interfaces/async/IAsyncCrudRepository";
import SelectedProjectRepository from "../../repository/backend/SelectedProjectRepository";
import { TBaselineContext } from "./BaselineLayout";
import ThemeSwitch from "./ThemeSwitch";

export type TProjectContext = {
  projects: Project[];
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
};

const Layout = () => {
  const projectRepository: IAsyncCrudRepository<CreateProjectRequest, Project> =
    new ProjectRepository();
  const selectedProjectRepository = new SelectedProjectRepository();

  const [projects, setProjects] = useState<Project[] | undefined>(undefined);
  const [selectedProjectId, setSelectedProjectId] = useState<
    string | null | undefined
  >(undefined);
  const [selectedProject, setSelectedProject] = useState<
    Project | null | undefined
  >(undefined);

  useEffect(() => {
    projectRepository.getAll().then((p) => {
      setProjects(p);
    });
    selectedProjectRepository.getAll().then((e) => {
      setSelectedProjectId(e[0]?._id ?? null);
    });
  }, []);

  useEffect(() => {
    if (projects !== undefined) {
      setSelectedProject(
        projects.filter((e) => e._id === selectedProjectId)[0]
      );
    }
  }, [selectedProjectId, projects]);

  const setSelectedProjectIdWrapper = (id: string | null) => {
    selectedProjectRepository.replace(id);
    setSelectedProjectId(id);
  };

  const context: TProjectContext = {
    projects: projects!,
    selectedProjectId: selectedProjectId!,
    setSelectedProjectId: setSelectedProjectIdWrapper,
  };

  const baselineContext: TBaselineContext = useOutletContext();

  return (
    <>
      <AppBar position="sticky">
        <Toolbar
          variant="dense"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Stack flexDirection={"row"}>
            <Typography>
              <Link
                href="/"
                sx={{ color: "white", textDecoration: "underline" }}
              >
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
                href={`/project/${selectedProject?._id ?? ""}`}
                sx={{
                  color: "white",
                  textDecoration: "underline",
                  marginLeft: "16px",
                }}
              >
                Selected project: {selectedProject?.name ?? "none"}
              </Link>
            </Typography>
            <Typography>
              <Link
                href="/login"
                sx={{
                  color: "white",
                  textDecoration: "underline",
                  marginLeft: "16px",
                }}
              >
                Login
              </Link>
            </Typography>
          </Stack>
          <Stack>
            <ThemeSwitch
              isDarkTheme={baselineContext.isDarkTheme}
              setIsDarkTheme={baselineContext.setIsDarkTheme}
            />
          </Stack>
        </Toolbar>
      </AppBar>
      <Box>
        {projects?.length && selectedProjectId !== undefined ? (
          <Outlet context={context} />
        ) : (
          <CircularProgress />
        )}
      </Box>
    </>
  );
};

export default Layout;
