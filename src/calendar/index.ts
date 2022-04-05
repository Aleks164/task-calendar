import { taskRender } from "./taskRender";
import {Calendar3} from "./mainCalendar";

const taskMenu = <HTMLDivElement>(
  document.querySelector("#taskMenu")
);
const calendarCont = <HTMLDivElement>(
  document.querySelector("#calendarCont")
);

export function calendarLoader(){

  taskMenu.innerHTML = `<div  id="inputLine">
<select>
  <option value="0">Январь</option>
  <option value="1">Февраль</option>
  <option value="2">Март</option>
  <option value="3">Апрель</option>
  <option value="4">Май</option>
  <option value="5">Июнь</option>
  <option value="6">Июль</option>
  <option value="7">Август</option>
  <option value="8">Сентябрь</option>
  <option value="9">Октябрь</option>
  <option value="10">Ноябрь</option>
  <option value="11">Декабрь</option>
  </select>
  <input type="number" value="" min="0" max="9999" size="4">
</div>`;  
calendarCont.innerHTML = `<table id="calendar3">
<thead>
  <tr><td>Пн<td>Вт<td>Ср<td>Чт<td>Пт<td>Сб<td>Вс
 <thead>          
<tbody>
</table>`;

    Calendar3("calendar3", new Date().getFullYear(), new Date().getMonth());
    document.querySelector("#inputLine").addEventListener("click", () => {
      Calendar3(
        "calendar3",
        +(<HTMLInputElement>document.querySelector("#inputLine input")).value,
        +(<HTMLSelectElement>document.querySelector("#inputLine select"))
          .options[
          (<HTMLSelectElement>document.querySelector("#inputLine select"))
            .selectedIndex
        ].value
      );
      taskRender();
    });
    
    taskRender();
}

