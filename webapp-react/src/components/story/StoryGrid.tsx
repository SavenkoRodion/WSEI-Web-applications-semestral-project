import { Box, Stack, Typography } from "@mui/material";
import styles from "./styles";
import StoryCard from "./StoryCard";

type StoryGridProps = {
  data: unknown[];
};

const StoryGrid = ({ data }: StoryGridProps) => {
  return (
    <Box>
      <Box
        display={"flex"}
        flexDirection={"row"}
        gap={"3px"}
        justifyContent={"space-between"}
        sx={{ height: "35px" }}
      >
        <Stack sx={[styles.header]}>
          <Typography>TO DO</Typography>
        </Stack>
        <Stack sx={[styles.header]}>
          <Typography>IN PROGRESS</Typography>
        </Stack>
        <Stack sx={[styles.header]}>
          <Typography>DONE</Typography>
        </Stack>
      </Box>
      <Box
        display={"flex"}
        height={"100vh"}
        gap={"3px"}
        justifyContent={"space-between"}
        flexDirection={"row"}
      >
        <Box sx={[styles.column, { padding: "10px" }]} flexDirection={"column"}>
          {data.map(() => (
            <Stack sx={{ mb: "10px" }}>
              <StoryCard />
            </Stack>
          ))}
        </Box>
        <Box sx={[styles.column]}></Box>
        <Box sx={[styles.column]}></Box>
      </Box>
    </Box>
  );
};

export default StoryGrid;
