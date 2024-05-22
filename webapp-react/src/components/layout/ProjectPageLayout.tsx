import { AppBar, Box, Button, Link, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import IRepository from "../../repository/IRepository";
import { Project, SelectedProjectId } from "../../model/Project";
import SelectedProjectRepository from "../../repository/SelectedProjectRepository";
import ProjectRepository from "../../repository/ProjectRepository";
import { useEffect, useState } from "react";
import ProjectCreateDialog from "../project/ProjectCreateDialog";

export type TProjectContext = {
  projects: Project[];
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
};

export const ProjectPageLayout = () => {
  const projectRepository: IRepository<Project> = new ProjectRepository();
  const projects = projectRepository.getAll();

  const selectedProjectRepository: IRepository<SelectedProjectId> =
    new SelectedProjectRepository();
  const [selectedProjectId, setSelectedProjectId] = useState(
    selectedProjectRepository.getAll()[0].id
  );
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(
    projects.filter((e) => e.id === selectedProjectId)[0]
  );

  const context: TProjectContext = {
    projects: projects,
    selectedProjectId: selectedProjectId,
    setSelectedProjectId: setSelectedProjectId,
  };

  useEffect(() => {
    selectedProjectRepository.create(new SelectedProjectId(selectedProjectId));
    setSelectedProject(projects.filter((e) => e.id === selectedProjectId)[0]);
  }, [selectedProjectId]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreateDialogClose = () => {
    setIsCreateDialogOpen(false);
  };

  const handleCreateDialogOpen = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCreateDialogCreate = (name: string, description: string) => {
    projectRepository.create(new Project(name, description));
    setIsCreateDialogOpen(false);
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
            <Button
              onClick={handleCreateDialogOpen}
              sx={{
                color: "white",
                textDecoration: "underline",
                marginLeft: "16px",
              }}
            >
              Create project
            </Button>
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
              Selected project: {selectedProject?.name ?? "none"}
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box>
        <Outlet context={context} />
      </Box>
      {isCreateDialogOpen && (
        <ProjectCreateDialog
          onClose={handleCreateDialogClose}
          onCreate={handleCreateDialogCreate}
        />
      )}
    </>
  );
};
