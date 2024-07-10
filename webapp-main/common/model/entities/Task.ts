import { TaskStatus, TaskPriority } from "./TaskObjects";

type Task = {
  _id: string;
  name: string;
  priority: TaskPriority;
  timeEstimationInDays?: number;
  status: TaskStatus;
  creationDate: Date;
  startDate?: Date;
  endDate?: Date;
  ownerUserId?: string;
  projectId: string;
  storyId: string;
};

export default Task;
