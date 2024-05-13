import { Dialog, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// type ProjectEditDialogProps = {
//   isOpen: boolean;
// };

const ProjectEditDialog = () => {
  return (
    <Dialog
      open
      onClose={() => {
        console.log("lol");
      }}
    >
      <DialogTitle>
        Lolek
        <IconButton
          aria-label="close"
          onClick={() => {
            console.log("lol");
          }}
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
    </Dialog>
  );
};

export default ProjectEditDialog;
