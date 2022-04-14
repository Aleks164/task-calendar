import {
  addTask,
  deleteTask,
  updateTask,
  drawTasksList,
  tugleStatusTask,
} from "./crudTask";
import { statusFilter } from "./statusFilter";
import { setupStore } from "./store/store";
import { taskSlice } from "./store/reducers/taskSlicer";
import { drawToDoList } from "./drawToDoList";
import { addFuzzy } from "./fuzzy";
import { requestTaskFromFB } from "./requestTaskFromFB";

export async function app() {
  const taskForm = document.querySelector("form");
  const checkStatusBlock = <HTMLDivElement>(
    document.querySelector("#checkStatusBlock")
  );
  const taskList = <HTMLInputElement>document.querySelector(".taskList");
  const state = setupStore.getState();

  drawToDoList(taskList, state);

  setupStore.subscribe(drawTasksList);

  if (!state.isLoading) {
    setupStore.dispatch(
      taskSlice.actions.dateFromFBisLoaded(await requestTaskFromFB())
    );
  }

  checkStatusBlock.addEventListener("click", statusFilter);

  taskForm?.addEventListener("submit", addTask);

  addFuzzy();
}
window.deleteTask = deleteTask;

window.updateTask = updateTask;

window.tugleStatusTask = tugleStatusTask;
