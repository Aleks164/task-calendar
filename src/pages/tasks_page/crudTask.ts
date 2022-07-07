import { taskSlice } from "../../store/reducers/taskSlicer";
import { setupStore } from "../../store/store";
import { drawToDoList } from "./drawToDoList";
import { TaskType } from "../../types/taskType";
import { curDate } from "./curDate";
import { Crud } from "../../firebase_init/tasksCRUD";
import { tasksSortFilter } from "./tasksSortFilter";

let titleInput: HTMLInputElement;
let taskInput: HTMLInputElement;
let dateInput: HTMLInputElement;
let taskForm: HTMLFormElement;
let addButton: HTMLInputElement;
let allTasks: HTMLInputElement;
let loadingAnimationEl: HTMLElement;
let taskList: HTMLElement;

const fb = new Crud();

function upDateLinks() {
  titleInput = <HTMLInputElement>document.querySelector(".titleInput");
  taskInput = <HTMLInputElement>document.querySelector(".taskInput");
  dateInput = <HTMLInputElement>document.querySelector(".dateInput");
  taskForm = <HTMLFormElement>document.querySelector("form");
  addButton = <HTMLInputElement>document.querySelector(".addButton");
  allTasks = <HTMLInputElement>document.querySelector("#allTasks");
  loadingAnimationEl = <HTMLElement>document.createElement("div");
  taskList = <HTMLElement>document.querySelector(".taskList");
}
function addAnimation() {
  upDateLinks();
  loadingAnimationEl.classList.add("loadingList");
  loadingAnimationEl.innerHTML = `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
  taskList.appendChild(loadingAnimationEl);
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
  drawToDoList(tasksSortFilter());
}

export async function addTask(e: SubmitEvent) {
  e.preventDefault();
  addAnimation();

  if (titleInput.value === "") {
    titleInput.focus();
  } else if (taskInput.value === "") {
    taskInput.focus();
  } else {
    await fb.createData(newTask());
    setupStore.dispatch(taskSlice.actions.addTask(newTask()));
    inputCliner();
    allTasks.checked = true;
  }
}

export async function deleteTask(id: number) {
  addAnimation();
  inputCliner();
  allTasks.checked = true;
  await fb.deleteData(id);
  setupStore.dispatch(taskSlice.actions.dellTask(id));
}

export function updateTask(id: number) {
  async function addUpdatedTask(e: SubmitEvent) {
    e.preventDefault();

    addAnimation();
    await fb.updateData(newTask(id));
    setupStore.dispatch(taskSlice.actions.upDateTask(newTask(id)));
    taskForm?.removeEventListener("submit", addUpdatedTask);
    taskForm?.addEventListener("submit", addTask);
    addButton.style.backgroundColor = "";
    addButton.style.color = "black";
    addButton.value = `add Task`;
    inputCliner();
    allTasks.checked = true;
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

export async function tugleStatusTask(id: number) {
  const taskElList = setupStore.getState();
  const tugleStatusEl = taskElList.tasks.find((el) => el.id === id);
  const toglStatus = tugleStatusEl?.status === "done" ? "in progress" : "done";
  const updatedTask = { ...tugleStatusEl, status: toglStatus } as TaskType;
  addAnimation();
  await fb.updateData(updatedTask);
  setupStore.dispatch(taskSlice.actions.upDateTask(updatedTask));
  inputCliner();
}
