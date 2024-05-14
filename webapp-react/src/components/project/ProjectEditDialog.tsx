import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Project } from "../../model/Project";

type ProjectEditDialogProps = {
  project: Project;
  onClose: () => void;
};

const ProjectEditDialog = ({ project, onClose }: ProjectEditDialogProps) => {
  return (
    <Dialog open onClose={onClose} fullWidth>
      <DialogTitle>
        Lolek
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack>
          <Typography>Project id: {project.id}</Typography>
        </Stack>
        <Stack>
          <OutlinedInput
            value={project.name}
            label="Project name"
            size="small"
          />
        </Stack>
        <Stack>
          <OutlinedInput
            value={project.description}
            label="Project description"
            size="small"
          />
        </Stack>
        <Stack>
          <Button onClick={onClose}>Cancel</Button>
          <Button>Save</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectEditDialog;
