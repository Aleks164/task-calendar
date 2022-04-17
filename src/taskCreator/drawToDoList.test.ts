import { drawToDoList } from "./drawToDoList";
import { TaskState, TaskType } from "./types/taskType";

describe("test drawToDoList", () => {
  const testTasks: TaskType[] = [
    {
      date: "2022-04-12",
      description: "test descripton",
      id: 1649766206618,
      status: "in progress",
      title: "test title",
    }
  ];

  let el: HTMLDivElement;
  beforeEach(() => {
    el = <HTMLDivElement>document.createElement("div");
    document.body.appendChild(el);
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
    drawToDoList(el, testState);
    expect(document.body.innerHTML).toBe('<div class="loadingList"></div>');
  });
  it("drawToDoList should draw a tasks list based on incoming data", () => {
    const testState: TaskState = {
      tasks: testTasks,
      isLoading: true,
      error: "error",
    };
    const taskItem = `<ol id="olList"><li class="taskListItem redItem"><h4>test title</h4><hr><p class="descriptionPInTask">test descripton</p><p class="dataPInTask">2022.04.12</p> <div class="del_updateBlock">
          <input onclick="deleteTask(1649766206618)" class="dellBut" type="button" value="X">
          <input onclick="updateTask(1649766206618)" class="updateBut" type="button" value="🖉">
          <input onclick="tugleStatusTask(1649766206618)" class="tugleStatus" type="button" value="✓">
        </div></li> </ol>`;
    drawToDoList(el, testState);
    expect(el.innerHTML).toBe(taskItem);
  });
});
