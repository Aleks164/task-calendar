/* eslint-disable no-promise-executor-return */
import { statusFilter } from "./statusFilter";
import * as draw from "./drawToDoList";

const state = {
  tasks: [
    {
      date: "2022-04-12",
      description: "test descripton",
      id: 111,
      status: "in progress",
      title: "test title"
    },
    {
      date: "2022-04-12",
      description: "test descripton",
      id: 222,
      status: "done",
      title: "test title"
    }
  ],
  error: "",
  isLoading: true
}

jest.mock("./store/store", () => ({
  setupStore: {
    getState: jest.fn().mockReturnValue(state)
  }
}));
let el: HTMLDivElement;
let taskList: HTMLDivElement;
let spyDraw: any;
let allTasks;
let onlyDone;
let inProgress;

const sleep = (x: number) => new Promise((resolve) => setTimeout(resolve, x));

describe("test drawToDoList", () => {
  beforeEach(() => {
    el = <HTMLDivElement>document.createElement("div");
    taskList = <HTMLDivElement>document.createElement("div");
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
  </div>`;
    taskList.innerHTML = `<div class="taskList"></div>`;
    document.body.appendChild(el);
    document.body.appendChild(taskList);
    spyDraw = jest.spyOn(draw, "drawToDoList");
  });
  afterEach(() => {
    document.body.innerHTML = "";
    spyDraw.mockReset();
    spyDraw.mockRestore();
  });
  it("statusFilter should draw tasks based on allTasks status param", async () => {
    allTasks = el.querySelector("#allTasks");
    const eventTforAll = { target: allTasks };

    statusFilter(eventTforAll as Event);

    await sleep(0);

    const filtredTaskList = document.querySelector(".taskList");
    expect(spyDraw).toHaveBeenCalledWith(filtredTaskList, state);
  });
  it("statusFilter should draw tasks based on onlyDone status param", async () => {
    onlyDone = el.querySelector("#onlyDone");

    const eventTforonlyDone = { target: onlyDone };

    statusFilter(eventTforonlyDone as Event);

    await sleep(0);

    const filtredTaskList = document.querySelector(".taskList");
    const filtredState = {
      tasks: [
        {
          date: '2022-04-12',
          description: 'test descripton',
          id: 222,
          status: 'done',
          title: 'test title'
        }
      ],
      error: '',
      isLoading: true
    }
    expect(spyDraw).toHaveBeenCalledWith(filtredTaskList, filtredState);
  });
  it("statusFilter should draw tasks allist based on inProgress status param", async () => {
    inProgress = el.querySelector("#inProgress");
    const eventTforAll = { target: inProgress };

    statusFilter(eventTforAll as Event);

    await sleep(0);

    const filtredTaskList = document.querySelector(".taskList");
    const filtredState = {
      tasks: [
        {
          date: '2022-04-12',
          description: 'test descripton',
          id: 111,
          status: 'in progress',
          title: 'test title'
        }
      ],
      error: '',
      isLoading: true
    }
    expect(spyDraw).toHaveBeenCalledWith(filtredTaskList, filtredState);
  });
});
