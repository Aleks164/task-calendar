import { drawToDoList } from "./drawToDoList";
import { TaskState, TaskType } from "../../types/taskType";
import * as crudTask from "./crudTask";

jest.mock("./crudTask", () => ({
  deleteTask: jest.fn(),
  updateTask: jest.fn(),
  tugleStatusTask: jest.fn(),
}));

describe("test drawToDoList", () => {
  const testTasks: TaskType[] = [
    {
      date: "2022-04-12",
      description: "test descripton",
      id: 1649766206618,
      status: "in progress",
      title: "test title",
    },
  ];

  let el: HTMLDivElement;
  let inputLine: HTMLDivElement;
  beforeEach(() => {
    el = <HTMLDivElement>document.createElement("div");
    inputLine = <HTMLDivElement>document.createElement("div");
    inputLine.innerHTML = `
    <input placeholder="Some title" class="titleInput" type="text" />
    <input placeholder="Some task" class="taskInput" type="text" />
    <input type="date" class="dateInput" name="dateInput" />`;
    el.classList.add("taskList");
    document.body.append(el, inputLine);
  });
  afterEach(() => {
    document.body.innerHTML = "";
  });
  it("drawToDoList should draw loading page if state.isLoading = false", () => {
    const testState: TaskState = {
      tasks: testTasks,
      isLoading: false,
      error: "error",
    };
    drawToDoList(testState);
    expect(
      document.querySelector(".taskList")?.classList.contains("loadingList")
    ).toBeTruthy();
  });
  it("drawToDoList should draw a tasks list based on incoming state", () => {
    const testState: TaskState = {
      tasks: testTasks,
      isLoading: true,
      error: "error",
    };
    const taskItem = `<ol id="olList"><li class="taskListItem redItem"><h4>test title</h4><hr><p class="descriptionPInTask">test descripton</p><p class="dataPInTask">2022.04.12</p> <div class="del_updateBlock">
          <input data-deleteid="1649766206618" class="dellBut" type="button" value="X">
          <input data-updateid="1649766206618" class="updateBut" type="button" value="🖉">
          <input data-tugleid="1649766206618" class="tugleStatus" type="button" value="✓">
        </div></li> </ol>`;
    drawToDoList(testState);
    expect(document.querySelector(".taskList")?.innerHTML).toBe(taskItem);
  });
  it("Testing click on delete/update/tugle status button", () => {
    const spyDeleteTask = jest.spyOn(crudTask, "deleteTask");
    const spyUpdateTask = jest.spyOn(crudTask, "updateTask");
    const spyTugleStatusTask = jest.spyOn(crudTask, "tugleStatusTask");
    const testState: TaskState = {
      tasks: testTasks,
      isLoading: true,
      error: "error",
    };

    drawToDoList(testState);
    document.querySelector(`.dellBut`)?.dispatchEvent(new Event("click"));
    expect(spyDeleteTask).toHaveBeenCalledWith(1649766206618);
    document
      .querySelector(`[data-updateid]`)
      ?.dispatchEvent(new Event("click"));
    expect(spyUpdateTask).toHaveBeenCalledWith(1649766206618);
    document.querySelector(`[data-tugleid]`)?.dispatchEvent(new Event("click"));
    expect(spyTugleStatusTask).toHaveBeenCalledWith(1649766206618);
  });
  it("drawToDoList should draw a tasks list with diferent status", () => {
    const testTasks2: TaskType[] = [
      {
        date: "2022-04-12",
        description: "test descripton",
        id: 1649766206618,
        status: "done",
        title: "test title",
      },
      {
        date: "2022-04-12",
        description: "test descripton2",
        id: 1649766206619,
        status: "in progress",
        title: "test title2",
      },
    ];
    const testState: TaskState = {
      tasks: testTasks2,
      isLoading: true,
      error: "error",
    };
    const taskItem = `<ol id="olList"><li class="taskListItem greenItem"><h4>test title</h4><hr><p class="descriptionPInTask">test descripton</p><p class="dataPInTask">2022.04.12</p> <div class="del_updateBlock">
          <input data-deleteid="1649766206618" class="dellBut" type="button" value="X">
          <input data-updateid="1649766206618" class="updateBut" type="button" value="🖉">
          <input data-tugleid="1649766206618" class="tugleStatus" type="button" value="✓">
        </div></li><hr><li class="taskListItem redItem"><h4>test title2</h4><hr><p class="descriptionPInTask">test descripton2</p><p class="dataPInTask">2022.04.12</p> <div class="del_updateBlock">
          <input data-deleteid="1649766206619" class="dellBut" type="button" value="X">
          <input data-updateid="1649766206619" class="updateBut" type="button" value="🖉">
          <input data-tugleid="1649766206619" class="tugleStatus" type="button" value="✓">
        </div></li> </ol>`;
    drawToDoList(testState);
    expect(document.querySelector(".taskList")?.innerHTML).toBe(taskItem);
  });
});
