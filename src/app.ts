import { taskSlice } from "./store/reducers/taskSlicer";
import { setupStore } from "./store/store";
import { drawToDoList } from "./drawToDoList";
import { TaskType } from "./types/taskType";
import { curDate } from "./curDate";
import "./styles.css"


const titleInput = <HTMLInputElement>document.querySelector(".titleInput");
const taskInput = <HTMLInputElement>document.querySelector(".taskInput");
const dateInput = <HTMLInputElement>document.querySelector(".dateInput");
const taskForm = document.querySelector("form");
const taskList = <HTMLDivElement>document.querySelector(".taskList");
const addButton = <HTMLInputElement>document.querySelector(".addButton");

// const allTasks = <HTMLInputElement>document.querySelector("#allTasks");
// const onlyDone = <HTMLInputElement>document.querySelector("#onlyDone");
// const inProgress = <HTMLInputElement>document.querySelector("#inProgress");

const checkStatusBlock = <HTMLDivElement>document.querySelector("#checkStatusBlock");

checkStatusBlock.addEventListener("click", (e: Event) => {
  const clickedEl = e.target as HTMLInputElement;
  let curState = setupStore.getState();

  if (clickedEl.value === "onlyDone") {
    const onlyDoneList = curState.tasks.filter((task) => task.status === "done");
    drawToDoList(taskList, onlyDoneList);
  }



})

const newTask: () => TaskType = () => ({
  id: Date.now(),
  title: titleInput.value,
  description: taskInput.value,
  date: dateInput.value,
  status: "in progress"
});

function addTask(e: SubmitEvent) {
  e.preventDefault();
  setupStore.dispatch(taskSlice.actions.addTask(newTask()));

  const curState = setupStore.getState();
  drawToDoList(taskList, curState);

  titleInput.value = "";
  taskInput.value = "";
  dateInput.value = curDate();
}
taskForm?.addEventListener("submit", addTask);

function deleteTask(id: number) {
  setupStore.dispatch(taskSlice.actions.dellTask(id));
  const curState = setupStore.getState();
  drawToDoList(taskList, curState);
}

function updateTask(id: number) {
  // console.log(id)
  function addUpdatedTask(e: SubmitEvent) {
    e.preventDefault();

    const updatedTask = {
      id,
      title: titleInput.value,
      description: taskInput.value,
      date: dateInput.value,
      status: "in progress"
    };

    setupStore.dispatch(taskSlice.actions.upDateTask(updatedTask as TaskType));
    const curState = setupStore.getState();
    drawToDoList(taskList, curState);

    taskForm?.removeEventListener("submit", addUpdatedTask);
    taskForm?.addEventListener("submit", addTask);
    addButton.style.backgroundColor = "";
    addButton.value = `addTask`;

    titleInput.value = "";
    taskInput.value = "";
    dateInput.value = curDate();
  }
  const taskElList = setupStore.getState();
  const updateEl = taskElList.tasks.filter((el) => el.id === id)[0];

  titleInput.value = updateEl.title;
  taskInput.value = updateEl.description;
  dateInput.value = updateEl.date;

  titleInput.focus();

  addButton.value = `updateEl`;
  addButton.style.backgroundColor = `green`;

  taskForm?.removeEventListener("submit", addTask);

  taskForm?.addEventListener("submit", addUpdatedTask);
}
function tugleStatusTask(id: number) {

  const taskElList = setupStore.getState();
  const tugleStatusEl = taskElList.tasks.filter((el) => el.id === id)[0];
  const toglStatus = tugleStatusEl.status === "done" ? "in progress" : "done";

  const updatedTask = {
    id: tugleStatusEl.id,
    title: tugleStatusEl.title,
    description: tugleStatusEl.description,
    date: tugleStatusEl.date,
    status: toglStatus
  };

  setupStore.dispatch(taskSlice.actions.upDateTask(updatedTask as TaskType));
  const curState = setupStore.getState();
  drawToDoList(taskList, curState);

}


window.deleteTask = deleteTask;

window.updateTask = updateTask;

window.tugleStatusTask = tugleStatusTask;