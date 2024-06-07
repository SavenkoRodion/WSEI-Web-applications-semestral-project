class Story {
  id: string;
  name: string;
  description: string;
  priority: StoryPriority;
  projectId: string;
  dateOfCreation: Date;
  status: Status;
  ownerUserId: string;

  constructor(
    id: string,
    name: string,
    description: string,
    priority: StoryPriority,
    projectId: string,
    dateOfCreation: Date,
    status: Status,
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

export enum Status {
  Todo,
  Doing,
  Done,
}

export default Story;
