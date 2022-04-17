// import { statusFilter } from "./statusFilter";

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
let el: HTMLDivElement;
let taskList: HTMLDivElement;
let allTasks;
let onlyDone;
let inProgress;

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
  </div>`;
    taskList.innerHTML = `<div class="taskList"></div>`;
    document.body.append(el, taskList);
  });
  afterEach(() => {
    document.body.innerHTML = "";
  });
  it("statusFilter should draw tasks alllist based on allTasks status param", async () => {
    allTasks = el.querySelector("#allTasks");

    let eventTforAll = { target: allTasks };
    onlyDone = el.querySelector("#onlyDone");
    inProgress = el.querySelector("#inProgress");
    let taskItem = `<ol id="olList"><li class="taskListItem redItem"><h4>test title</h4><hr><p class="descriptionPInTask">test descripton</p><p class="dataPInTask">2022.04.12</p> <div class="del_updateBlock">
        <input onclick="deleteTask(111)" class="dellBut" type="button" value="X">
        <input onclick="updateTask(111)" class="updateBut" type="button" value="🖉">
        <input onclick="tugleStatusTask(111)" class="tugleStatus" type="button" value="✓">
      </div></li> </ol><ol id="olList"><li class="taskListItem greenItem"><h4>test title</h4><hr><p class="descriptionPInTask">test descripton</p><p class="dataPInTask">2022.04.12</p> <div class="del_updateBlock">
      <input onclick="deleteTask(222)" class="dellBut" type="button" value="X">
      <input onclick="updateTask(222)" class="updateBut" type="button" value="🖉">
      <input onclick="tugleStatusTask(222)" class="tugleStatus" type="button" value="✓">
    </div></li> </ol>`;
    statusFilter(eventTforAll);

    await sleep(50);
    taskList = document.querySelector(".taskList");
    expect(taskList.innerHTML).toBe(taskItem);
  });
  it("statusFilter should draw tasks alllist based on onlyDone status param", async () => {
    onlyDone = el.querySelector("#onlyDone");
    let eventTforAll = { target: allTasks };

    let taskItem = `</ol><ol id="olList"><li class="taskListItem greenItem"><h4>test title</h4><hr><p class="descriptionPInTask">test descripton</p><p class="dataPInTask">2022.04.12</p> <div class="del_updateBlock">
      <input onclick="deleteTask(222)" class="dellBut" type="button" value="X">
      <input onclick="updateTask(222)" class="updateBut" type="button" value="🖉">
      <input onclick="tugleStatusTask(222)" class="tugleStatus" type="button" value="✓">
    </div></li> </ol>`;
    statusFilter(eventTforAll);

    await sleep(50);
    taskList = document.querySelector(".taskList");
    expect(taskList.innerHTML).toBe(taskItem);
  });
  it("statusFilter should draw tasks alllist based on allTasks status param", async () => {
    inProgress = el.querySelector("#inProgress");
    let eventTforAll = { target: inProgress };

    let taskItem = `<ol id="olList"><li class="taskListItem redItem"><h4>test title</h4><hr><p class="descriptionPInTask">test descripton</p><p class="dataPInTask">2022.04.12</p> <div class="del_updateBlock">
        <input onclick="deleteTask(111)" class="dellBut" type="button" value="X">
        <input onclick="updateTask(111)" class="updateBut" type="button" value="🖉">
        <input onclick="tugleStatusTask(111)" class="tugleStatus" type="button" value="✓">
      </div></li></ol>`;

    statusFilter(eventTforAll);

    await sleep(50);
    taskList = document.querySelector(".taskList");
    expect(taskList.innerHTML).toBe(taskItem);
  });
});
