import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Task, {
  TaskPriority,
  TaskPriorityValues,
  TaskStatus,
} from "@savenkorodion/webapp-model/entities/Task";
import User from "@savenkorodion/webapp-model/entities/User";
import { DatePicker } from "@mui/x-date-pickers";
import Story from "@savenkorodion/webapp-model/entities/Story";

type TaskEditDialogProps = {
  onClose: () => void;
  onEdit: (task: Task) => void;
  task: Task;
  userList: User[];
  storyList: Story[];
};

const TaskEditDialog = ({
  onClose,
  onEdit,
  task,
  userList,
  storyList,
}: TaskEditDialogProps) => {
  const [name, setName] = useState(task.name);
  const [storyId, setStoryId] = useState<string>(task.storyId);
  const [priority, setPriority] = useState<TaskPriority>(task.priority);
  const [timeEstimation, setTimeEstimation] = useState<number | undefined>(
    task.timeEstimationInDays
  );
  const [startDate, setStartDate] = useState<Date | null>(
    task.startDate ?? null
  );
  const [endDate, setEndDate] = useState<Date | null>(task.endDate ?? null);
  const [userId, setUserId] = useState<string | undefined>(task.ownerUserId);

  const editedTask = task;

  const getEditedTask = () => {
    editedTask.name = name;
    editedTask.storyId = storyId;
    editedTask.priority = priority;
    editedTask.timeEstimationInDays = timeEstimation;
    editedTask.startDate = startDate ?? undefined;
    editedTask.endDate = endDate ?? undefined;
    editedTask.ownerUserId = userId;
    return editedTask;
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Task update</DialogTitle>
      <DialogContent>
        <Stack gap="15px" width="500px" sx={{ marginTop: "5px" }}>
          <Stack>
            <TextField label="Task id" value={task.id} size="small" disabled />
          </Stack>
          <Stack>
            <TextField
              label="Task name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              size="small"
              required
            />
          </Stack>
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
            label="Owner"
            value={userId}
            size={"small"}
            onChange={(e) => {
              setUserId(e.target.value);
              if (e.target.value !== undefined)
                editedTask.status = TaskStatus.Doing;
              else if (e.target.value === undefined)
                editedTask.status = TaskStatus.Todo;
            }}
            select
          >
            <MenuItem value={undefined}>Unassigned</MenuItem>
            {userList.map((e) => (
              <MenuItem
                value={e.id}
                key={e.id}
              >{`${e.firstName} ${e.lastName}`}</MenuItem>
            ))}
          </TextField>
          <DatePicker
            label="Start date"
            slotProps={{ textField: { size: "small" } }}
            value={startDate}
            onChange={(e) => {
              if (e === null) setStartDate(null);
              else if (e >= new Date(new Date().toDateString()))
                setStartDate(e);
            }}
            minDate={new Date()}
            closeOnSelect
            disabled
          />
          <DatePicker
            label="End date"
            slotProps={{ textField: { size: "small" } }}
            value={endDate}
            onChange={(e) => {
              if (e === null) setEndDate(null);
              else if (e >= new Date()) setEndDate(e);
            }}
            disabled
            minDate={startDate ?? new Date()}
            closeOnSelect
          />
          <Stack>
            <TextField
              label="Estimation"
              value={timeEstimation}
              onChange={(e) =>
                setTimeEstimation(e.target.value as unknown as number)
              }
              size="small"
              type="number"
            />
          </Stack>
          <Divider />
          <Stack>
            <Typography>
              Created: {new Date(task.creationDate).toLocaleDateString("en-GB")}
            </Typography>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogContent>
        <Stack direction="row" justifyContent="space-between">
          <Button onClick={onClose}>Close</Button>
          <Button
            onClick={() => onEdit(getEditedTask())}
            variant="contained"
            disabled={!name.trim() || !storyId}
          >
            Update
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default TaskEditDialog;
