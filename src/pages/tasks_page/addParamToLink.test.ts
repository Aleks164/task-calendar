import { addParamToLink } from "./addParamToLink";

describe("addParamToLink test", () => {
  let el: HTMLDivElement;
  beforeEach(() => {
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
        <div id="onlyToday">
  <input type="checkbox"  name="onlyToday">
  <label for="onlyToday">only Today</label>
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
  });
  it("addParamToLink should add parametrs to adress string", () => {
    const onlyToday = <HTMLInputElement>(
      document.querySelector("#onlyToday input")
    );
    const fuzzySelect = <HTMLSelectElement>(
      document.querySelector("#fuzzy select")
    );
    const fuzzyInput = <HTMLInputElement>document.querySelector("#fuzzyInput");
    const onlyDone = <HTMLInputElement>document.querySelector("#onlyDone");
    onlyToday.checked = true;
    fuzzySelect.value = "description";
    fuzzyInput.value = "123";
    onlyDone.checked = true;
    expect(location.search).toBe("");
    addParamToLink();
    expect(location.search).toBe(
      "?onlyToday=true&fuzzySelect=description&fuzzyInput=123&onlyDone=true"
    );
  });
});
