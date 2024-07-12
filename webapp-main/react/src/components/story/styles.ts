import { SxProps } from "@mui/material";

const grid: SxProps = {
  marginBottom: "5px",
  height: "auto",
  display: "flex",
  gap: "3px",
};

const header: SxProps = {
  width: "100%",
  textAlign: "center",
  alignSelf: "center",
};

const column: SxProps = {
  width: "100%",
  padding: "10px",
  gap: "10px",
  display: "flex",
  flexDirection: "column",
  bgcolor: "secondary.main",
};

const styles = {
  grid,
  header,
  column,
};

export default styles;
