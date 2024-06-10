import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Task, TaskPriority, TaskStatus } from "../../model/Task";
import IReadRepository from "../../repository/interfaces/IReadRepository";
import UserRepository from "../../repository/UserRepository";
import { User } from "../../model/User";
import { useState } from "react";
import TaskRepository from "../../repository/TaskRepository";
import IRepository from "../../repository/interfaces/IRepository";
import TaskDeleteDialog from "./TaskDeleteDialog";

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const userRepository: IReadRepository<User> = new UserRepository();

  const userList = userRepository.getAll();

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

  const taskRepository: IRepository<Task> = new TaskRepository();

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

          {/* <Typography>{task.}</Typography>
          <Typography sx={{ mt: 1.5 }} color="text.secondary">
            {`Status: ${TaskStatus[task.status]}`}
          </Typography>
          <Typography color="text.secondary">
            {`Priority: ${TaskPriority[task.priority]}`}
          </Typography>
          <Typography color="text.secondary">
            {`Created: ${new Date(task.dateOfCreation).toLocaleDateString(
              "en-GB"
            )}`}
          </Typography> */}
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleEditDialogOpen}>
            Details
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
        // <TaskEditDialog
        //   onClose={handleEditDialogClose}
        //   onEdit={handleEdit}
        //   task={task}
        //   userList={userList}
        // />
        <></>
      )}
    </>
  );
};

export default TaskCard;
