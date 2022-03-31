export interface TaskType {
  id: number;
  title: string;
  description: string;
  date: string;
  status: "done" | "in progress";
}

export interface TaskState {
  tasks: TaskType[];
  isLoading: boolean;
  error: string;
}
