import { setupStore } from "./store/store";
import { drawToDoList } from "./drawToDoList";

export function statusFilter(e: Event) {
  const taskList = <HTMLDivElement>document.querySelector(".taskList");
  const clickedEl = e.target as HTMLInputElement;
  let curState = setupStore.getState();

  if (clickedEl.value === "onlyDone") {
    const tasks = curState.tasks.filter((task) => task.status === "done");
    curState = { ...curState, tasks };
    drawToDoList(taskList, curState);
  }
  if (clickedEl.value === "inProgress") {
    const tasks = curState.tasks.filter(
      (task) => task.status === "in progress"
    );
    curState = { ...curState, tasks };
    drawToDoList(taskList, curState);
  }
  if (clickedEl.value === "allTasks") {
    drawToDoList(taskList, curState);
  }
}
