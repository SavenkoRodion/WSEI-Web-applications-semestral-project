import {
  CreateTaskRequest,
  TaskPriority,
  TaskStatus,
} from "@savenkorodion/webapp-model/entities/Task";

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
  }: CreateTaskRequest) {
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
