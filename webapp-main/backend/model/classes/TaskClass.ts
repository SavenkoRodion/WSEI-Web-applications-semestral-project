import CreateTaskRequest from "@savenkorodion/webapp-model/requests/CreateTaskRequest";
import { TaskPriority, TaskStatus } from "../TaskObjects";

export default class TaskClass {
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
    timeEstimationInDays,
    startDate,
    endDate,
    ownerUserId,
  }: CreateTaskRequest) {
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
