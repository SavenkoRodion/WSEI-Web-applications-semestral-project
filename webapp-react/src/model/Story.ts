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
    id: string,
    name: string,
    description: string,
    priority: StoryPriority,
    projectId: string,
    dateOfCreation: Date,
    status: StoryStatus,
    ownerUserId: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.projectId = projectId;
    this.dateOfCreation = dateOfCreation;
    this.status = status;
    this.ownerUserId = ownerUserId;
  }
}

export enum StoryPriority {
  Low,
  Mid,
  High,
}

export const StoryPriorityValues = {
  Low: StoryPriority.Low,
  Mid: StoryPriority.Mid,
  High: StoryPriority.High,
};

export enum StoryStatus {
  Todo,
  Doing,
  Done,
}

export const StoryStatusValues = {
  Todo: StoryStatus.Todo,
  Doing: StoryStatus.Doing,
  Done: StoryStatus.Done,
};
