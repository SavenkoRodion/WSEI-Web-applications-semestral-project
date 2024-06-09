import { Box, Stack, Typography } from "@mui/material";
import styles from "./styles";
import StoryCard from "./StoryCard";
import { Story } from "../../model/Story";

type StoryGridProps = {
  data: Story[];
};

const StoryGrid = ({ data }: StoryGridProps) => {
  return (
    <Box>
      {!!data.length && (
        <Box display={"flex"} gap={"3px"} sx={{ height: "35px" }}>
          <Stack sx={[styles.header]}>
            <Typography>STORIES</Typography>
          </Stack>
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
      )}
      {data.map((e) => (
        <Box sx={styles.grid}>
          <Box sx={[styles.column]}>
            <Stack key={e.id}>
              <StoryCard story={e} />
            </Stack>
          </Box>
          <Box sx={[styles.column]}></Box>
          <Box sx={[styles.column]}></Box>
          <Box sx={[styles.column]}></Box>
        </Box>
      ))}
      {!data.length && (
        <Box display={"flex"} justifyContent={"center"}>
          <Typography>This project has no stories!</Typography>
        </Box>
      )}
    </Box>
  );
};

export default StoryGrid;
