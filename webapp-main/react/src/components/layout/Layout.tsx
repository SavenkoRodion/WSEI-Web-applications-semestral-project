import {
  AppBar,
  Box,
  CircularProgress,
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
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { enGB } from "date-fns/locale";
import Project from "@savenkorodion/webapp-model/entities/Project";
import ProjectRepository from "../../repository/backend/ProjectRepository";
import CreateProjectRequest from "@savenkorodion/webapp-model/requests/CreateProjectRequest";
import IAsyncCrudRepository from "../../repository/interfaces/async/IAsyncCrudRepository";
import SelectedProjectRepository from "../../repository/backend/SelectedProjectRepository";

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
    console.log("1");
  }, []);

  useEffect(() => {
    if (projects !== undefined) {
      console.log();
      setSelectedProject(
        projects.filter((e) => e._id === selectedProjectId)[0]
      );
    }
    console.log("2");
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
            {projects?.length && selectedProjectId !== undefined ? (
              <Outlet context={context} />
            ) : (
              <CircularProgress />
            )}
          </Box>
        </LocalizationProvider>
      </ThemeProvider>
    </Box>
  );
};

export default Layout;
