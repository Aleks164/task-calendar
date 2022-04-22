import { tasksSortFilter } from "./tasksSortFilter";
import * as store from "../../store/store";

describe("tasksSortFilter test", () => {
    let spyGetState: jest.SpyInstance;
    let el: HTMLDivElement;
    beforeEach(() => {
        jest.useFakeTimers("modern");
        jest.setSystemTime(new Date(2022, 3, 21, 0, 0, 0).valueOf());
        spyGetState = jest
            .spyOn(store.setupStore, "getState")
            .mockReturnValue({
                tasks: [
                    {
                        date: "2022-04-12",
                        description: "test descripton1",
                        id: 321,
                        status: "done",
                        title: "test title"
                    }, {
                        date: "2022-04-21",
                        description: "test descripton2",
                        id: 123,
                        status: "done",
                        title: "test title"
                    }
                    , {
                        date: "2022-04-21",
                        description: "test descripton3",
                        id: 222,
                        status: "in progress",
                        title: "test title"
                    }
                ],
                error: "",
                isLoading: true
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
  <div id="onlyToday">
  <input type="checkbox"  name="onlyToday">
  <label for="onlyToday">only Today</label>
</div>  
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
        jest.useRealTimers();
        spyGetState.mockClear();
    });
    it("tasksSortFilter should return expected filtred tasks in state", async () => {
        const expexctedSortState = { "error": "", "isLoading": true, "tasks": [{ "date": "2022-04-12", "description": "test descripton1", "id": 321, "status": "done", "title": "test title" }, { "date": "2022-04-21", "description": "test descripton3", "id": 222, "status": "in progress", "title": "test title" }, { "date": "2022-04-21", "description": "test descripton2", "id": 123, "status": "done", "title": "test title" }] };
        expect(tasksSortFilter()).toStrictEqual(expexctedSortState);
    });
    it("tasksSortFilter should return expected filtred tasks in state with onlyDone patam", async () => {
        const onlyDone = <HTMLInputElement>document.querySelector("#onlyDone");
        onlyDone.checked = true;
        const expexctedSortState = { "error": "", "isLoading": true, "tasks": [{ "date": "2022-04-12", "description": "test descripton1", "id": 321, "status": "done", "title": "test title" }, { "date": "2022-04-21", "description": "test descripton2", "id": 123, "status": "done", "title": "test title" }] };
        expect(tasksSortFilter()).toStrictEqual(expexctedSortState);
    });
    it("tasksSortFilter should return expected filtred tasks in state with onlyToday patam", async () => {
        const onlyToday = <HTMLInputElement>document.querySelector("#onlyToday input");
        onlyToday.checked = true;
        const expexctedSortState = { "error": "", "isLoading": true, "tasks": [{ "date": "2022-04-21", "description": "test descripton3", "id": 222, "status": "in progress", "title": "test title" }, { "date": "2022-04-21", "description": "test descripton2", "id": 123, "status": "done", "title": "test title" }] };
        expect(tasksSortFilter()).toStrictEqual(expexctedSortState);
    });
    it("tasksSortFilter should return expected filtred tasks in state with fuzzyInput patam", async () => {
        const fuzzyInput = <HTMLInputElement>document.querySelector("#fuzzyInput");
        const fuzzySelect = <HTMLSelectElement>(
            document.querySelector("#fuzzy select")
        );
        const fuzzySelectValue =
            fuzzySelect.options[
            (<HTMLSelectElement>document.querySelector("#fuzzy select")).selectedIndex
            ];
        fuzzySelectValue.value = "description";
        fuzzyInput.value = "test descripton3";
        const expexctedSortState = { "error": "", "isLoading": true, "tasks": [{ "date": "2022-04-21", "description": "test descripton3", "id": 222, "status": "in progress", "title": "test title" }] };
        expect(tasksSortFilter()).toStrictEqual(expexctedSortState);
    });
});