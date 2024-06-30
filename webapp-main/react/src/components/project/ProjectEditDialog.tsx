import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Project } from "../../model/Project";
import { useState } from "react";

type ProjectEditDialogProps = {
  project: Project;
  onClose: () => void;
  onSave: (project: Project) => void;
};

const ProjectEditDialog = ({
  project,
  onClose,
  onSave,
}: ProjectEditDialogProps) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);

  return (
    <Dialog open onClose={onClose} fullWidth>
      <DialogTitle>
        Project edit
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <Stack>
            <Typography>Project id: {project.id}</Typography>
          </Stack>
          <Stack>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value.trim())}
              placeholder="Project name"
              label="Project name"
              size="small"
            />
          </Stack>
          <Stack>
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value.trim())}
              label="Project description"
              size="small"
            />
          </Stack>
        </Box>

        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ marginTop: "15px" }}
        >
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              onSave({ id: project.id, name: name, description: description })
            }
            disabled={!name || !description}
          >
            Save
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectEditDialog;
