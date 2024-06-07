import { AppBar, Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

export const ProjectPageLayout = () => {
  return (
    <>
      <AppBar position="sticky">
        <Toolbar variant="dense"></Toolbar>
      </AppBar>
      <Box>
        <Outlet />
      </Box>
    </>
  );
};
