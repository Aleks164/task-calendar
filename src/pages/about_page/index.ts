export function aboutRender() {
  const calendarCont = <HTMLDivElement>document.querySelector("#calendarCont");
  calendarCont.innerHTML = `<div class="aboutCont">        
  <div class="refs"><div class="aboutPicture"></div>
  <div><h4>Task-Calendar App</h4>
    <div  class="pLink">
<p>
  <div class="mailImg"></div><a href="mailto:alekseyleha@mail.ru">alekseyleha@mail.ru</a>
</p>
  <p>
    <div class="githubImg"></div><a href="https://github.com/Aleks164">Aleks164</a>
  </p>
</div>
</div>
</div>
  
  The application implements:<br />
  - client routing;<br />
  - local storage - Redux/toolkit;<br />
  - remote storage - Firebase Realtime Database<br />
  The application is written in TypeScript
  <p>
      Develepoed by
       <a href="https://github.com/Aleks164">Aleks164</a>
     </p>
</div>`;
}
