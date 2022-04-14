import FuzzySearch from "fuzzy-search";
import { getTaskList } from "./crudTask";
import { TaskType } from "./types/taskType";
import { drawToDoList } from "./drawToDoList";

export function addFuzzy() {
  const curState = getTaskList();
  const fuzzyInput = <HTMLInputElement>document.querySelector("#fuzzyInput");
  const allTasks = <HTMLInputElement>document.querySelector("#allTasks");
  const onlyDone = <HTMLInputElement>document.querySelector("#onlyDone");
  const inProgress = <HTMLInputElement>document.querySelector("#inProgress");
  const taskList = <HTMLInputElement>document.querySelector(".taskList");
  const fuzzySelect = <HTMLSelectElement>(
    document.querySelector("#fuzzy select")
  );
  let fuzzySelectValue =
    fuzzySelect.options[
      (<HTMLSelectElement>document.querySelector("#fuzzy select")).selectedIndex
    ].value;

  fuzzyInput.placeholder = `Search by Title`;

  fuzzySelect.addEventListener("change", (e: Event) => {
    fuzzySelectValue = (<HTMLSelectElement>e.target).value;
    let innerText = "";
    let titleText = "";
    if (fuzzySelectValue === "title") {
      innerText = "Type Title here...";
      titleText = "start typing the title";
    }
    if (fuzzySelectValue === "date") {
      innerText = "Type date here...";
      titleText = "typing yyyy-mm-dd or yyyymmdd";
    }
    if (fuzzySelectValue === "description") {
      innerText = "Type Task here...";
      titleText = "start typing the task";
    }
    fuzzyInput.placeholder = `${innerText}`;
    fuzzyInput.title = `${titleText}`;
  });
  fuzzyInput.addEventListener("input", (e: Event) => {
    const { value } = <HTMLInputElement>e.target;
    const fuzzy = new FuzzySearch(curState.tasks, [fuzzySelectValue], {
      caseSensitive: true,
    });
    let result = fuzzy.search(value) as TaskType[];
    if (onlyDone.checked) result = result.filter((el) => el.status === "done");
    if (inProgress.checked)
      result = result.filter((el) => el.status !== "done");

    const taskStateType = {
      tasks: result,
      isLoading: true,
      error: "",
    };

    drawToDoList(taskList, taskStateType);
  });
}
