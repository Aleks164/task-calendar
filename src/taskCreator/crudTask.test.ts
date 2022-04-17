// import {
//   addTask,
//   deleteTask,
//   updateTask,
//   drawTasksList,
//   tugleStatusTask,
// } from "./crudTask";
import { renderTasks } from "./renderTasks";

jest.mock("./store/store", () => ({
  setupStore: {
    getState: jest.fn().mockReturnValue([
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
    ])
  }
}));

jest.mock("./curDate", () => {
  return jest.fn(() => "22-04-2022");
});
jest.mock("./app", () => {
  return jest.fn();
});

let el: HTMLDivElement;
let taskList: HTMLDivElement;
let allTasks;

const sleep = (x: number) => new Promise((resolve) => setTimeout(resolve, x));

describe.skip("test drawToDoList", () => {
  beforeEach(() => {
    location.pathname = "/tasks";
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
    taskList.innerHTML = `<div class="taskList"></div>`;
    document.body.append(el, taskList);
  });
  afterEach(() => {
    document.body.innerHTML = "";
  });
  it("statusFilter should draw tasks allist based on allTasks status param", async () => {
    let taskItem = `<ol id="olList"><li class="taskListItem redItem"><h4>test title</h4><hr><p class="descriptionPInTask">test descripton</p><p class="dataPInTask">2022.04.12</p> <div class="del_updateBlock">
        <input onclick="deleteTask(111)" class="dellBut" type="button" value="X">
        <input onclick="updateTask(111)" class="updateBut" type="button" value="🖉">
        <input onclick="tugleStatusTask(111)" class="tugleStatus" type="button" value="✓">
      </div></li> </ol><ol id="olList"><li class="taskListItem greenItem"><h4>test title</h4><hr><p class="descriptionPInTask">test descripton</p><p class="dataPInTask">2022.04.12</p> <div class="del_updateBlock">
      <input onclick="deleteTask(222)" class="dellBut" type="button" value="X">
      <input onclick="updateTask(222)" class="updateBut" type="button" value="🖉">
      <input onclick="tugleStatusTask(222)" class="tugleStatus" type="button" value="✓">
    </div></li> </ol>`;
    drawTasksList();

    await sleep(50);

    taskList = document.querySelector(".taskList");
    expect(taskList.innerHTML).toBe(taskItem);
  });
});
