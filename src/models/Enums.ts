export enum TaskStatus {
  NOT_STARTED = 0,
  IN_PROGRESS = 1,
  COMPLETED = 2
}

export enum TaskPriority {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2
}

// display functions to convert numeric enums to display strings
export const getTaskStatusLabel = (status: TaskStatus): string => {
  switch (status) {
    case TaskStatus.NOT_STARTED: return 'Not Started';
    case TaskStatus.IN_PROGRESS: return 'In Progress';
    case TaskStatus.COMPLETED: return 'Completed';
    default: return 'Unknown Status';
  }
};

export const getTaskPriorityLabel = (priority: TaskPriority): string => {
  switch (priority) {
    case TaskPriority.LOW: return 'Low';
    case TaskPriority.MEDIUM: return 'Medium';
    case TaskPriority.HIGH: return 'High';
    default: return 'Unknown Priority';
  }
};
