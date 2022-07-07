export function aboutRender() {
  const calendarCont = <HTMLDivElement>document.querySelector("#calendarCont");
  calendarCont.innerHTML = `<div class="aboutCont">        
  <div class="refs"><div class="aboutPicture"></div>
  <div><h4>Task-Calendar App</h4>
    <div  class="pLink">
    <div class="mailImgCont">
  <a class="mailImg" target="_blank" href="mailto:alekseyleha@mail.ru"></a><a href="mailto:alekseyleha@mail.ru" target="_blank">alekseyleha@mail.ru</a>
  </div>
  <div class="githubImgCont">
    <a class="githubImg" title="https://github.com/Aleks164" target="_blank" href="https://github.com/Aleks164"></a><a title="https://github.com/Aleks164" target="_blank" href="https://github.com/Aleks164">Aleks164</a>
    </div>
</div>
</div>
</div>
<div class="bottomText">
  The application implements:<br />
  - client routing;<br />
  - local storage - Redux/toolkit;<br />
  - remote storage - Firebase Realtime Database;<br />
  - supports parameterized links <a title="https://aleks164.github.io/task-calendar/tasks?onlyDone=true&fuzzySelect=date&fuzzyInput=27" target="_blank" href="https://aleks164.github.io/task-calendar/tasks?onlyDone=true&fuzzySelect=date&fuzzyInput=27">(Examle)</a>;<br />
  The application is written in TypeScript
  <p>
      More information on
       <a title="https://github.com/Aleks164/task-calendar/tree/redux/toolkit" target="_blank" href="https://github.com/Aleks164/task-calendar/tree/redux/toolkit">GitHubRepo</a>
     </p>
     </div>
</div>`;
}
