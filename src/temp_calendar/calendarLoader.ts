import { taskRender } from "./taskRender";
import { calenarTemplateRender } from "./calenarTemplateRender";
import { requestTaskFromFB } from "../taskCreator/requestTaskFromFB";
import { taskSlice } from "../taskCreator/store/reducers/taskSlicer";
import { setupStore } from "../taskCreator/store/store";


export function calendarLoader() {
  const state = setupStore.getState();
  let data = state.tasks;
  const calendarField = <HTMLElement>(
    document.querySelector("#calendarField tbody")
  );
  calenarTemplateRender(
    calendarField,
    new Date().getFullYear(),
    new Date().getMonth()
  );
  document.querySelector("#inputLine")?.addEventListener("change", () => {
    calenarTemplateRender(
      calendarField,
      +(<HTMLInputElement>document.querySelector("#calendarCont input")).value,
      +(<HTMLSelectElement>document.querySelector("#calendarCont select"))
        .options[
        (<HTMLSelectElement>document.querySelector("#calendarCont select"))
          .selectedIndex
      ].value
    );
    taskRender(data);
  });
  if (!state.isLoading) {
    console.log("5", state.isLoading)
    calendarField.classList.add("loadingList");
    setTimeout(async () => {
      console.log("1")
      data = await requestTaskFromFB();
      console.log("2")
      setupStore.dispatch(taskSlice.actions.dateFromFBisLoaded(data));
      console.log("3")
      taskRender(data);
      console.log("4")
      calendarField.classList.remove("loadingList");
    }, 500);
  } else {
    taskRender(data);
  }
}
