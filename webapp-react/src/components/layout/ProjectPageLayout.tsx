import { AppBar, Box, Link, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const ProjectPageLayout = () => {
  return (
    <>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <Typography>
            <Link
              href="/project"
              sx={{ color: "white", textDecoration: "underline" }}
            >
              Project list
            </Link>
          </Typography>
          <Typography>
            <Link
              href="project/create"
              sx={{
                color: "white",
                textDecoration: "underline",
                marginLeft: "16px",
              }}
            >
              Create project
            </Link>
          </Typography>
          <Typography>
            <Link
              href="/project/create"
              sx={{
                color: "white",
                textDecoration: "underline",
                marginLeft: "16px",
              }}
            >
              Selected project: None
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box>
        <Outlet />
      </Box>
    </>
  );
};

export default ProjectPageLayout;
