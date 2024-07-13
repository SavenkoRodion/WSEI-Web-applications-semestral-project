import { Outlet, useOutletContext } from "react-router-dom";
import { TBaselineContext } from "./BaselineLayout";
import ThemeSwitch from "./ThemeSwitch";
import { AppBar, Box, Link, Stack, Toolbar, Typography } from "@mui/material";

const AnonLayout = () => {
  const baselineContext: TBaselineContext = useOutletContext();
  return (
    <>
      <AppBar position="sticky">
        <Toolbar
          variant="dense"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Stack flexDirection={"row"}>
            <Typography>
              <Link
                href="/"
                sx={{ color: "white", textDecoration: "underline" }}
              >
                Home
              </Link>
            </Typography>
          </Stack>
          <Stack>
            <ThemeSwitch
              isDarkTheme={baselineContext.isDarkTheme}
              setIsDarkTheme={baselineContext.setIsDarkTheme}
            />
          </Stack>
        </Toolbar>
      </AppBar>
      <Box>
        <Outlet />
      </Box>
    </>
  );
};

export default AnonLayout;
