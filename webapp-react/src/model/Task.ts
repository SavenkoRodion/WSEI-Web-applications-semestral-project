export type TaskParameters = {
  name: string;
  timeEstimationInDays: number | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
  ownerUserId: string | undefined;
  projectId: string;
  storyId: string;
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
    timeEstimationInDays = undefined,
    startDate = undefined,
    endDate = undefined,
    ownerUserId,
    projectId,
    storyId,
  }: TaskParameters) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.priority = TaskPriority.Mid;
    this.timeEstimationInDays = timeEstimationInDays;
    this.status = TaskStatus.Todo;
    this.creationDate = new Date();
    this.startDate = startDate;
    this.endDate = endDate;
    this.ownerUserId = ownerUserId;
    this.projectId = projectId;
    this.storyId = storyId;
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
