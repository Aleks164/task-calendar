import { taskSlice } from "./store/reducers/taskSlicer";
import { setupStore } from "./store/store";
import { drawToDoList } from "./drawToDoList";
import { TaskType } from "./types/taskType";
import { curDate } from "./curDate";
import { Crud } from "../FB/CRUD";

let titleInput: HTMLInputElement;
let taskInput: HTMLInputElement;
let dateInput: HTMLInputElement;
let taskForm: HTMLFormElement;
let taskList: HTMLDivElement;
let addButton: HTMLInputElement;
let allTasks: HTMLInputElement;

const fb = new Crud();

function upDateLinks() {
  titleInput = <HTMLInputElement>document.querySelector(".titleInput");
  taskInput = <HTMLInputElement>document.querySelector(".taskInput");
  dateInput = <HTMLInputElement>document.querySelector(".dateInput");
  taskForm = <HTMLFormElement>document.querySelector("form");
  taskList = <HTMLInputElement>document.querySelector(".taskList");
  addButton = <HTMLInputElement>document.querySelector(".addButton");
  allTasks = <HTMLInputElement>document.querySelector("#allTasks");
}

const newTask: (id?: number) => TaskType = (id?: number) => ({
  id: id || Date.now(),
  title: titleInput.value,
  description: taskInput.value,
  date: dateInput.value,
  status: "in progress",
});

export function inputCliner() {
  titleInput.value = "";
  taskInput.value = "";
  dateInput.value = curDate();
}

export function getTaskList() {
  return setupStore.getState();
}

export async function drawTasksList() {
  upDateLinks();
  drawToDoList(taskList, getTaskList());
}

export function addTask(e: SubmitEvent) {
  upDateLinks();
  e.preventDefault();

  if (titleInput.value === "") {
    titleInput.focus();
  } else if (taskInput.value === "") {
    taskInput.focus();
  } else {
    setupStore.dispatch(taskSlice.actions.addTask(newTask()));
    fb.createData(newTask());
    inputCliner();
    allTasks.checked = true;
  }
}

export function deleteTask(id: number) {
  setupStore.dispatch(taskSlice.actions.dellTask(id));
  inputCliner();
  allTasks.checked = true;
  fb.deleteData(id);
}

export function updateTask(id: number) {
  function addUpdatedTask(e: SubmitEvent) {
    e.preventDefault();

    setupStore.dispatch(taskSlice.actions.upDateTask(newTask(id)));
    fb.updateData(newTask(id));
    taskForm?.removeEventListener("submit", addUpdatedTask);
    taskForm?.addEventListener("submit", addTask);
    addButton.style.backgroundColor = "";
    addButton.style.color = "black";
    addButton.value = `add Task`;
    allTasks.checked = true;

    inputCliner();
  }
  const taskElList = setupStore.getState();
  const updateEl = taskElList.tasks.find((el) => el.id === id);

  titleInput.value = updateEl?.title || "";
  taskInput.value = updateEl?.description || "";
  dateInput.value = updateEl?.date || "";

  titleInput.focus();

  addButton.value = `update Task`;
  addButton.style.color = `#c92121`;
  addButton.style.backgroundColor = `#0ecb0e70`;

  taskForm?.removeEventListener("submit", addTask);

  taskForm?.addEventListener("submit", addUpdatedTask);
}
export function tugleStatusTask(id: number) {
  const taskElList = setupStore.getState();
  const tugleStatusEl = taskElList.tasks.find((el) => el.id === id);
  const toglStatus = tugleStatusEl?.status === "done" ? "in progress" : "done";

  const updatedTask = { ...tugleStatusEl, status: toglStatus } as TaskType;

  setupStore.dispatch(taskSlice.actions.upDateTask(updatedTask));
  fb.updateData(updatedTask);
  inputCliner();
}
