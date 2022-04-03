const data = [{
  date: "2022-03-31",
description: "Tasklist done",
id: 1,
status: "done",
title: "ToDo Tasklist",
},
{date: "2022-04-01",
description: "qwe",
id: 1648934448194,
status: "in progress",
title: "Drink tea",
},
{date: "2022-04-01",
description: "eeeeee",
id: 1648934448195,
status: "in progress",
title: "Drink coffe",
},
{date: "2022-04-01",
description: "qqqe",
id: 1648934448193,
status: "done",
title: "Drink not coffe",
}];
const DataCal = {
  startMont: new Date(2022,3,1),
  endMonh: new Date(2022,3,30),
}
function Calendar3(id, year, month) {
    const Dlast = new Date(year,month+1,0).getDate();// крайний день месяца (число (31,30...))
        const D = new Date(year,month,Dlast);// полная дата последнего дня месяца
        const S = new Date(year,month,1);
        const DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay();// день недели первого дня месяца
        let calendar = '<tr>';
        const m = document.querySelector(`#calendarCont option[value="${  D.getMonth()  }"]`);
        const g = document.querySelector(`#calendarCont input`);
    if (DNfirst !== 0) {
      for(let  i = 1; i < DNfirst; i++) calendar += '<td>';
    }else{
      for(let  i = 0; i < 6; i++) calendar += '<td>';
    }
    for(let  i = 1; i <= Dlast; i++) {
      if (i === new Date().getDate() && D.getFullYear() === new Date().getFullYear() && D.getMonth() === new Date().getMonth()) {
        calendar += `<td data-day=${  i} class="today">${  i}`;
      }else if (  // список официальных праздников
            (i === 1 && D.getMonth() === 0 && ((D.getFullYear() > 1897 && D.getFullYear() < 1930) || D.getFullYear() > 1947)) || // Новый год
            (i === 2 && D.getMonth() === 0 && D.getFullYear() > 1992) || // Новый год
            ((i === 3 || i === 4 || i === 5 || i === 6 || i === 8) && D.getMonth() === 0 && D.getFullYear() > 2004) || // Новый год
            (i === 7 && D.getMonth() === 0 && D.getFullYear() > 1990) || // Рождество Христово
            (i === 23 && D.getMonth() === 1 && D.getFullYear() > 2001) || // День защитника Отечества
            (i === 8 && D.getMonth() === 2 && D.getFullYear() > 1965) || // Международный женский день
            (i === 1 && D.getMonth() === 4 && D.getFullYear() > 1917) || // Праздник Весны и Труда
            (i === 9 && D.getMonth() === 4 && D.getFullYear() > 1964) || // День Победы
            (i === 12 && D.getMonth() === 5 && D.getFullYear() > 1990) || // День России 
            (i === 7 && D.getMonth() === 10 && (D.getFullYear() > 1926 && D.getFullYear() < 2005)) || // Октябрьская революция 1917 года
            (i === 8 && D.getMonth() === 10 && (D.getFullYear() > 1926 && D.getFullYear() < 1992)) || // Октябрьская революция 1917 года
            (i === 4 && D.getMonth() === 10 && D.getFullYear() > 2004) // День народного единства
           ) {
          calendar += `<td data-day=${  i} class="holiday">${  i}`;
        }else{
          calendar += `<td data-day=${  i}>${  i}`;
        }
      if (new Date(D.getFullYear(),D.getMonth(),i).getDay() === 0) {
        calendar += '<tr>';
      }
    }
 


    document.querySelector(`#${id} tbody`).innerHTML = calendar;
    g.value = D.getFullYear();
    m.selected = true;    
    document.querySelector(`#calendarCont option[value="${  new Date().getMonth()  }"]`).style.color = 'rgb(220, 0, 0)'; // в выпадающем списке выделен текущий месяц
    }

    


    Calendar3("calendar3",new Date().getFullYear(),new Date().getMonth());
    document.querySelector('#calendarCont').onchange = ()=> {
      Calendar3("calendar3",document.querySelector('#calendarCont input').value,parseFloat(document.querySelector('#calendarCont select').options[document.querySelector('#calendarCont select').selectedIndex].value));
    }
    data.forEach((task)=>{ 
     
      const rightDateType = new Date(task.date.replaceAll("-",","));
      const rightM = rightDateType.getMonth();
      const rightY = rightDateType.getFullYear();
      const rightD = rightDateType.getDate();
      const newDate = new Date(rightY,rightM,rightD);
    const dateCheck = DataCal.startMont<=newDate&&DataCal.endMonh>=newDate;
    console.log(DataCal.startMont,DataCal.endMonh);
    if(dateCheck){  
      console.log(dateCheck);
      const changingEl = document.querySelector(`td[data-day='${rightD}']`);
      let top="0";
      if(changingEl.children[0]){
        console.log(10 * changingEl.children[0].parentElement.childElementCount);
        top = `${10 * changingEl.children[0].parentElement.childElementCount}px`;
      }
      
      const color = task.status==="done" ? "green" : "red";
      
      changingEl.innerHTML += `<div data-id="${task.id}" class="taskInDate" style="top:${top}; background-color:${color}"></div>`;
      console.log(changingEl);
      
      // calendar = calendar.replace(`<td>${rightD}`,`<td>${rightD}<div data-id="${task.id}" class="taskInDate"></div></td>`);
    }
    
    })
    // console.log(document.querySelector('td[data-day="3"]'))  
      document.querySelectorAll(".taskInDate").forEach((el)=>{
      el.addEventListener("mouseover", (e)=>{
        if(e.currentTarget===e.target){
          console.log("mouseover",e.target);
          const {id} = e.target.dataset;
          const curTask = data.find((task)=>{
            console.log(task.id,id)
           return task.id === +id});
          
          e.target.innerHTML = `<div class="hoverTask"><p>${curTask.title}</p></div>`;
        }
        
      })
    })
    document.querySelectorAll(".taskInDate").forEach((el)=>{
      console.log(document.querySelectorAll(".taskInDate"))
      el.addEventListener("mouseout", (e)=>{
        console.log(e.currentTarget);
        e.currentTarget.firstChild.remove();
      })
    })