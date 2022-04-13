import { TaskState } from "./types/taskType";

export function drawToDoList(taskList: HTMLDivElement, curState?: TaskState) {
 
  if(location.pathname==="/tasks"){
    if (!curState || !curState.isLoading) {
      if(curState)console.log(curState.isLoading);      
      taskList.innerHTML = `<div class= "loadingList"></div>`;
    } else {
      const sortTasks = [...curState.tasks].sort(
        (a, b) => Number(b.id) - Number(a.id)
      );
      taskList.innerHTML = `<ol id = "olList">${sortTasks
        .map(
          (el, index) => `<li class="taskListItem ${
            el.status === "done" ? "greenItem" : "redItem"
          }" ><h4>${el.title}</h4><hr/><p class="descriptionPInTask">${
            el.description
          }</p><p class="dataPInTask">${el.date.replace(
            /-/g,
            "."
          )}</p> <div class="del_updateBlock">
          <input onclick="deleteTask(${
            el.id
          })" class="dellBut" type="button" value="X" />
          <input onclick="updateTask(${
            el.id
          })" class="updateBut" type="button" value="🖉" />
          <input onclick="tugleStatusTask(${
            el.id
          })" class="tugleStatus" type="button" value="✓" />
        </div></li>${curState.tasks.length - 1 === index ? "" : "<hr/>"}`
        )
        .join("")} </ol>`;
    }
  }
  
}
