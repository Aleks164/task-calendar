export function Calendar3(id: string, year: number, month: number) {
  const Dlast = new Date(year, month + 1, 0).getDate(); // крайний день месяца (число (31,30...))
  const D = new Date(year, month, Dlast); // полная дата последнего дня месяца
  const DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay(); // день недели первого дня месяца
  let calendar = "<tr>";
  const monthInput = <HTMLOptionElement>(
    document.querySelector(`#inputLine option[value="${D.getMonth()}"]`)
  );
  const yearInput = <HTMLInputElement>(
    document.querySelector(`#inputLine input`)
  );
  if (DNfirst !== 0) {
    for (let i = 1; i < DNfirst; i++) calendar += "<td>";
  } else {
    for (let i = 0; i < 6; i++) calendar += "<td>";
  }
  for (let i = 1; i <= Dlast; i++) {
    if (
      i === new Date().getDate() &&
      D.getFullYear() === new Date().getFullYear() &&
      D.getMonth() === new Date().getMonth()
    ) {
      calendar += `<td data-day=${i} class="today">${i}`;
    } else if (
      // список официальных праздников
      (i === 1 &&
        D.getMonth() === 0 &&
        ((D.getFullYear() > 1897 && D.getFullYear() < 1930) ||
          D.getFullYear() > 1947)) || // Новый год
      (i === 2 && D.getMonth() === 0 && D.getFullYear() > 1992) || // Новый год
      ((i === 3 || i === 4 || i === 5 || i === 6 || i === 8) &&
        D.getMonth() === 0 &&
        D.getFullYear() > 2004) || // Новый год
      (i === 7 && D.getMonth() === 0 && D.getFullYear() > 1990) || // Рождество Христово
      (i === 23 && D.getMonth() === 1 && D.getFullYear() > 2001) || // День защитника Отечества
      (i === 8 && D.getMonth() === 2 && D.getFullYear() > 1965) || // Международный женский день
      (i === 1 && D.getMonth() === 4 && D.getFullYear() > 1917) || // Праздник Весны и Труда
      (i === 9 && D.getMonth() === 4 && D.getFullYear() > 1964) || // День Победы
      (i === 12 && D.getMonth() === 5 && D.getFullYear() > 1990) || // День России
      (i === 7 &&
        D.getMonth() === 10 &&
        D.getFullYear() > 1926 &&
        D.getFullYear() < 2005) || // Октябрьская революция 1917 года
      (i === 8 &&
        D.getMonth() === 10 &&
        D.getFullYear() > 1926 &&
        D.getFullYear() < 1992) || // Октябрьская революция 1917 года
      (i === 4 && D.getMonth() === 10 && D.getFullYear() > 2004) // День народного единства
    ) {
      calendar += `<td data-day=${i} class="holiday">${i}`;
    } else {
      calendar += `<td data-day=${i}>${i}`;
    }
    if (new Date(D.getFullYear(), D.getMonth(), i).getDay() === 0) {
      calendar += "<tr>";
    }
  }
  document.querySelector(`#${id} tbody`).innerHTML = calendar;
  yearInput.value = `${D.getFullYear()}`;
  monthInput.selected = true;
  (<HTMLOptionElement>(
    document.querySelector(
      `#inputLine option[value="${new Date().getMonth()}"]`
    )
  )).style.color = "rgb(220, 0, 0)"; // в выпадающем списке выделен текущий месяц
}

