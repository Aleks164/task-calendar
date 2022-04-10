import { tugleStatusTask } from "./tugleStatusTask";
import { addTask, deleteTask, updateTask, drawTasksList } from "./crudTask";
import { statusFilter } from "./statusFilter";
import { setupStore } from "./store/store";

export function app() {
  const taskForm = document.querySelector("form");
  const checkStatusBlock = <HTMLDivElement>(
    document.querySelector("#checkStatusBlock")
  );

  drawTasksList();

  setupStore.subscribe(drawTasksList);

  checkStatusBlock.addEventListener("click", statusFilter);

  taskForm?.addEventListener("submit", addTask);
}
window.deleteTask = deleteTask;

window.updateTask = updateTask;

window.tugleStatusTask = tugleStatusTask;
