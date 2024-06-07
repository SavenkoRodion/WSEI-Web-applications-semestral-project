import { AppBar, Box, Button, Stack, Toolbar } from "@mui/material";
import { useState } from "react";
import ProjectStoryCreateDialog from "../../components/project/ProjectStoryCreateDialog";
import StoryGrid from "../../components/story/StoryGrid";

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
    <>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <Button
            sx={{ color: "white", textDecoration: "underline" }}
            size="small"
            onClick={handleCreateDialogOpen}
          >
            Create story
          </Button>
        </Toolbar>
      </AppBar>
      <Box>
        <Stack>
          <StoryGrid data={[1, 2]} />
        </Stack>
        {isCreateDialogOpen && (
          <ProjectStoryCreateDialog
            onClose={handleCreateDialogClose}
            onCreate={handleCreateDialogCreate}
          />
        )}
      </Box>
    </>
  );
};

export default ProjectStories;
