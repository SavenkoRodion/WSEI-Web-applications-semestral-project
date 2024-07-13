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
import User, { UserRole } from "@savenkorodion/webapp-model/entities/User";
import { useEffect, useState } from "react";
import StoryDeleteDialog from "./StoryDeleteDialog";
import StoryEditDialog from "./StoryEditDialog";
import IAsyncCrudRepository from "../../repository/interfaces/async/IAsyncCrudRepository";
import StoryRepository from "../../repository/backend/StoryRepository";
import CreateStoryRequest from "@savenkorodion/webapp-model/requests/CreateStoryRequest";
import UserRepository from "../../repository/backend/UserRepository";

type StoryCardProps = {
  story: Story;
};

const StoryCard = ({ story }: StoryCardProps) => {
  const userRepository = new UserRepository();

  const [userList, setUserList] = useState<User[] | undefined>(undefined);

  useEffect(() => {
    userRepository
      .getAll()
      .then((e) => setUserList(e.filter((e) => e.role !== UserRole.Admin)));
  }, []);

  const [storyOwner, setStoryOwner] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (userList?.length) {
      setStoryOwner(userList.filter((e) => e._id === story.ownerUserId)[0]);
    }
  }, [userList]);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteDialogOpen = () => {
    setIsDeleteDialogOpen(true);
  };

  const storyRepository: IAsyncCrudRepository<CreateStoryRequest, Story> =
    new StoryRepository();

  const handleDelete = () => {
    storyRepository.delete(story._id);
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
            {storyOwner
              ? `Owner: ${storyOwner!.firstName} ${storyOwner!.lastName}`
              : "Loading..."}
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
          id={story._id}
          name={story.name}
        />
      )}
      {isEditDialogOpen && userList?.length && (
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
