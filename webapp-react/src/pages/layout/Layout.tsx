import {
  AppBar,
  Box,
  CssBaseline,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <Typography variant="h5">
            <Link
              href="/project"
              sx={{ color: "white", textDecoration: "underline" }}
            >
              Project
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
