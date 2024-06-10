export type TaskParameters = {
  name: string;
  storyId: string;
  priority: TaskPriority;
  projectId: string;
  timeEstimationInDays: number | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
  ownerUserId: string | undefined;
};

export class Task {
  id: string;
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
  constructor({
    name,
    storyId,
    priority,
    projectId,
    timeEstimationInDays = undefined,
    startDate = undefined,
    endDate = undefined,
    ownerUserId = undefined,
  }: TaskParameters) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.storyId = storyId;
    this.priority = priority;
    this.projectId = projectId;
    this.timeEstimationInDays = timeEstimationInDays;
    this.status = TaskStatus.Todo;
    this.creationDate = new Date();
    this.startDate = startDate;
    this.endDate = endDate;
    this.ownerUserId = ownerUserId;
  }
}

export enum TaskPriority {
  Low,
  Mid,
  High,
}

export const TaskPriorityValues = {
  Low: TaskPriority.Low,
  Mid: TaskPriority.Mid,
  High: TaskPriority.High,
};

export enum TaskStatus {
  Todo,
  Doing,
  Done,
}

export const TaskStatusValues = {
  Todo: TaskStatus.Todo,
  Doing: TaskStatus.Doing,
  Done: TaskStatus.Done,
};
