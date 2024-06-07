import { Box, Button, Stack } from "@mui/material";
import { useState } from "react";
import ProjectStoryCreateDialog from "../../components/project/ProjectStoryCreateDialog";

const ProjectStories = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreateDialogClose = () => {
    setIsCreateDialogOpen(false);
  };

  const handleCreateDialogOpen = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCreateDialogCreate = () => {};
  return (
    <Box>
      <Stack>Tabel</Stack>
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
        <ProjectStoryCreateDialog
          onClose={handleCreateDialogClose}
          onCreate={handleCreateDialogCreate}
        />
      )}
    </Box>
  );
};

export default ProjectStories;
