import { Crud } from "../../firebase_init/CRUD";
import { TaskType } from "../../types/taskType";
import { curDate } from "./curDate";

const сrud = new Crud();

export async function requestTaskFromFB() {
  const taskFromBase = await сrud.getData();
  if (typeof taskFromBase === "string") {
    console.error(taskFromBase);
    return [
      {
        date: curDate(),
        description: "Try again later",
        id: 404,
        status: "in progress",
        title: "taskFromBase",
      } as TaskType,
    ];
  }
  const arrayTasks: TaskType[] = [];
  const taskEntries = Object.entries(taskFromBase);
  taskEntries.forEach(([, task]) => {
    arrayTasks.push(task);
  });
  return arrayTasks;
}
