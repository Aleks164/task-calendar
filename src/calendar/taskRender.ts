import { data } from "./templateData";

export function taskRender() {
  const year = (<HTMLInputElement>document.querySelector("#taskMenu input"))
    .value;
  const month = parseFloat(
    (<HTMLSelectElement>document.querySelector("#taskMenu select")).options[
      (<HTMLSelectElement>document.querySelector("#taskMenu select"))
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
        let top = "0vh";
        let left = "0.3vw";

        if (changingEl.children[0]) {
          let tdChildrenCount =
            changingEl.children[0].parentElement.childElementCount;
          if (tdChildrenCount < 5) {
            top = `${2 * tdChildrenCount}vh`;
          } else if (tdChildrenCount > 4 && tdChildrenCount < 12) {
            top = `8.0vh`;
            left = `${(tdChildrenCount - 3.7) * 1.5}vw`;
          }
        }
        const color = task.status === "done" ? "green" : "red";
        changingEl.innerHTML += `<div data-id="${task.id}" class="taskInDate" style="top:${top}; left:${left}; background-color:${color}"></div>`;
      }
    }
  });
  document.querySelectorAll(".taskInDate").forEach((el) => {
    el.addEventListener("mouseover", (e) => {
      if (e.currentTarget === e.target) {
        const { id } = (<HTMLElement>e.target).dataset;
        const curTask = data.find((task) => {
          return task.id === +id;
        });
        (<HTMLElement>(
          e.target
        )).innerHTML = `<div class="hoverTask"><p>${curTask.title}</p></div>`;
      }
    });
  });
  document.querySelectorAll(".taskInDate").forEach((el) => {
    el.addEventListener("mouseout", (e) => {
      (<HTMLElement>e.currentTarget).firstChild.remove();
    });
  });
}
