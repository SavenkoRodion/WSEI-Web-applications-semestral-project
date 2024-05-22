import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";

type ProjectDeleteDialogProps = {
  id: string;
  name: string;
  onClose: () => void;
  onDelete: (id: string) => void;
};

const ProjectDeleteDialog = ({
  id,
  name,
  onClose,
  onDelete,
}: ProjectDeleteDialogProps) => {
  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Project delete</DialogTitle>
      <DialogContent>
        Are you sure you want to delete project: {name}?
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

export default ProjectDeleteDialog;
