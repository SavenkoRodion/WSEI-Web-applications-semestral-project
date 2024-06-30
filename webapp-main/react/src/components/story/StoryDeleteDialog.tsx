import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";

type StoryDeleteDialogProps = {
  id: string;
  name: string;
  onClose: () => void;
  onDelete: (id: string) => void;
};

const StoryDeleteDialog = ({
  id,
  name,
  onClose,
  onDelete,
}: StoryDeleteDialogProps) => {
  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Story delete</DialogTitle>
      <DialogContent>
        Are you sure you want to delete story: {name}?
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

export default StoryDeleteDialog;
