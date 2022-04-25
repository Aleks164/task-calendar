// interface ParamList {
//     onlyToday: boolean | undefined;
//     fuzzySelect: "description" | "title" | "date" | undefined;
//     fuzzyInput: string | undefined;
//     allTasks: boolean | undefined;
//     onlyDone: boolean | undefined;
//     inProgress: boolean | undefined;
// }

// type Keys = keyof ParamList;
// type Value = ParamList[keyof ParamList];
// type ParamKeyValueArr = [Keys, Value];

interface ParamList {
  [param: string]: boolean | undefined | string;
  onlyToday: boolean | undefined;
  fuzzySelect: "description" | "title" | "date" | undefined;
  fuzzyInput: string | undefined;
  allTasks: boolean | undefined;
  onlyDone: boolean | undefined;
  inProgress: boolean | undefined;
}

export function paramLinkLoader(params: string) {
  const paramList = {} as ParamList;
  const splitParams = params.substring(1).split("&");
  splitParams.forEach((param: string) => {
    const paramKeyValueArr = param.split("=");
    const [keyOfParam, valueOfParam] = paramKeyValueArr;
    paramList[keyOfParam] = valueOfParam;
  });
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
