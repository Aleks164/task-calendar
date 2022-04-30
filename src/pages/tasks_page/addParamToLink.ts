import { ParamList, paramLinkCompiler } from "./paramLinkCompiler";

export function addParamToLink() {
  let paramList = {} as ParamList;
  const params = location.search;
  if (params.length > 0) {
    paramList = paramLinkCompiler(params);
  }
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
  if (onlyToday.checked) paramList.onlyToday = true;
  else delete paramList.onlyToday;
  if (fuzzySelect.value !== "title")
    paramList.fuzzySelect = fuzzySelect.value as ParamList["fuzzySelect"];
  else delete paramList.fuzzySelect;
  if (fuzzyInput.value !== "") paramList.fuzzyInput = fuzzyInput.value;
  else delete paramList.fuzzyInput;
  if (onlyDone.checked) {
    delete paramList.inProgress;
    delete paramList.allTasks;
    paramList.onlyDone = true;
  }
  if (inProgress.checked) {
    delete paramList.allTasks;
    delete paramList.onlyDone;
    paramList.inProgress = true;
  }
  if (allTasks.checked) {
    paramList.allTasks = true;
    delete paramList.onlyDone;
    delete paramList.inProgress;
  }
  let resultParamString = "?";
  const curPath = location.pathname;
  Object.entries(paramList).forEach(([param, value]) => {
    const checkParam =
      param === "fuzzyInput" ||
      param === "allTasks" ||
      param === "onlyDone" ||
      param === "inProgress" ||
      param === "fuzzySelect" ||
      param === "onlyToday";
    if (!checkParam) {
      delete paramList[param];
    }
    resultParamString += `${param}=${value}&`;
  });
  const resultUrl = `${
    curPath + resultParamString.substring(0, resultParamString.length - 1)
  }`;
  if (resultParamString.length > 1) history.pushState({}, "", resultUrl);
}
