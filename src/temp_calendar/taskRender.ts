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
  let tasksAcc = {};
  let taskItem = {progress:[],done:[]};
  data.forEach((task) => {
    const rightDateType = new Date(task.date.replace(/-/g, ","));
    const rightM = rightDateType.getMonth();
    const rightY = rightDateType.getFullYear();
    const rightD = rightDateType.getDate();
    const newDate = new Date(rightY, rightM, rightD);
    const dateCheck = firstDayFull <= newDate && lastDayFull >= newDate;
    if (dateCheck) {
      // console.log("status", task.title, task.status, tasksAcc);
      if (tasksAcc[rightD] && task.status === "done") {
        // console.log("status2", tasksAcc[rightD]);
        if (tasksAcc[rightD].done) {
          // console.log("status3", task.title, task.status, tasksAcc);
          tasksAcc[rightD].done.push(task.title);
        } else {
          tasksAcc[rightD].done = [task.title]
          // console.log("status4", task.title, task.status, tasksAcc);
        }
      } else if (!tasksAcc[rightD] && task.status === "done") {
      let temp = Object.assign({}, taskItem);
      temp.done.push(task.title);
        tasksAcc[rightD] = temp;
        // console.log("chekc", tasksAcc);
      }

      if (tasksAcc[rightD] && task.status !== "done") {
        // console.log("progress", task.title, task.status);
        if (tasksAcc[rightD].progress) {
          tasksAcc[rightD].progress.push(task.title);
        }else {         
          tasksAcc[rightD].progress = [task.title];
        }
      } else if (!tasksAcc[rightD] && task.status !== "done") {
        tasksAcc[rightD] = { progress: [task.title] };
      }
    }
  });

  const dateElList = document.querySelectorAll(`td[data-day]`);
  console.log("chekasdc", tasksAcc);
  dateElList.forEach((date: HTMLElement) => {
    const curDay = date.dataset.day;
    if (tasksAcc[curDay]) {
      const greenListInner = tasksAcc[`done_${curDay}`]
        .map((el) => `<li>${el}</li>`)
        .join(" ");
      const redListInner = tasksAcc[`progress_${curDay}`]
        .map((el) => `<li>${el}</li>`)
        .join(" ");
      console.log(date.innerHTML);
      date.innerHTML = `<div data-id="${curDay}" class="taskInDate"><div class="dateInCell">${curDay}</div><div class ='greenList'></div><div class="greenListTasks"><ol>${greenListInner}</ol></div><div class ='redList'></div><div class="redListTasks"><ol>${redListInner}</ol></div></div>`;
      console.log(date.innerHTML);
      console.log("----");
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
