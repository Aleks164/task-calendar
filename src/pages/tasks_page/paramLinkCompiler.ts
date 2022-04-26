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

export interface ParamList {
  [param: string]: boolean | undefined | string;
  onlyToday: boolean | undefined;
  fuzzySelect: "description" | "title" | "date" | undefined;
  fuzzyInput: string | undefined;
  allTasks: boolean | undefined;
  onlyDone: boolean | undefined;
  inProgress: boolean | undefined;
}

export function paramLinkCompiler(params: string) {
  const paramList = {} as ParamList;
  const splitParams = params.substring(1).split("&");
  splitParams.forEach((param: string) => {
    const paramKeyValueArr = param.split("=");
    const [keyOfParam, valueOfParam] = paramKeyValueArr;
    paramList[keyOfParam] = valueOfParam;
  });
  return paramList;
}
