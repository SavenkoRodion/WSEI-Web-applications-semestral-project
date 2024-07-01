import {
  AppBar,
  Box,
  CssBaseline,
  Link,
  Stack,
  Switch,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import { Outlet } from "react-router-dom";

import { useEffect, useState } from "react";
import SelectedProjectRepository from "../../repository/localstorage/SelectedProjectRepository";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { enGB } from "date-fns/locale";
import Project from "@savenkorodion/webapp-model/entities/Project";
import ProjectRepository from "../../repository/backend/ProjectRepository";
import CreateProjectRequest from "@savenkorodion/webapp-model/requests/CreateProjectRequest";
import IAsyncCrudRepository from "../../repository/interfaces/async/IAsyncCrudRepository";

export type TProjectContext = {
  projects: Project[];
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
};

const Layout = () => {
  const projectRepository: IAsyncCrudRepository<CreateProjectRequest, Project> =
    new ProjectRepository();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    projectRepository.getAll().then((p) => setProjects(p));
  }, []);

  const selectedProjectRepository = new SelectedProjectRepository();

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
    selectedProjectRepository.create({ id: null });
    setSelectedProject(projects.filter((e) => e.id === selectedProjectId)[0]);
  }, [selectedProjectId]);

  const fromStorage: boolean = JSON.parse(
    localStorage.getItem("react_theme") ?? "false"
  );

  const [isDarkTheme, setIsDarkTheme] = useState(fromStorage);

  useEffect(() => {
    localStorage.setItem("react_theme", JSON.stringify(isDarkTheme));
  }, [isDarkTheme]);

  const theme = createTheme({
    palette: {
      primary: {
        main: isDarkTheme ? "#212121" : "#3f50b5",
      },
    },
  });

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
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
              </Stack>
              <Stack>
                <Switch
                  value={isDarkTheme}
                  onChange={(e) => {
                    setIsDarkTheme(e.target.checked);
                  }}
                  defaultChecked={isDarkTheme}
                  color="info"
                />
              </Stack>
            </Toolbar>
          </AppBar>
          <Box>
            <Outlet context={context} />
          </Box>
        </LocalizationProvider>
      </ThemeProvider>
    </Box>
  );
};

export default Layout;
