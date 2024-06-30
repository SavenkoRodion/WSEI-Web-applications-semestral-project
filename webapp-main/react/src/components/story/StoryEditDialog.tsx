import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import {
  Story,
  StoryPriority,
  StoryPriorityValues,
  StoryStatus,
  StoryStatusValues,
} from "@savenkorodion/webapp-model/Story";
import { User } from "@savenkorodion/webapp-model/User";

type StoryEditDialogProps = {
  onClose: () => void;
  onEdit: (story: Story) => void;
  story: Story;
  userList: User[];
};

const StoryEditDialog = ({
  onClose,
  onEdit,
  story,
  userList,
}: StoryEditDialogProps) => {
  const [name, setName] = useState(story.name);
  const [description, setDescription] = useState(story.description);
  const [priority, setPriority] = useState<StoryPriority>(story.priority);
  const [status, setStatus] = useState<StoryStatus>(story.status);
  const [userId, setUserId] = useState<string>(story.ownerUserId);

  const editedStory = story;

  const getEditedStory = () => {
    editedStory.name = name;
    editedStory.description = description;
    editedStory.priority = priority;
    editedStory.status = status;
    editedStory.ownerUserId = userId;
    return editedStory;
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Story update</DialogTitle>
      <DialogContent>
        <Stack gap="15px" width="500px" sx={{ marginTop: "5px" }}>
          <TextField
            label="Story name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            size="small"
            required
          />
          <TextField
            label="Story description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            size="small"
            required
          />
          <TextField
            label="Status"
            value={status}
            size={"small"}
            onChange={(e) => {
              setStatus(e.target.value as unknown as StoryStatus);
            }}
            required
            select
          >
            {Object.entries(StoryStatusValues).map(([key, value]) => (
              <MenuItem value={value} key={key}>
                {key}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Priority"
            value={priority}
            size="small"
            onChange={(e) => {
              setPriority(e.target.value as unknown as StoryPriority);
            }}
            required
            select
          >
            {Object.entries(StoryPriorityValues).map(([key, value]) => (
              <MenuItem value={value} key={key}>
                {key}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Owner"
            value={userId}
            size={"small"}
            onChange={(e) => {
              setUserId(e.target.value);
            }}
            required
            select
          >
            {userList.map((e) => (
              <MenuItem
                value={e.id}
                key={e.id}
              >{`${e.firstName} ${e.lastName}`}</MenuItem>
            ))}
          </TextField>
        </Stack>
      </DialogContent>
      <DialogContent>
        <Stack direction="row" justifyContent="space-between">
          <Button onClick={onClose}>Close</Button>
          <Button
            onClick={() => onEdit(getEditedStory())}
            variant="contained"
            disabled={!name.trim() || !description.trim() || !userId}
          >
            Update
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default StoryEditDialog;
