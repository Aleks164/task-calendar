import { taskRender } from "./taskRender";
import { calenarTemplateRender } from "./calenarTemplateRender";

export function calendarLoader() {
  calenarTemplateRender(
    "calendarField",
    new Date().getFullYear(),
    new Date().getMonth()
  );
  document.querySelector("#inputLine")?.addEventListener("change", () => {
    calenarTemplateRender(
      "calendarField",
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
