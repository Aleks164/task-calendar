import { addTask, drawTasksList } from "./crudTask";
import { setupStore } from "../../store/store";
import { taskSlice } from "../../store/reducers/taskSlicer";
import { drawToDoList } from "./drawToDoList";
import { requestTaskFromFB } from "./requestTaskFromFB";
import { tasksSortFilter } from "./tasksSortFilter";
import { selectInfoRender } from "./selectInfoRender";

export async function app() {
  const taskForm = document.querySelector("form");
  const checkStatusBlock = <HTMLDivElement>(
    document.querySelector("#checkStatusBlock")
  );
  const onlyToday = <HTMLInputElement>(
    document.querySelector("#onlyToday input")
  );
  const fuzzySelect = <HTMLSelectElement>(
    document.querySelector("#fuzzy select")
  );
  const fuzzyInput = <HTMLInputElement>document.querySelector("#fuzzyInput");

  const state = setupStore.getState();

  drawToDoList(tasksSortFilter());

  setupStore.subscribe(drawTasksList);

  if (!state.isLoading) {
    setupStore.dispatch(
      taskSlice.actions.dateFromFBisLoaded(await requestTaskFromFB())
    );
  }

  fuzzyInput.placeholder = `Search by Title`;
  fuzzySelect.addEventListener("change", selectInfoRender);
  fuzzyInput.addEventListener("input", () => drawToDoList(tasksSortFilter()));

  checkStatusBlock.addEventListener("click", () => {
    fuzzyInput.value = "";
    drawToDoList(tasksSortFilter());
  });

  taskForm?.addEventListener("submit", addTask);

  onlyToday?.addEventListener("change", () => {
    fuzzyInput.value = "";
    drawToDoList(tasksSortFilter());
  });
}
