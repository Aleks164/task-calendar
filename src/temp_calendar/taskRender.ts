export function taskRender(data) {
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
  const tasksAcc = {};
  data.forEach((task) => {
    const rightDateType = new Date(task.date.replace(/-/g, ","));
    const rightM = rightDateType.getMonth();
    const rightY = rightDateType.getFullYear();
    const rightD = rightDateType.getDate();
    const newDate = new Date(rightY, rightM, rightD);
    const dateCheck = firstDayFull <= newDate && lastDayFull >= newDate;
    if (dateCheck) {
      if (tasksAcc[rightD] && task.status === "done") {
        if (tasksAcc[rightD].done) {
          tasksAcc[rightD].done.push(task.title);
        } else {
          tasksAcc[rightD].done = [task.title];
        }
      } else if (!tasksAcc[rightD] && task.status === "done") {
        tasksAcc[rightD] = { done: [task.title] };
      }

      if (tasksAcc[rightD] && task.status !== "done") {
        if (tasksAcc[rightD].progress) {
          tasksAcc[rightD].progress.push(task.title);
        } else {
          tasksAcc[rightD].progress = [task.title];
        }
      } else if (!tasksAcc[rightD] && task.status !== "done") {
        tasksAcc[rightD] = { progress: [task.title] };
      }
    }
  });

  const dateElList = document.querySelectorAll(`td[data-day]`);
  dateElList.forEach((date: HTMLElement) => {
    const curDay = date.dataset.day;
    if (tasksAcc[curDay]) {
      const greenListInner = tasksAcc[`${curDay}`].done
        ? tasksAcc[`${curDay}`].done.map((el) => `<li>${el}</li>`).join(" ")
        : null;
      const redListInner = tasksAcc[`${curDay}`].progress
        ? tasksAcc[`${curDay}`].progress.map((el) => `<li>${el}</li>`).join(" ")
        : null;
      date.innerHTML = `<div data-id="${curDay}" class="taskInDate"><div class="dateInCell">${curDay}</div>${
        greenListInner !== null
          ? `<div class ='greenList'></div><div class='greenListTasks'><ol>${greenListInner}</ol></div>`
          : ""
      }${
        redListInner !== null
          ? `<div class ='redList'></div><div class='redListTasks'><ol>${redListInner}</ol></div>`
          : ""
      }</div>`;
    }
  });
}
