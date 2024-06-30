export type Story = {
  id: string;
  name: string;
  description: string;
  priority: StoryPriority;
  projectId: string;
  dateOfCreation: Date;
  status: StoryStatus;
  ownerUserId: string;
};

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
