import { Box, Stack, Typography } from "@mui/material";
import styles from "./styles";
import StoryCard from "./StoryCard";
import { Story } from "../../model/Story";
import { Task, TaskStatus } from "../../model/Task";

type StoryGridProps = {
  stories: Story[];
  tasks: Task[];
};

const StoryGrid = ({ stories, tasks }: StoryGridProps) => {
  return (
    <Box>
      {!!stories.length && (
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
      {stories.map((e) => (
        <Box sx={styles.grid}>
          <Box sx={[styles.column]}>
            <Stack key={e.id}>
              <StoryCard story={e} />
            </Stack>
          </Box>
          <Box sx={[styles.column]}>
            {tasks
              .filter((e) => e.status === TaskStatus.Todo)
              .map((e) => (
                <>{e.name}</>
              ))}
          </Box>
          <Box sx={[styles.column]}>
            {tasks
              .filter((e) => e.status === TaskStatus.Doing)
              .map((e) => (
                <>{e.name}</>
              ))}
          </Box>
          <Box sx={[styles.column]}>
            {tasks
              .filter((e) => e.status === TaskStatus.Done)
              .map((e) => (
                <>{e.name}</>
              ))}
          </Box>
        </Box>
      ))}
      {!stories.length && (
        <Box display={"flex"} justifyContent={"center"}>
          <Typography>This project has no stories!</Typography>
        </Box>
      )}
    </Box>
  );
};

export default StoryGrid;
