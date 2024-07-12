import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Stack,
  Toolbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import StoryGrid from "../../components/story/StoryGrid";
import { useParams } from "react-router-dom";
import StoryCreateDialog from "../../components/story/StoryCreateDialog";
import Story, {
  StoryPriority,
  StoryStatus,
} from "@savenkorodion/webapp-model/entities/Story";
import User, { UserRole } from "@savenkorodion/webapp-model/entities/User";
import Task from "@savenkorodion/webapp-model/entities/Task";
import TaskCreateDialog from "../../components/task/TaskCreateDialog";
import IAsyncCrudRepository from "../../repository/interfaces/async/IAsyncCrudRepository";
import StoryRepository from "../../repository/backend/StoryRepository";
import CreateStoryRequest from "@savenkorodion/webapp-model/requests/CreateStoryRequest";
import TaskRepository from "../../repository/backend/TaskRepository";
import CreateTaskRequest from "@savenkorodion/webapp-model/requests/CreateTaskRequest";
import { TaskPriority } from "@savenkorodion/webapp-model/entities/TaskObjects";
import UserRepository from "../../repository/backend/UserRepository";

const ProjectStories = () => {
  const storyRepository: IAsyncCrudRepository<CreateStoryRequest, Story> =
    new StoryRepository();
  const userRepository = new UserRepository();
  const taskRepository: IAsyncCrudRepository<CreateTaskRequest, Task> =
    new TaskRepository();

  const [isStoryCreateDialogOpen, setIsStoryCreateDialogOpen] = useState(false);
  const [isTaskCreateDialogOpen, setIsTaskCreateDialogOpen] = useState(false);

  const handleStoryCreateDialogClose = () => {
    setIsStoryCreateDialogOpen(false);
  };

  const handleStoryCreateDialogOpen = () => {
    setIsStoryCreateDialogOpen(true);
  };

  const { projectId } = useParams();

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
    });
    setIsStoryCreateDialogOpen(false);
    window.location.reload();
  };

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
    });
    setIsStoryCreateDialogOpen(false);
    window.location.reload();
  };

  const [storyList, setStoryList] = useState<Story[] | undefined>(undefined);
  useEffect(() => {
    storyRepository
      .getAll()
      .then((e) => setStoryList(e.filter((e) => e.projectId === projectId)));
  }, []);

  const [taskList, setTaskList] = useState<Task[] | undefined>(undefined);
  useEffect(() => {
    taskRepository.getAll().then((e) => {
      setTaskList(e.filter((e) => e.projectId === projectId));
      console.log(taskList);
    });
  }, []);

  const [userList, setUserList] = useState<User[] | undefined>(undefined);
  useEffect(() => {
    userRepository.getAll().then((e: User[]) => {
      setUserList(e.filter((e) => e.role === UserRole.Admin));
    });
  }, []);

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
              {!!storyList?.length && (
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
              {storyList !== undefined &&
              taskList !== undefined &&
              userList?.length !== undefined ? (
                <StoryGrid
                  stories={storyList}
                  tasks={taskList}
                  users={userList}
                />
              ) : (
                <CircularProgress />
              )}
            </Stack>
            {isStoryCreateDialogOpen && userList?.length && (
              <StoryCreateDialog
                onClose={handleStoryCreateDialogClose}
                onCreate={handleStoryCreateDialogCreate}
                userList={userList}
              />
            )}
            {isTaskCreateDialogOpen && storyList !== undefined && (
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
