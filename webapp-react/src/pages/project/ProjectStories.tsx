import { AppBar, Box, Button, Stack, Toolbar } from "@mui/material";
import { useState } from "react";
import StoryGrid from "../../components/story/StoryGrid";
import IRepository from "../../repository/interfaces/IRepository";
import StoryRepository from "../../repository/StoryRepository";
import { useParams } from "react-router-dom";
import StoryCreateDialog from "../../components/story/StoryCreateDialog";
import { Story } from "../../model/Story";
import { User } from "../../model/User";

const ProjectStories = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreateDialogClose = () => {
    setIsCreateDialogOpen(false);
  };

  const handleCreateDialogOpen = () => {
    setIsCreateDialogOpen(true);
  };

  const storyRepository: IRepository<Story> = new StoryRepository();

  const { projectId } = useParams();

  const userRepository: IRepository<User> = new UserRepository();

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
          <StoryGrid
            data={storyRepository
              .getAll()
              .filter((e) => e.projectId === projectId)}
          />
        </Stack>
        {isCreateDialogOpen && (
          <StoryCreateDialog
            onClose={handleCreateDialogClose}
            onCreate={handleCreateDialogCreate}
          />
        )}
      </Box>
    </>
  );
};

export default ProjectStories;
