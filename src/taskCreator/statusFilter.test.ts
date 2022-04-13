// import { statusFilter } from "./statusFilter";

jest.mock("./store/store", () => ({
  setupStore: {
    getState: jest.fn().mockReturnValue({
      date: "2022-04-12",
      description: "test descripton",
      id: 1649766206618,
      status: "in progress",
      title: "test title"
    })
  }
}));
let el: HTMLDivElement;
let taskList: HTMLDivElement;
let allTasks;
let onlyDone;
let inProgress;
describe.skip("test drawToDoList", () => {
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
    taskList.innerHTML = `<div class="taskList">.taskList`;
    document.body.append(el, taskList);
  });
  afterEach(() => {
    document.body.innerHTML = "";
  });
  it("statusFilter should draw tasks list based on filter param and starus param", () => {
    allTasks = el.querySelector("#allTasks");
    let eventTforAll = { target: allTasks };
    onlyDone = el.querySelector("#onlyDone");
    inProgress = el.querySelector("#inProgress");
    let taskItem = `<ol id="olList"><li class="taskListItem redItem"><h4>test title</h4><hr><p class="descriptionPInTask">test descripton</p><p class="dataPInTask">2022.04.12</p> <div class="del_updateBlock">
        <input onclick="deleteTask(1649766206618)" class="dellBut" type="button" value="X">
        <input onclick="updateTask(1649766206618)" class="updateBut" type="button" value="🖉">
        <input onclick="tugleStatusTask(1649766206618)" class="tugleStatus" type="button" value="✓">
      </div></li> </ol>`;
    expect(taskList).toBe(taskItem);
  });
});
