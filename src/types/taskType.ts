export interface TaskType {
  id: number;
  title: string;
  description: string;
  status: "done" | "in progress";
}
