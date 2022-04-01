import { TaskState } from "./types/taskType";

export function drawToDoList(taskList: HTMLDivElement, curState: TaskState) {
  taskList.innerHTML = `<ol id = "olList">${curState.tasks
    .map(
      (el) => `<li title="${el.description}" style="background-color: ${
        el.status === "done" ? "rgb(34,139,34,0.1)" : "rgb(220,20,60,0.1)"
      };">${el.title} date:${el.date} status:${
        el.status
      } <div class="del_updateBlock">
      <input onclick="deleteTask(${
        el.id
      })" class="dellBut" type="button" value="X" />
      <input onclick="updateTask(${
        el.id
      })" class="updateBut" type="button" value="🖉" />
      <input onclick="tugleStatusTask(${el.id})" style="background-color: ${
        el.status === "done" ? "green" : "red"
      };" class="tugleStatus" type="button" value="✓" />
    </div></li><hr/>`
    )
    .join("")} </ol>`;
}
