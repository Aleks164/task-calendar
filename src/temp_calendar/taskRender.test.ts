import { taskRender } from "./taskRender";
import { calenarTemplateRender } from "./calenarTemplateRender";

describe("taskRender test", () => {
  const testTasks: TaskType[] = [
    {
      date: "2022-04-12",
      description: "test descripton",
      id: 1649766206618,
      status: "in progress",
      title: "test title"
    }
  ];
  let dateString;
  beforeAll(() => {
    jest.useFakeTimers("modern");
    jest.setSystemTime(new Date(2022, 3, 18, 0, 0, 0).valueOf());
  });
  beforeEach(() => {
    dateString = document.createElement("div");
    dateString.innerHTML = `<div  id="calendarCont"><div  id="inputLine">
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
      <input type="number" value="2022" min="2000" max="2100" size="4">
  </div>
  
  <table id="calendarField">
      <thead>
        <tr><td>Пн<td>Вт<td>Ср<td>Чт<td>Пт<td>Сб<td>Вс</tr>
       <thead>          
      <tbody>
      </tbody>   
    </table> <hr /></div>`;
    document.body.appendChild(dateString);
  });
  afterEach(() => {
    document.body.innerHTML = "";
  });
  afterAll(() => {
    jest.useRealTimers();
  });
  it("calenarTemplateRender rendering expect page", () => {
    const calendarField = <HTMLElement>document.querySelector("#calendarField");

    if (calendarField) {
      calenarTemplateRender(calendarField, 2022, 3);

      taskRender(testTasks);
      const calendarInner = calendarField.innerHTML;
      expect(calendarInner).toMatch('<td data-day="18" class="today">18</td>');
      expect(calendarInner).toMatch('<td data-day="30">30</td>');
      expect(calendarInner).toMatch(
        '<td data-day="12"><div data-id="12" class="taskInDate"><div class="dateInCell">12</div><div class="redList"></div><div class="redListTasks"><ol><li>test title</li></ol></div></div></td>'
      );
    }
  });
});
