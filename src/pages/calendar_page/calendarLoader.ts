import { calendarTaskRender } from "./calendarTaskRender";
import { calenarTableRender } from "./calenarTableRender";
import { requestTaskFromFB } from "../tasks_page/requestTaskFromFB";
import { taskSlice } from "../../store/reducers/taskSlicer";
import { setupStore } from "../../store/store";

export function calendarLoader() {
  const state = setupStore.getState();
  let data = state.tasks;
  const calendarField = <HTMLElement>(
    document.querySelector("#calendarField tbody")
  );
  calenarTableRender(
    calendarField,
    new Date().getFullYear(),
    new Date().getMonth()
  );
  document.querySelector("#inputLine")?.addEventListener("change", () => {
    calenarTableRender(
      calendarField,
      +(<HTMLInputElement>document.querySelector("#calendarCont input")).value,
      +(<HTMLSelectElement>document.querySelector("#calendarCont select"))
        .options[
        (<HTMLSelectElement>document.querySelector("#calendarCont select"))
          .selectedIndex
      ].value
    );
    calendarTaskRender(data);
  });
  if (!state.isLoading) {
    const loadingAnimationEl = document.createElement("div");
    loadingAnimationEl.classList.add("loadingList");
    loadingAnimationEl.innerHTML = `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
    calendarField.appendChild(loadingAnimationEl);
    setTimeout(async () => {
      data = await requestTaskFromFB();
      setupStore.dispatch(taskSlice.actions.dateFromFBisLoaded(data));
      calendarTaskRender(data);
      calendarField.removeChild(loadingAnimationEl);
    }, 500);
  } else {
    calendarTaskRender(data);
  }
}
