import { paramLinkLoader } from "./paramLinkLoader";

describe("paramLinkLoader test", () => {
  let el: HTMLDivElement;
  beforeEach(() => {
    el = <HTMLDivElement>document.createElement("div");
    el.innerHTML = `<div id="checkStatusBlock">
      <input
        type="radio"
        id="allTasks"
        name="statusSelector"
        value="allTasks"
        checked
      />    
      <input
        type="radio"
        id="onlyDone"
        name="statusSelector"
        value="onlyDone"
      />
      <input
        type="radio"
        id="inProgress"
        name="statusSelector"
        value="inProgress"
      />     
    </div>
    <hr />    
    <div id="onlyToday">
    <input type="checkbox"  name="onlyToday">    
  </div>  
    </div>   
    </form>
  </div>
  <div id="fuzzy">
  <select>
  <option value="title">Title</option>
  <option value="description">Task</option>
  <option value="date">Date</option>
  </select>
  <input placeholder="Search task..." id="fuzzyInput" type="text" />  
  </div>`;
    document.body.appendChild(el);
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });
  it("paramLinkLoader should implement expect value for input elements based on incoming parameters", () => {
    const onlyToday = <HTMLInputElement>(
      document.querySelector("#onlyToday input")
    );
    const fuzzySelect = <HTMLSelectElement>(
      document.querySelector("#fuzzy select")
    );
    const fuzzyInput = <HTMLInputElement>document.querySelector("#fuzzyInput");
    const allTasks = <HTMLInputElement>document.querySelector("#allTasks");
    const onlyDone = <HTMLInputElement>document.querySelector("#onlyDone");
    const inProgress = <HTMLInputElement>document.querySelector("#inProgress");
    const incomingParam = `?onlyToday=true&fuzzySelect=description&fuzzyInput=testDescription&onlyDone=true`;
    paramLinkLoader(incomingParam);
    expect(onlyToday.checked).toBeTruthy();
    expect(fuzzySelect.value).toBe("description");
    expect(fuzzyInput.value).toBe("testDescription");
    expect(onlyDone.checked).toBeTruthy();
    expect(allTasks.checked).toBeFalsy();
    expect(inProgress.checked).toBeFalsy();
  });
});
