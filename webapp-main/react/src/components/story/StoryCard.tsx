import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Story, {
  StoryPriority,
  StoryStatus,
} from "@savenkorodion/webapp-model/entities/Story";
import UserRepository from "../../repository/localstorage/UserRepository";
import User from "@savenkorodion/webapp-model/entities/User";
import { useState } from "react";
import StoryDeleteDialog from "./StoryDeleteDialog";
import StoryRepository from "../../repository/localstorage/StoryRepository";
import StoryEditDialog from "./StoryEditDialog";
import IReadRepository from "../../repository/interfaces/sync/IReadRepository";
import ICrudRepository from "../../repository/interfaces/sync/ICrudRepository";

type StoryCardProps = {
  story: Story;
};

const StoryCard = ({ story }: StoryCardProps) => {
  const userRepository: IReadRepository<User> = new UserRepository();

  const userList = userRepository.getAll();

  const storyOwner = userList.filter((e) => e.id === story.ownerUserId)[0];

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteDialogOpen = () => {
    setIsDeleteDialogOpen(true);
  };

  const storyRepository: ICrudRepository<Story> = new StoryRepository();

  const handleDelete = () => {
    storyRepository.delete(story.id);
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

  const handleEdit = (editedStory: Story) => {
    storyRepository.replace(editedStory);
    handleDeleteDialogClose();
    window.location.reload();
  };

  return (
    <>
      <Card sx={{ boxShadow: "inset 2px 0px blue" }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {`Owner: ${storyOwner.firstName} ${storyOwner.lastName}`}
          </Typography>
          <Typography variant="h5" component="div">
            {story.name}
          </Typography>

          <Typography>{story.description}</Typography>
          <Typography sx={{ mt: 1.5 }} color="text.secondary">
            {`Status: ${StoryStatus[story.status]}`}
          </Typography>
          <Typography color="text.secondary">
            {`Priority: ${StoryPriority[story.priority]}`}
          </Typography>
          <Typography color="text.secondary">
            {`Created: ${new Date(story.dateOfCreation).toLocaleDateString(
              "en-GB"
            )}`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleEditDialogOpen}>
            Edit
          </Button>
          <Button size="small" onClick={handleDeleteDialogOpen}>
            Delete
          </Button>
        </CardActions>
      </Card>
      {isDeleteDialogOpen && (
        <StoryDeleteDialog
          onClose={handleDeleteDialogClose}
          onDelete={handleDelete}
          id={story.id}
          name={story.name}
        />
      )}
      {isEditDialogOpen && (
        <StoryEditDialog
          onClose={handleEditDialogClose}
          onEdit={handleEdit}
          story={story}
          userList={userList}
        />
      )}
    </>
  );
};

export default StoryCard;
