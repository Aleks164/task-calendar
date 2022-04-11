import FuzzySearch from 'fuzzy-search';
import {getTaskList} from "./crudTask";
import { drawToDoList } from "./drawToDoList";

export function addFuzzy(){

  const curState = getTaskList() ;
  const taskList = <HTMLInputElement>document.querySelector(".taskList");
  const fuzzy = new FuzzySearch(curState.tasks, ['title'], {
      caseSensitive: true,
    });
  
  const fuzzyInput = <HTMLInputElement>document.querySelector("#fuzzyInput");
  
  fuzzyInput.addEventListener("change",(e:Event)=>{
  const {value} = <HTMLInputElement>e.target;
  const result = fuzzy.search(value);
  
  const taskStateType = {
    tasks: result,
    isLoading: true,
    error: "",
  }
  
  drawToDoList(taskList,taskStateType)
  
  })
}





