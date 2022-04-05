import { taskRender } from "./taskRender";
import { calenarTemplateRender } from "./calenarTemplateRender";

export function calendarLoader() {
  calenarTemplateRender(
    "calendar3",
    new Date().getFullYear(),
    new Date().getMonth()
  );
  document.querySelector("#calendarCont").addEventListener("click", () => {
    calenarTemplateRender(
      "calendar3",
      +(<HTMLInputElement>document.querySelector("#calendarCont input")).value,
      +(<HTMLSelectElement>document.querySelector("#calendarCont select"))
        .options[
        (<HTMLSelectElement>document.querySelector("#calendarCont select"))
          .selectedIndex
      ].value
    );
    taskRender();
  });
  taskRender();
}
