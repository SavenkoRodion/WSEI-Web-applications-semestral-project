import { AppBar, Box, Button, Stack, Toolbar } from "@mui/material";
import { useState } from "react";
import StoryGrid from "../../components/story/StoryGrid";
import IRepository from "../../repository/interfaces/IRepository";
import StoryRepository from "../../repository/StoryRepository";
import { useParams } from "react-router-dom";
import StoryCreateDialog from "../../components/story/StoryCreateDialog";
import { Story, StoryPriority, StoryStatus } from "../../model/Story";
import { User } from "../../model/User";
import UserRepository from "../../repository/UserRepository";
import IReadRepository from "../../repository/interfaces/IReadRepository";

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

  const userRepository: IReadRepository<User> = new UserRepository();

  const handleCreateDialogCreate = (
    name: string,
    description: string,
    priority: StoryPriority,
    status: StoryStatus,
    ownerUserId: string
  ) => {
    storyRepository.create(
      new Story(name, description, priority, projectId!, status, ownerUserId)
    );
    setIsCreateDialogOpen(false);
    window.location.reload();
  };

  return (
    <>
      {projectId && (
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
                userList={userRepository.getAll()}
              />
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default ProjectStories;
