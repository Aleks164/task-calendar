import { tugleStatusTask } from "./tugleStatusTask";
import { addTask, deleteTask, updateTask, drawTasksList } from "./crudTask";
import { statusFilter } from "./statusFilter";
import { setupStore } from "./store/store";


const taskMenu = <HTMLDivElement>(
  document.querySelector("#taskMenu")
);

export function taskList(){

  taskMenu.innerHTML = `<div id="checkStatusBlock">
<input type="radio" id="allTasks" name="statusSelector" value="allTasks" checked />
<label for="AllChoiced">all Tasks |</label>

<input type="radio" id="onlyDone" name="statusSelector" value="onlyDone" />
<label for="onlyDone">only done |</label>

<input type="radio" id="inProgress" name="statusSelector" value="inProgress" />
<label for="inProgress"> only in progress</label>
</div>
<hr />
<div class="taskWindow">
<form>
  <label for="titleInput">Title</label>
  <input class="titleInput" type="text" />
  <br />
  <div class="taskInputBlock">
    <label for="taskInput">Task</label><input class="taskInput" type="text" /><input type="date" class="dateInput"
      name="dateInput" value="2022-01-01" min="2022-01-01" max="2022-12-31" />
  </div>
  <br />
  <input class="addButton" type="submit" value="addTask" />
</form>
<br />`;
const taskForm = document.querySelector("form");
const checkStatusBlock = <HTMLDivElement>(
  document.querySelector("#checkStatusBlock")
);
setTimeout(()=>{
  drawTasksList();
  
  setupStore.subscribe(drawTasksList);
  
  checkStatusBlock.addEventListener("click", statusFilter);
  
  taskForm?.addEventListener("submit", addTask);
  
  window.deleteTask = deleteTask;
  
  window.updateTask = updateTask;
  
  window.tugleStatusTask = tugleStatusTask;
},500)
  
}
