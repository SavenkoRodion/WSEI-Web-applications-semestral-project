import { Box, Stack, Typography } from "@mui/material";
import styles from "./styles";
import StoryCard from "./StoryCard";
import { Story, StoryStatus } from "../../model/Story";

type StoryGridProps = {
  data: Story[];
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
        <Box sx={[styles.column]} flexDirection={"column"}>
          {data
            .filter((e) => e.status === StoryStatus.Todo)
            .map((e) => (
              <Stack sx={{ mb: "10px" }}>
                <StoryCard story={e} />
              </Stack>
            ))}
        </Box>
        <Box sx={[styles.column]}>
          {data
            .filter((e) => e.status === StoryStatus.Doing)
            .map((e) => (
              <Stack sx={{ mb: "10px" }}>
                <StoryCard story={e} />
              </Stack>
            ))}
        </Box>
        <Box sx={[styles.column]}>
          {data
            .filter((e) => e.status === StoryStatus.Done)
            .map((e) => (
              <Stack sx={{ mb: "10px" }}>
                <StoryCard story={e} />
              </Stack>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default StoryGrid;
