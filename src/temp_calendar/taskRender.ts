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
    console.log(task.title, task.status, rightD);
    if (dateCheck) {
      const changingEl = document.querySelector(`td[data-day='${rightD}']`);
      if (changingEl) {
        let greenListInner = "";
        let redListInner = "";
        // let isgreenListInner = document.querySelector(`.greenList`);
        // let isredListInner = document.querySelector(`.redList`);
        let greenListCheker = changingEl.querySelector(".greenListTasks");
        let redListCheker = changingEl.querySelector(".redListTasks");

        if (greenListCheker) {
          // console.log(task.title, task.status, rightD);
          greenListInner = changingEl.querySelector(`.greenListTasks`)
            .innerHTML;
          // console.log(greenListInner);
          if (task.status === "done") {
            greenListInner += `<p>${task.title}</p>`;
            // console.log(greenListInner);
          }
        }
        if (redListCheker) {
          redListInner = changingEl.querySelector(".redListTasks").innerHTML;
          // console.log(redListInner);
          if (task.status !== "done") {
            redListInner += `<p>${task.title}</p>`;
            // console.log(redListInner);
          }
        }
        if (!greenListCheker && !redListCheker) {
          if (task.status === "done") {
            greenListInner += `<p>${task.title}</p>`;
            // console.log(greenListInner);
          }
          if (task.status !== "done") {
            redListInner += `<p>${task.title}</p>`;
            // console.log(redListInner);
          }
        }
        changingEl.innerHTML = `<div data-id="${task.id}" class="taskInDate"><div class="dateInCell">${rightD}</div><div class ='greenList'></div><div class="greenListTasks">${greenListInner}</div><div class ='redList'></div><div class="redListTasks">${redListInner}</div></div>`;
        
      }
    }
  });
  document.querySelectorAll(".greenList").forEach((el) => {
    el.addEventListener("mouseover", (e) => {
      const redListEl = (<HTMLElement>(
        (<HTMLElement>e.target).parentElement?.querySelector(`.greenListTasks`)
      )).style;
      
      redListEl.display = "block";
      redListEl.zIndex = "10";
    });
  });
  document.querySelectorAll(".greenList").forEach((el) => {
    el.addEventListener("mouseout", (e) => {
      const redListEl = (<HTMLElement>(
        (<HTMLElement>e.target).parentElement?.querySelector(`.greenListTasks`)
      )).style;
      
      redListEl.display = "none";
      redListEl.zIndex = "5";
    });
  });
  document.querySelectorAll(".redList").forEach((el) => {
    el.addEventListener("mouseover", (e) => {
      const redListEl = (<HTMLElement>(
        (<HTMLElement>e.target).parentElement?.querySelector(`.redListTasks`)
      )).style;
      
      redListEl.display = "block";
      redListEl.zIndex = "10";
    });
  });
  document.querySelectorAll(".redList").forEach((el) => {
    el.addEventListener("mouseout", (e) => {
      const redListEl = (<HTMLElement>(
        (<HTMLElement>e.target).parentElement?.querySelector(`.redListTasks`)
      )).style;
      
      redListEl.display = "none";
      redListEl.zIndex = "5";
    });
  });
  
}
