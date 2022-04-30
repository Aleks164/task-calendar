/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-promise-executor-return */
import { addTask, deleteTask, updateTask, tugleStatusTask } from "./crudTask";

import * as store from "../../store/store";
import * as reducers from "../../store/reducers/taskSlicer";
import * as mockDate from "./curDate";
import { TaskType } from "../../types/taskType";
import { Crud } from "../../firebase_init/tasksCRUD";

jest.mock("../../firebase_init/tasksCRUD");

let el: HTMLDivElement;
let spyDate: jest.SpyInstance;
let spyDateNow: jest.SpyInstance;
let spyDispatch: jest.SpyInstance;
let spyGetState: jest.SpyInstance;

describe("test crudTask function", () => {
  beforeEach(() => {
    spyDate = jest.spyOn(mockDate, "curDate").mockReturnValue("2022-04-21");
    spyDateNow = jest.spyOn(Date, "now").mockReturnValue(123);

    spyDispatch = jest
      .spyOn(store.setupStore, "dispatch")
      .mockReturnValue("taskItem");
    spyGetState = jest.spyOn(store.setupStore, "getState").mockReturnValue({
      tasks: [
        {
          date: "2022-04-12",
          description: "test descripton",
          id: 222,
          status: "done",
          title: "test title",
        },
      ],
      error: "",
      isLoading: true,
    });

    el = <HTMLDivElement>document.createElement("div");
    el.innerHTML = `<div id="checkStatusBlock">
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
      value="2022-04-21"
      min="2022-01-01"
      max="2022-12-31"
    />
    <input class="addButton" type="submit" value="add Task" />
      </div>   
    </form>
  </div>
  <hr />
  <div id="fuzzy">
  <select>
  <option value="title">Title</option>
  <option value="description">Task</option>
  <option value="date">Date</option>
  </select>
  <input placeholder="Search task..." id="fuzzyInput" type="text" />
  </div>
  <hr />
  <div class="taskList"></div>`;
    document.body.appendChild(el);
  });
  afterEach(() => {
    document.body.innerHTML = "";
    spyDate.mockClear();
    spyDateNow.mockClear();
    spyDispatch.mockClear();
  });
  it("test addTask function Crud", async () => {
    const expextReducerArg = {
      date: "2022-04-21",
      description: "taskInput",
      id: 123,
      status: "in progress",
      title: "titleInput",
    } as TaskType;

    const spyReducers = jest
      .spyOn(reducers.taskSlice.actions, "addTask")
      .mockReturnValue({ payload: expextReducerArg, type: "addTask" });

    const submitEvent = { preventDefault() {} };
    const titleInput = <HTMLInputElement>document.querySelector(".titleInput");
    const taskInput = <HTMLInputElement>document.querySelector(".taskInput");
    titleInput.value = "titleInput";
    taskInput.value = "taskInput";
    await addTask(submitEvent as SubmitEvent);
    expect(spyDispatch).lastCalledWith({
      payload: expextReducerArg,
      type: "addTask",
    });
    expect(spyReducers).lastCalledWith(expextReducerArg);
    expect(Crud).toHaveBeenCalledTimes(1);
    spyReducers.mockClear();
  });
  it("test deleteTask function Crud", async () => {
    const spyReducers = jest
      .spyOn(reducers.taskSlice.actions, "dellTask")
      .mockReturnValue({ payload: 123, type: "dellTask" });

    await deleteTask(123);
    expect(spyDispatch).lastCalledWith({ payload: 123, type: "dellTask" });
    expect(spyReducers).lastCalledWith(123);
    expect(Crud).toHaveBeenCalledTimes(1);
    spyReducers.mockClear();
  });
  it("test updateTask function Crud", async () => {
    const expextReducerArg = {
      date: "2022-04-21",
      description: "taskInput",
      id: 123,
      status: "in progress",
      title: "titleInput",
    } as TaskType;
    const spyReducers = jest
      .spyOn(reducers.taskSlice.actions, "upDateTask")
      .mockReturnValue({ payload: expextReducerArg, type: "upDateTask" });

    updateTask(123);

    expect(spyGetState).toHaveBeenCalledTimes(1);
    spyReducers.mockClear();
  });
  it("test tugleStatusTask function Crud", async () => {
    const expextReducerArg = {
      date: "2022-04-21",
      description: "taskInput",
      id: 123,
      status: "in progress",
      title: "titleInput",
    } as TaskType;
    const spyReducers = jest
      .spyOn(reducers.taskSlice.actions, "upDateTask")
      .mockReturnValue({ payload: expextReducerArg, type: "upDateTask" });

    await tugleStatusTask(123);
    expect(spyDispatch).lastCalledWith({
      payload: expextReducerArg,
      type: "upDateTask",
    });
    expect(spyReducers).lastCalledWith({ status: "done" });
    expect(Crud).toHaveBeenCalledTimes(1);
    spyReducers.mockClear();
  });
});
