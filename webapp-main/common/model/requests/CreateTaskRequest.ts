import { TaskPriority } from "../entities/TaskObjects";

type CreateTaskRequest = {
  name: string;
  storyId: string;
  priority: TaskPriority;
  projectId: string;
  timeEstimationInDays: number | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
  ownerUserId: string | undefined;
};

export default CreateTaskRequest;
