import { calendarLoader } from "./calendarLoader";

export function calendarRender() {
  const calendarCont = <HTMLDivElement>document.querySelector("#calendarCont");
  calendarCont.innerHTML = `<div  id="inputLine">
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
    <input type="number" value="" min="2000" max="2100" size="4">
</div>

<table id="calendarField">
    <thead>
      <tr><td>Пн<td>Вт<td>Ср<td>Чт<td>Пт<td>Сб<td>Вс</tr>
     <thead>          
    <tbody>
    </tbody>   
  </table> <hr />`;
  calendarLoader();
}
