import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { grey } from "@mui/material/colors";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { enGB } from "date-fns/locale";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export type TBaselineContext = {
  isDarkTheme: boolean;
  setIsDarkTheme: (isDarkTheme: boolean) => void;
};

const BaselineLayout = () => {
  const fromStorage: boolean = JSON.parse(
    localStorage.getItem("react_theme") ?? "false"
  );

  const [isDarkTheme, setIsDarkTheme] = useState(fromStorage);

  useEffect(() => {
    localStorage.setItem("react_theme", JSON.stringify(isDarkTheme));
  }, [isDarkTheme]);

  const theme = createTheme({
    palette: {
      secondary: {
        main: isDarkTheme ? grey[900] : grey[300],
      },
      mode: isDarkTheme ? "dark" : "light",
    },
  });

  const context: TBaselineContext = {
    isDarkTheme: isDarkTheme,
    setIsDarkTheme: setIsDarkTheme,
  };

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
          <Outlet context={context} />
        </LocalizationProvider>
      </ThemeProvider>
    </Box>
  );
};

export default BaselineLayout;
