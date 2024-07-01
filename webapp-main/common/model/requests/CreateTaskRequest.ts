import { TaskPriority } from "../entities/Task";

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
