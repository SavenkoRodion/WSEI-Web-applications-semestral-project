import { Box, Stack, Typography } from "@mui/material";
import styles from "./styles";
import StoryCard from "./StoryCard";
import Story from "@savenkorodion/webapp-model/entities/Story";
import Task from "@savenkorodion/webapp-model/entities/Task";
import TaskCard from "../task/TaskCard";
import { TaskStatus } from "@savenkorodion/webapp-model/entities/TaskObjects";
import User from "@savenkorodion/webapp-model/entities/User";

type StoryGridProps = {
  stories: Story[];
  tasks: Task[];
  users: User[];
};

const StoryGrid = ({ stories, tasks, users }: StoryGridProps) => {
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
      {stories.map((story) => (
        <Box sx={styles.grid} key={story._id}>
          <Box sx={[styles.column]}>
            <Stack key={story._id}>
              <StoryCard story={story} />
            </Stack>
          </Box>
          <Box sx={[styles.column]}>
            {tasks
              .filter(
                (e) => e.status === TaskStatus.Todo && e.storyId === story._id
              )
              .map((e) => (
                <TaskCard task={e} userList={users} storyList={stories} />
              ))}
          </Box>
          <Box sx={[styles.column]}>
            {tasks
              .filter(
                (e) => e.status === TaskStatus.Doing && e.storyId === story._id
              )
              .map((e) => (
                <TaskCard task={e} userList={users} storyList={stories} />
              ))}
          </Box>
          <Box sx={[styles.column]}>
            {tasks
              .filter(
                (e) => e.status === TaskStatus.Done && e.storyId === story._id
              )
              .map((e) => (
                <TaskCard task={e} userList={users} storyList={stories} />
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
