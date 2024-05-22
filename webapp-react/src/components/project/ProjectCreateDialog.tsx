import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";

type ProjectCreateDialogProps = {
  onClose: () => void;
  onCreate: (name: string, description: string) => void;
};

const ProjectCreateDialog = ({
  onClose,
  onCreate,
}: ProjectCreateDialogProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Project create</DialogTitle>
      <DialogContent>
        <Stack gap="15px" width="500px" sx={{ marginTop: "5px" }}>
          <TextField
            label="Project name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            size="small"
          />
          <TextField
            label="Project description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            size="small"
          />
        </Stack>
      </DialogContent>
      <DialogContent>
        <Stack direction="row" justifyContent="space-between">
          <Button onClick={onClose}>Close</Button>
          <Button
            onClick={() => onCreate(name, description)}
            variant="contained"
          >
            Create
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectCreateDialog;
