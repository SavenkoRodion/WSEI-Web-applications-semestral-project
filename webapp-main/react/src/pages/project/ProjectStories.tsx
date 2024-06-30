import { AppBar, Box, Button, Stack, Toolbar } from "@mui/material";
import { useState } from "react";
import StoryGrid from "../../components/story/StoryGrid";
import StoryRepository from "../../repository/localstorage/StoryRepository";
import { useParams } from "react-router-dom";
import StoryCreateDialog from "../../components/story/StoryCreateDialog";
import Story, {
  StoryPriority,
  StoryStatus,
} from "@savenkorodion/webapp-model/entities/Story";
import User, { UserRole } from "@savenkorodion/webapp-model/entities/User";
import UserRepository from "../../repository/localstorage/UserRepository";
import Task, { TaskPriority } from "@savenkorodion/webapp-model/entities/Task";
import TaskRepository from "../../repository/localstorage/TaskRepository";
import TaskCreateDialog from "../../components/task/TaskCreateDialog";
import ICrudRepository from "@savenkorodion/repository-interfaces/sync/ICrudRepository";
import IReadRepository from "@savenkorodion/repository-interfaces/sync/IReadRepository";

const ProjectStories = () => {
  const [isStoryCreateDialogOpen, setIsStoryCreateDialogOpen] = useState(false);

  const handleStoryCreateDialogClose = () => {
    setIsStoryCreateDialogOpen(false);
  };

  const handleStoryCreateDialogOpen = () => {
    setIsStoryCreateDialogOpen(true);
  };

  const storyRepository: ICrudRepository<Story> = new StoryRepository();

  const { projectId } = useParams();

  const userRepository: IReadRepository<User> = new UserRepository();

  const handleStoryCreateDialogCreate = (
    name: string,
    description: string,
    priority: StoryPriority,
    status: StoryStatus,
    ownerUserId: string
  ) => {
    storyRepository.create({
      name: name,
      description: description,
      priority: priority,
      projectId: projectId!,
      status: status,
      ownerUserId: ownerUserId,
      id: "",
      dateOfCreation: new Date(),
    });
    setIsStoryCreateDialogOpen(false);
    window.location.reload();
  };

  const taskRepository: ICrudRepository<Task> = new TaskRepository();

  const [isTaskCreateDialogOpen, setIsTaskCreateDialogOpen] = useState(false);

  const handleTaskCreateDialogClose = () => {
    setIsTaskCreateDialogOpen(false);
  };

  const handleTaskCreateDialogOpen = () => {
    setIsTaskCreateDialogOpen(true);
  };

  const handleTaskCreateDialogCreate = (
    name: string,
    storyId: string,
    priority: TaskPriority,
    timeEstimationInDays?: number
  ) => {
    taskRepository.create({
      name: name,
      priority: priority,
      timeEstimationInDays: timeEstimationInDays,
      startDate: undefined,
      endDate: undefined,
      ownerUserId: undefined,
      projectId: projectId!,
      storyId: storyId,
      id: "",
    } as any);
    setIsStoryCreateDialogOpen(false);
    window.location.reload();
  };

  const storyList = storyRepository
    .getAll()
    .filter((e) => e.projectId === projectId);

  const userList = userRepository
    .getAll()
    .filter((e) => e.role !== UserRole.Admin);

  return (
    <>
      {projectId && (
        <>
          <AppBar position="sticky">
            <Toolbar variant="dense">
              <Button
                sx={{ color: "white", textDecoration: "underline" }}
                size="small"
                onClick={handleStoryCreateDialogOpen}
              >
                Create story
              </Button>
              {!!storyList.length && (
                <Button
                  sx={{ color: "white", textDecoration: "underline" }}
                  size="small"
                  onClick={handleTaskCreateDialogOpen}
                >
                  Create task
                </Button>
              )}
            </Toolbar>
          </AppBar>
          <Box>
            <Stack>
              <StoryGrid stories={storyList} tasks={taskRepository.getAll()} />
            </Stack>
            {isStoryCreateDialogOpen && (
              <StoryCreateDialog
                onClose={handleStoryCreateDialogClose}
                onCreate={handleStoryCreateDialogCreate}
                userList={userList}
              />
            )}
            {isTaskCreateDialogOpen && (
              <TaskCreateDialog
                onClose={handleTaskCreateDialogClose}
                onCreate={handleTaskCreateDialogCreate}
                storyList={storyList}
              />
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default ProjectStories;
