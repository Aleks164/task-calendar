import FuzzySearch from "fuzzy-search";
import { curDate } from "./curDate";
import { setupStore } from "../../store/store";
import { TaskType } from "../../types/taskType";

export function tasksSortFilter() {
  const curState = setupStore.getState();
  const onlyDone = <HTMLInputElement>document.querySelector("#onlyDone");
  const inProgress = <HTMLInputElement>document.querySelector("#inProgress");
  const onlyToday = <HTMLInputElement>document.querySelector("#onlyToday input");
  const fuzzyInput = <HTMLInputElement>document.querySelector("#fuzzyInput");

  let tasks = [...curState.tasks].sort(
    (a, b) => Number(b.id) - Number(a.id)
  );

  if (onlyToday.checked) tasks = tasks.filter((el) => el.date === curDate());
  if (onlyDone.checked) tasks = tasks.filter((el) => el.status === "done");
  if (inProgress.checked) tasks = tasks.filter((el) => el.status !== "done");

  if (fuzzyInput.value !== "") {
    const fuzzySelect = <HTMLSelectElement>(
      document.querySelector("#fuzzy select")
    );
    const fuzzySelectValue =
      fuzzySelect.options[
        (<HTMLSelectElement>document.querySelector("#fuzzy select")).selectedIndex
      ].value;
    const fuzzy = new FuzzySearch(tasks, [fuzzySelectValue], {
      caseSensitive: true
    });
    tasks = fuzzy.search(fuzzyInput.value) as TaskType[];
  }
  return { ...curState, tasks }
}
