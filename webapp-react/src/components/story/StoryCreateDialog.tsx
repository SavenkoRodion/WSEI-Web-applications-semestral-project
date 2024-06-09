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
  StoryPriority,
  StoryPriorityValues,
  StoryStatus,
  StoryStatusValues,
} from "../../model/Story";
import { User } from "../../model/User";

type CreateDialogProps = {
  onClose: () => void;
  onCreate: (name: string, description: string) => void;
  userList: User[];
};

const StoryCreateDialog = ({
  onClose,
  onCreate,
  userList,
}: CreateDialogProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<StoryPriority>(StoryPriority.Mid);
  const [status, setStatus] = useState<StoryStatus>(StoryStatus.Todo);
  const [user, setUser] = useState<User | null>(null);

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Create a Project story</DialogTitle>
      <DialogContent>
        <Stack gap="15px" width="500px" sx={{ marginTop: "5px" }}>
          <TextField
            label="Story name"
            value={name}
            onChange={(e) => {
              setName(e.target.value.trim());
            }}
            size="small"
            required
          />
          <TextField
            label="Story description"
            value={description}
            onChange={(e) => setDescription(e.target.value.trim())}
            size="small"
            required
          />
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
              <MenuItem value={value}>{key}</MenuItem>
            ))}
          </TextField>
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
              <MenuItem value={value}>{key}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Owner"
            value={user}
            size={"small"}
            onChange={(e) => {
              setUser(e.target.value as unknown as User);
            }}
            required
            select
          >
            {userList.map((e) => (
              <MenuItem value={e.id}>{`${e.firstName} ${e.lastName}`}</MenuItem>
            ))}
          </TextField>
        </Stack>
      </DialogContent>
      <DialogContent>
        <Stack direction="row" justifyContent="space-between">
          <Button onClick={onClose}>Close</Button>
          <Button
            onClick={() => onCreate(name, description)}
            variant="contained"
            disabled={!name || !description}
          >
            Create
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default StoryCreateDialog;
