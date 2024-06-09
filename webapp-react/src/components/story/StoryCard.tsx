import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Story, StoryPriority } from "../../model/Story";
import IReadRepository from "../../repository/interfaces/IReadRepository";
import UserRepository from "../../repository/UserRepository";
import { User } from "../../model/User";

type StoryCardProps = {
  story: Story;
};

const StoryCard = ({ story }: StoryCardProps) => {
  const userRepository: IReadRepository<User> = new UserRepository();

  const storyOwner = userRepository
    .getAll()
    .filter((e) => e.id === story.ownerUserId)[0];

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {`Owner: ${storyOwner.firstName} ${storyOwner.lastName}`}
        </Typography>
        <Typography variant="h5" component="div">
          {story.name}
        </Typography>

        <Typography>{story.description}</Typography>
        <Typography sx={{ mt: 1.5 }} color="text.secondary">
          {`Priority: ${StoryPriority[story.priority]}`}
        </Typography>
        <Typography color="text.secondary">
          {`Created: ${new Date(story.dateOfCreation).toLocaleDateString(
            "en-GB"
          )}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Card edit</Button>
      </CardActions>
    </Card>
  );
};

export default StoryCard;
