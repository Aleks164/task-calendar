import { data } from "./templateData";

export function taskRender() {
  const year = (<HTMLInputElement>document.querySelector("#calendarCont input"))
    .value;
  const month = parseFloat(
    (<HTMLSelectElement>document.querySelector("#calendarCont select")).options[
      (<HTMLSelectElement>document.querySelector("#calendarCont select"))
        .selectedIndex
    ].value
  );
  const lastDay = new Date(+year, month + 1, 0).getDate(); // крайний день месяца (число (31,30...))
  const lastDayFull = new Date(+year, month, lastDay); // полная дата последнего дня месяца
  const firstDayFull = new Date(+year, month, 1); // полная дата первого дня месяца

  data.forEach((task) => {
    const rightDateType = new Date(task.date.replace(/-/g, ","));
    const rightM = rightDateType.getMonth();
    const rightY = rightDateType.getFullYear();
    const rightD = rightDateType.getDate();
    const newDate = new Date(rightY, rightM, rightD);
    const dateCheck = firstDayFull <= newDate && lastDayFull >= newDate;
    if (dateCheck) {
      const changingEl = document.querySelector(`td[data-day='${rightD}']`);
      if (changingEl) {
        let greenList = "";
        let redList = "";
        if (task.status === "done") {
          greenList = `class ='greenList'`;
        }
        if (task.status === "in progress") {
          redList = `class ='redList'`;
        }

        changingEl.innerHTML = `<div data-id="${task.id}" class="taskInDate"><div class="dateInCell">${rightD}</div><div ${greenList}></div><div class="greenListTasks"></div><div ${redList}></div></div><div class="redListTasks"></div>`;
      }
    }
  });
  document.querySelectorAll(".greenList").forEach((el) => {
    el.addEventListener("mouseover", (e) => {
      if (e.currentTarget === e.target) {
        const { id } = (<HTMLElement>e.target).dataset;
        const curTask = data.find((task) => task.id === +id);
        (<HTMLElement>(
          e.target
        )).innerHTML = `<div class="hoverTask"><p>${curTask.title}</p></div>`;
      }
    });
  });
  document.querySelectorAll(".greenList").forEach((el) => {
    el.addEventListener("mouseout", (e) => {
      (<HTMLElement>e.currentTarget).firstChild.remove();
    });
  });
}
