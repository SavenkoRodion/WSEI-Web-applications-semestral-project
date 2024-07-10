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
