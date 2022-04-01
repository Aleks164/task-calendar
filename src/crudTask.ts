import { taskSlice } from "./store/reducers/taskSlicer";
import { setupStore } from "./store/store";
import { drawToDoList } from "./drawToDoList";
import { TaskType } from "./types/taskType";
import { curDate } from "./curDate";

const titleInput = <HTMLInputElement>document.querySelector(".titleInput");
const taskInput = <HTMLInputElement>document.querySelector(".taskInput");
const dateInput = <HTMLInputElement>document.querySelector(".dateInput");
const taskForm = document.querySelector("form");
const taskList = <HTMLDivElement>document.querySelector(".taskList");
const addButton = <HTMLInputElement>document.querySelector(".addButton");
const allTasks = <HTMLInputElement>document.querySelector("#allTasks");

const newTask: (id?: number) => TaskType = (id?: number) => ({
  id: id || Date.now(),
  title: titleInput.value,
  description: taskInput.value,
  date: dateInput.value,
  status: "in progress"
});

export function inputCliner() {
  titleInput.value = "";
  taskInput.value = "";
  dateInput.value = curDate();
}

export function getTaskList() {
  return setupStore.getState();
}

export function drawTasksList() {
  drawToDoList(taskList, getTaskList());
}

export function addTask(e: SubmitEvent) {
  e.preventDefault();

  if (titleInput.value === "") {
    titleInput.focus();
  } else if (taskInput.value === "") {
    taskInput.focus();
  } else {
    setupStore.dispatch(taskSlice.actions.addTask(newTask()));
    inputCliner();
    allTasks.checked = true;
  }
}

export function deleteTask(id: number) {
  setupStore.dispatch(taskSlice.actions.dellTask(id));
  inputCliner();
  allTasks.checked = true;
}

export function updateTask(id: number) {
  function addUpdatedTask(e: SubmitEvent) {
    e.preventDefault();

    setupStore.dispatch(taskSlice.actions.upDateTask(newTask(id)));

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
