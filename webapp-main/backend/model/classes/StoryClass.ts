import {
  StoryPriority,
  StoryStatus,
} from "@savenkorodion/webapp-model/entities/Story";
import CreateStoryRequest from "@savenkorodion/webapp-model/requests/CreateStoryRequest";

export default class StoryClass {
  name: string;
  description: string;
  priority: StoryPriority;
  projectId: string;
  dateOfCreation: Date;
  status: StoryStatus;
  ownerUserId: string;

  constructor({
    name,
    description,
    priority,
    projectId,
    status,
    ownerUserId,
  }: CreateStoryRequest) {
    this.name = name.trim();
    this.description = description.trim();
    this.priority = priority;
    this.projectId = projectId;
    this.dateOfCreation = new Date();
    this.status = status;
    this.ownerUserId = ownerUserId;
  }
}
