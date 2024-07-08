import { AppBar, Box, Button, Stack, Toolbar } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import ProjectTable from "../../components/project/ProjectTable";
import { useState } from "react";
import Project from "@savenkorodion/webapp-model/entities/Project";
import ProjectCreateDialog from "../../components/project/ProjectCreateDialog";
import { TProjectContext } from "../../components/layout/Layout";
import ProjectRepository from "../../repository/backend/ProjectRepository";
import IAsyncCrudRepository from "../../repository/interfaces/async/IAsyncCrudRepository";
import CreateProjectRequest from "@savenkorodion/webapp-model/requests/CreateProjectRequest";

const ProjectList = () => {
  const context: TProjectContext = useOutletContext();
  const projectRepository: IAsyncCrudRepository<CreateProjectRequest, Project> =
    new ProjectRepository();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreateDialogClose = () => {
    setIsCreateDialogOpen(false);
  };

  const handleCreateDialogOpen = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCreateDialogCreate = (name: string, description: string) => {
    projectRepository.create({ name: name, description: description });
    setIsCreateDialogOpen(false);
    window.location.reload();
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <Button
            sx={{ color: "white", textDecoration: "underline" }}
            size="small"
            onClick={handleCreateDialogOpen}
          >
            Create project
          </Button>
        </Toolbar>
      </AppBar>
      <Box>
        <Stack>
          <ProjectTable context={context} />
        </Stack>
        {isCreateDialogOpen && (
          <ProjectCreateDialog
            onClose={handleCreateDialogClose}
            onCreate={handleCreateDialogCreate}
          />
        )}
      </Box>
    </>
  );
};

export default ProjectList;
