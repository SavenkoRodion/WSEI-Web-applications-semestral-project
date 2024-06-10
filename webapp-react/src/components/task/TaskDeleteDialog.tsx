import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";

type TaskDeleteDialogProps = {
  id: string;
  name: string;
  onClose: () => void;
  onDelete: (id: string) => void;
};

const TaskDeleteDialog = ({
  id,
  name,
  onClose,
  onDelete,
}: TaskDeleteDialogProps) => {
  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Task delete</DialogTitle>
      <DialogContent>
        Are you sure you want to delete task: {name}?
      </DialogContent>
      <DialogContent>
        <Stack justifyContent="space-between" direction="row" width="500px">
          <Button onClick={onClose}>Close</Button>
          <Button
            onClick={() => onDelete(id)}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDeleteDialog;
