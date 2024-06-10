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
import { User } from "../../model/User";
import { Story } from "../../model/Story";
import { DatePicker } from "@mui/x-date-pickers";

type TaskCreateDialogProps = {
  onClose: () => void;
  onCreate: (
    name: string,
    storyId: string,
    timeEstimationInDays?: number,
    startDate?: Date,
    endDate?: Date,
    ownerUserId?: string
  ) => void;
  userList: User[];
  storyList: Story[];
};

const TaskCreateDialog = ({
  onClose,
  onCreate,
  userList,
  storyList,
}: TaskCreateDialogProps) => {
  const [name, setName] = useState("");
  const [storyId, setStoryId] = useState<string | undefined>();
  const [timeEstimation, setTimeEstimation] = useState<number | undefined>();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [userId, setUserId] = useState<string | undefined>();

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
          <Divider>Optional parameters</Divider>
          <DatePicker
            label="Start date"
            slotProps={{ textField: { size: "small" } }}
            value={startDate}
            onChange={(e) => {
              if (e === null) setStartDate(null);
              else if (e >= new Date(new Date().toDateString()))
                setStartDate(e);
              console.log(startDate);
            }}
            minDate={new Date()}
            closeOnSelect
          />
          <DatePicker
            label="End date"
            slotProps={{ textField: { size: "small" } }}
            value={endDate}
            onChange={(e) => {
              if (e === null) setEndDate(null);
              else if (e >= new Date()) setEndDate(e);
              console.log(startDate);
            }}
            disabled={!startDate}
            minDate={startDate ?? new Date()}
            closeOnSelect
          />
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
      </DialogContent>
      <DialogContent>
        <Stack direction="row" justifyContent="space-between">
          <Button onClick={onClose}>Close</Button>
          <Button
            onClick={() =>
              onCreate(
                name,
                storyId!,
                timeEstimation,
                startDate ?? undefined,
                endDate ?? undefined,
                userId
              )
            }
            variant="contained"
            disabled={!name.trim() || !storyId || !userId}
          >
            Create
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default TaskCreateDialog;
