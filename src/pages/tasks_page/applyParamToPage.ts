import { ParamList } from "./paramLinkCompiler";

export function applyParamToPage(paramList: ParamList) {
  const onlyToday = <HTMLInputElement>(
    document.querySelector("#onlyToday input")
  );
  const fuzzySelect = <HTMLSelectElement>(
    document.querySelector("#fuzzy select")
  );
  const fuzzyInput = <HTMLInputElement>document.querySelector("#fuzzyInput");
  const allTasks = <HTMLInputElement>document.querySelector("#allTasks");
  const onlyDone = <HTMLInputElement>document.querySelector("#onlyDone");
  const inProgress = <HTMLInputElement>document.querySelector("#inProgress");
  onlyToday.checked = paramList.onlyToday ? paramList.onlyToday : false;
  fuzzySelect.value = paramList.fuzzySelect ? paramList.fuzzySelect : "title";
  fuzzyInput.value = paramList.fuzzyInput ? paramList.fuzzyInput : "";
  allTasks.checked = paramList.allTasks ? paramList.allTasks : false;
  onlyDone.checked = paramList.onlyDone ? paramList.onlyDone : false;
  inProgress.checked = paramList.inProgress ? paramList.inProgress : false;
}
