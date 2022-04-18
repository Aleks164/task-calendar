/* eslint-disable no-promise-executor-return */
import { calendarLoader } from "./calendarLoader";
import * as taskRender from "./taskRender";
import * as calenar from "./calenarTemplateRender";

jest.mock("../taskCreator/requestTaskFromFB", () => jest.fn().mockImplementation(() => Promise.resolve([
  {
    date: "2022-04-12",
    description: "test descripton",
    id: 111,
    status: "in progress",
    title: "test title"
  },
  {
    date: "2022-04-12",
    description: "test descripton",
    id: 222,
    status: "done",
    title: "test title"
  }
])));

jest.mock("../taskCreator/store/store", () => ({
  setupStore: {
    dispatch: jest.fn(),
    getState: jest
      .fn()
      .mockReturnValueOnce({
        tasks: [
          {
            date: "2022-04-12",
            description: "test descripton",
            id: 111,
            status: "in progress",
            title: "test title"
          },
          {
            date: "2022-04-12",
            description: "test descripton",
            id: 222,
            status: "done",
            title: "test title"
          }
        ],
        error: "",
        isLoading: true
      })
      .mockReturnValueOnce({
        tasks: [
          {
            date: "2022-04-12",
            description: "test descripton",
            id: 111,
            status: "in progress",
            title: "test title"
          },
          {
            date: "2022-04-12",
            description: "test descripton",
            id: 222,
            status: "done",
            title: "test title"
          }
        ],
        error: "",
        isLoading: false
      })
  }
}));

describe("taskRender test", () => {
  const sleep = (x: number) => new Promise((resolve) => setTimeout(resolve, x));
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
  it("calenarTemplateRender rendering expect page", async () => {
    let calendarField = <HTMLElement>document.querySelector("#calendarField");
    const spytaskRender = jest.spyOn(taskRender, "taskRender");
    const spycalenarTemplateRender = jest.spyOn(calenar, "calenarTemplateRender");

    calendarLoader();

    calendarField = <HTMLElement>document.querySelector("#calendarField tbody");
    console.log(calendarField.innerHTML)
    expect(spycalenarTemplateRender).toHaveBeenCalledWith(
      calendarField,
      2022,
      3
    );
    expect(spycalenarTemplateRender).toHaveBeenCalledTimes(1);
    expect(spytaskRender).toHaveBeenCalledWith([
      {
        date: "2022-04-12",
        description: "test descripton",
        id: 111,
        status: "in progress",
        title: "test title"
      },
      {
        date: "2022-04-12",
        description: "test descripton",
        id: 222,
        status: "done",
        title: "test title"
      }
    ]);
    expect(spytaskRender).toHaveBeenCalledTimes(1);

    calendarLoader();

    await sleep(600);

    calendarField = <HTMLElement>document.querySelector("#calendarField tbody");
    expect(spytaskRender).toHaveBeenCalledTimes(2);
    expect(spytaskRender).toHaveBeenCalledWith([
      {
        date: "2022-04-12",
        description: "test descripton",
        id: 111,
        status: "in progress",
        title: "test title"
      },
      {
        date: "2022-04-12",
        description: "test descripton",
        id: 222,
        status: "done",
        title: "test title"
      }
    ]);

    document.querySelector("#calendarCont input")?.dispatchEvent(new Event("change"));
    expect(spytaskRender).toHaveBeenCalledTimes(3);
  });
});
