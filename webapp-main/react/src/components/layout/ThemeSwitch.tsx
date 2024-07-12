import { Switch } from "@mui/material";

export type ThemeSwitchProps = {
  isDarkTheme: boolean;
  setIsDarkTheme: (isDarkTheme: boolean) => void;
};

const ThemeSwitch = ({ isDarkTheme, setIsDarkTheme }: ThemeSwitchProps) => {
  return (
    <Switch
      value={isDarkTheme}
      onChange={(e) => {
        setIsDarkTheme(e.target.checked);
      }}
      defaultChecked={isDarkTheme}
      color="info"
    />
  );
};

export default ThemeSwitch;
