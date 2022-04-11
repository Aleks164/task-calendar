import { addTask, deleteTask, updateTask, drawTasksList,tugleStatusTask } from "./crudTask";
import { statusFilter } from "./statusFilter";
import { setupStore } from "./store/store";
import { taskSlice } from "./store/reducers/taskSlicer";
import {Crud} from "../FB/CRUD";
import { addFuzzy } from "./fuzzy";

const сrud = new Crud();

async function taskFB(){
  const taskFromBase = await сrud.getData();
  const arrayTasks=[];
  
  for(const item in taskFromBase){
    arrayTasks.push(taskFromBase[item]);
  }  
  return arrayTasks;
}

export async function app() {
  const taskForm = document.querySelector("form");
  const checkStatusBlock = <HTMLDivElement>(
    document.querySelector("#checkStatusBlock")
  );

  setupStore.subscribe(drawTasksList);

  setupStore.dispatch(taskSlice.actions.dateFromFBisLoaded(await taskFB()));  

  checkStatusBlock.addEventListener("click", statusFilter);

  taskForm?.addEventListener("submit", addTask);

  addFuzzy();
}
window.deleteTask = deleteTask;

window.updateTask = updateTask;

window.tugleStatusTask = tugleStatusTask;
