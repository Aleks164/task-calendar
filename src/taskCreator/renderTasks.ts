import { app } from "./app";
import { curDate } from "./curDate";

export function renderTasks() {
  const calendarCont = <HTMLDivElement>document.querySelector("#calendarCont");
  calendarCont.innerHTML = `<div id="checkStatusBlock">
  <input
    type="radio"
    id="allTasks"
    name="statusSelector"
    value="allTasks"
    checked
  />
  <label for="AllChoiced">all Tasks |</label>

  <input
    type="radio"
    id="onlyDone"
    name="statusSelector"
    value="onlyDone"
  />
  <label for="onlyDone">only done |</label>

  <input
    type="radio"
    id="inProgress"
    name="statusSelector"
    value="inProgress"
  />
  <label for="inProgress"> only in progress</label>
</div>
<hr />
<div class="taskWindow">
  <form>
  <div class="taskInputBlock">
  <label class="titleLable" for="titleInput">Title</label
  ><input placeholder="Some title" class="titleInput" type="text" />
  <label class="taskLable" for="taskInput">Task</label
  ><input placeholder="Some task" class="taskInput" type="text" />
  <label class="dateLable" for="dateInput">Date</label>
  <input
    type="date"
    class="dateInput"
    name="dateInput"
    value=${curDate()}
    min="2022-01-01"
    max="2022-12-31"
  />
  <input class="addButton" type="submit" value="add Task" />
    </div>   
  </form>
</div>
<hr />
<div class="taskList"></div>`;

  app();
}
