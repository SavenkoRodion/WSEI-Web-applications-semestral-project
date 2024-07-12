import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import {
  TaskPriority,
  TaskStatus,
} from "@savenkorodion/webapp-model/entities/TaskObjects";
import UserRepository from "../../repository/localstorage/UserRepository";
import { UserRole } from "@savenkorodion/webapp-model/entities/User";
import { useState } from "react";
import TaskDeleteDialog from "./TaskDeleteDialog";
import TaskEditDialog from "./TaskEditDialog";
import Story from "@savenkorodion/webapp-model/entities/Story";
import { useParams } from "react-router-dom";
import StoryRepository from "../../repository/backend/StoryRepository";
import IAsyncCrudRepository from "../../repository/interfaces/async/IAsyncCrudRepository";
import CreateStoryRequest from "@savenkorodion/webapp-model/requests/CreateStoryRequest";
import CreateTaskRequest from "@savenkorodion/webapp-model/requests/CreateTaskRequest";
import TaskRepository from "../../repository/backend/TaskRepository";
import Task from "@savenkorodion/webapp-model/entities/Task";

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const userRepository = new UserRepository();

  const userList = userRepository
    .getAll()
    .filter((e) => e.role !== UserRole.Admin);

  const taskOwner = userList.filter((e) => e._id === task.ownerUserId)[0];

  const taskOwnerName = task.ownerUserId
    ? `${taskOwner.firstName} ${taskOwner.lastName}`
    : "Unassigned";

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteDialogOpen = () => {
    setIsDeleteDialogOpen(true);
  };

  const taskRepository: IAsyncCrudRepository<CreateTaskRequest, Task> =
    new TaskRepository();

  const handleDelete = () => {
    taskRepository.delete(task._id);
    handleDeleteDialogClose();
    window.location.reload();
  };

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false);
  };

  const handleEditDialogOpen = () => {
    setIsEditDialogOpen(true);
  };

  const handleEdit = (editedTask: Task) => {
    taskRepository.replace(editedTask);
    handleDeleteDialogClose();
    window.location.reload();
  };

  const { projectId } = useParams();
  const storyRepository: IAsyncCrudRepository<CreateStoryRequest, Story> =
    new StoryRepository();
  const [storyList, setStoryList] = useState<Story[] | undefined>(undefined);

  storyRepository
    .getAll()
    .then((e) => setStoryList(e.filter((e) => e.projectId === projectId)));

  const handleTaskComplete = () => {
    const editedTask = task;
    editedTask.status = TaskStatus.Done;
    taskRepository.replace(editedTask);
    window.location.reload();
  };

  return (
    <>
      <Card sx={{ boxShadow: "inset 2px 0px green" }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {`Owner: ${taskOwnerName}`}
          </Typography>
          <Typography variant="h5" component="div">
            {task.name}
          </Typography>
          <Typography sx={{ mt: 1.5 }} color="text.secondary">
            {`Task priority: ${TaskPriority[task.priority]}`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={handleTaskComplete}
            variant={"contained"}
          >
            Complete
          </Button>
          <Button size="small" onClick={handleEditDialogOpen}>
            Edit
          </Button>
          <Button size="small" onClick={handleDeleteDialogOpen}>
            Delete
          </Button>
        </CardActions>
      </Card>
      {isDeleteDialogOpen && (
        <TaskDeleteDialog
          onClose={handleDeleteDialogClose}
          onDelete={handleDelete}
          id={task._id}
          name={task.name}
        />
      )}
      {isEditDialogOpen && storyList !== undefined && (
        <TaskEditDialog
          onClose={handleEditDialogClose}
          onEdit={handleEdit}
          task={task}
          userList={userList}
          storyList={storyList}
        />
      )}
    </>
  );
};

export default TaskCard;
