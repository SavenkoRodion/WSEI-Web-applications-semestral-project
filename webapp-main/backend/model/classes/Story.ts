import {
  StoryPriority,
  StoryStatus,
} from "@savenkorodion/webapp-model/entities/Story";

export class Story {
  id: string;
  name: string;
  description: string;
  priority: StoryPriority;
  projectId: string;
  dateOfCreation: Date;
  status: StoryStatus;
  ownerUserId: string;

  constructor(
    name: string,
    description: string,
    priority: StoryPriority,
    projectId: string,
    status: StoryStatus,
    ownerUserId: string
  ) {
    this.id = crypto.randomUUID();
    this.name = name.trim();
    this.description = description.trim();
    this.priority = priority;
    this.projectId = projectId;
    this.dateOfCreation = new Date();
    this.status = status;
    this.ownerUserId = ownerUserId;
  }
}
