import { TaskState } from "../../types/taskType";
import { deleteTask, updateTask, tugleStatusTask } from "./crudTask";
import { addParamToLink } from "./addParamToLink";

export function drawToDoList(curState: TaskState) {
  if (location.pathname === "/task-calendar/tasks") {
    const loadingAnimationEl = document.createElement("div");
    const taskList = <HTMLElement>document.querySelector(".taskList");
    if (!curState || !curState.isLoading) {
      loadingAnimationEl.classList.add("loadingList");
      loadingAnimationEl.innerHTML = `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
      taskList.appendChild(loadingAnimationEl);
    } else {
      addParamToLink();
      taskList.innerHTML = `<ol id = "olList">${curState.tasks
        .map(
          (el, index) => `<li class="taskListItem ${
            el.status === "done" ? "greenItem" : "redItem"
          }" ><h4>${el.title}</h4><hr/><p class="descriptionPInTask">${
            el.description
          }</p><p class="dataPInTask">${el.date.replace(
            /-/g,
            "."
          )}</p> <div class="del_updateBlock">
          <input data-deleteid = "${
            el.id
          }" class="dellBut" type="button" value="X" />
          <input data-updateid = "${
            el.id
          }" class="updateBut" type="button" value="🖉" />
          <input data-tugleid = "${
            el.id
          }" class="tugleStatus" type="button" value="✓" />
        </div></li>${curState.tasks.length - 1 === index ? "" : "<hr/>"}`
        )
        .join("")} </ol>`;
      document.querySelectorAll(`[data-deleteid]`).forEach((dellButton) => {
        dellButton.addEventListener("click", (e) => {
          const id = Number((<HTMLInputElement>e.target).dataset.deleteid);
          deleteTask(id);
        });
      });
      document.querySelectorAll(`[data-updateid]`).forEach((updateButton) => {
        updateButton.addEventListener("click", (e) => {
          const id = Number((<HTMLInputElement>e.target).dataset.updateid);
          updateTask(id);
          (<HTMLInputElement>e.target).disabled = true;
        });
      });
      document.querySelectorAll(`[data-tugleid]`).forEach((tugleButton) => {
        tugleButton.addEventListener("click", (e) => {
          const id = Number((<HTMLInputElement>e.target).dataset.tugleid);
          tugleStatusTask(id);
        });
      });
      taskList.removeChild(loadingAnimationEl);
    }
  }
}
