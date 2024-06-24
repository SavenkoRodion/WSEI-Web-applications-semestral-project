import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Story } from "../../model/Story";
import { TaskPriority, TaskPriorityValues } from "../../model/Task";

type TaskCreateDialogProps = {
  onClose: () => void;
  onCreate: (
    name: string,
    storyId: string,
    priority: TaskPriority,
    timeEstimationInDays?: number
  ) => void;
  storyList: Story[];
};

const TaskCreateDialog = ({
  onClose,
  onCreate,
  storyList,
}: TaskCreateDialogProps) => {
  const [name, setName] = useState("");
  const [storyId, setStoryId] = useState<string | undefined>();
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.Mid);
  const [timeEstimation, setTimeEstimation] = useState<number | undefined>();

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Create a task</DialogTitle>
      <DialogContent>
        <Stack gap="15px" width="500px" sx={{ marginTop: "5px" }}>
          <TextField
            label="Task name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            size="small"
            required
          />
          <TextField
            label="Story"
            value={storyId}
            size={"small"}
            onChange={(e) => {
              setStoryId(e.target.value);
            }}
            required
            select
          >
            {storyList.map((e) => (
              <MenuItem
                value={e.id}
                key={e.id}
              >{`${e.name} - ${e.description}`}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Priority"
            value={priority}
            size="small"
            onChange={(e) => {
              setPriority(e.target.value as unknown as TaskPriority);
            }}
            required
            select
          >
            {Object.entries(TaskPriorityValues).map(([key, value]) => (
              <MenuItem value={value} key={key}>
                {key}
              </MenuItem>
            ))}
          </TextField>
          <Divider>Optional parameters</Divider>
          <TextField
            label="Time estimation in business days"
            value={timeEstimation}
            onChange={(e) =>
              setTimeEstimation(e.target.value as unknown as number)
            }
            size="small"
            type="number"
          />
        </Stack>
      </DialogContent>
      <DialogContent>
        <Stack direction="row" justifyContent="space-between">
          <Button onClick={onClose}>Close</Button>
          <Button
            onClick={() => onCreate(name, storyId!, priority, timeEstimation)}
            variant="contained"
            disabled={!name.trim() || !storyId}
          >
            Create
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default TaskCreateDialog;
