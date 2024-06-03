import { Box, Button, Stack } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import { TProjectContext } from "../layout/ProjectPageLayout";
import ProjectTable from "../../components/project/ProjectTable";
import { useState } from "react";
import { Project } from "../../model/Project";
import ProjectCreateDialog from "../../components/project/ProjectCreateDialog";
import IRepository from "../../repository/IRepository";
import ProjectRepository from "../../repository/ProjectRepository";

const ProjectList = () => {
  const context: TProjectContext = useOutletContext();
  const projectRepository: IRepository<Project> = new ProjectRepository();

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
    window.location.reload();
  };

  return (
    <Box>
      <Stack>
        <ProjectTable context={context} />
      </Stack>
      <Stack>
        <Button
          sx={{ width: "150px", margin: "20px 0 0 10px" }}
          variant="contained"
          size="small"
          onClick={handleCreateDialogOpen}
        >
          Create project
        </Button>
      </Stack>
      {isCreateDialogOpen && (
        <ProjectCreateDialog
          onClose={handleCreateDialogClose}
          onCreate={handleCreateDialogCreate}
        />
      )}
    </Box>
  );
};

export default ProjectList;
