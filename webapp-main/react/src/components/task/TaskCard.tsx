import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Task, {
  TaskPriority,
  TaskStatus,
} from "@savenkorodion/webapp-model/entities/Task";
import UserRepository from "../../repository/localstorage/UserRepository";
import User, { UserRole } from "@savenkorodion/webapp-model/entities/User";
import { useState } from "react";
import TaskRepository from "../../repository/localstorage/TaskRepository";
import TaskDeleteDialog from "./TaskDeleteDialog";
import TaskEditDialog from "./TaskEditDialog";
import Story from "@savenkorodion/webapp-model/entities/Story";
import StoryRepository from "../../repository/localstorage/StoryRepository";
import { useParams } from "react-router-dom";
import IReadRepository from "@savenkorodion/repository-interfaces/sync/IReadRepository";
import ICrudRepository from "@savenkorodion/repository-interfaces/sync/ICrudRepository";

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const userRepository: IReadRepository<User> = new UserRepository();

  const userList = userRepository
    .getAll()
    .filter((e) => e.role !== UserRole.Admin);

  const taskOwner = userList.filter((e) => e.id === task.ownerUserId)[0];

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

  const taskRepository: ICrudRepository<Task> = new TaskRepository();

  const handleDelete = () => {
    taskRepository.delete(task.id);
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
  const storyRepository: ICrudRepository<Story> = new StoryRepository();
  const storyList = storyRepository
    .getAll()
    .filter((e) => e.projectId === projectId);

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
          id={task.id}
          name={task.name}
        />
      )}
      {isEditDialogOpen && (
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
