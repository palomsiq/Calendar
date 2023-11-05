/*

* Calendar generator library (JavaScript)

* Creation Date: 05 September 2023

* Copyright (c) 2023 Paloma Nunes AS (palomsiq or pnunes) (MIT License)

* https://github.com/palomsiq/Calendar

*

* Permission is hereby granted, free of charge, to any person obtaining a copy of

* this software and associated documentation files (the "Software"), to deal in

* the Software without restriction, including without limitation the rights to

* use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of

* the Software, and to permit persons to whom the Software is furnished to do so,

* subject to the following conditions:

* - The above copyright notice and this permission notice shall be included in

*   all copies or substantial portions of the Software.

* - The Software is provided "as is", without warranty of any kind, express or

*   implied, including but not limited to the warranties of merchantability,

*   fitness for a particular purpose and noninfringement. In no event shall the

*   authors or copyright holders be liable for any claim, damages or other

*   liability, whether in an action of contract, tort or otherwise, arising from,

*   out of or in connection with the Software or the use or other dealings in the

*   Software.

*/

"use strict"; 

//Secção de tradução - pnunes

const optionsMonth = { month: "long", };
const optionsMonthShort = { month: "short" };
const optionsYear = { year: "numeric" };

let language = "";

function setLanguage(Os_Lang) {
    language = Os_Lang.substring(0, 2);
}

Date.prototype.getWeekDayShortName = function (lang, position) {
    lang = lang && (lang in Date.locale) ? lang : 'en';
    return Date.locale[lang].getWeekDayShortName[position];
};

Date.prototype.getWeekDayName = function (lang) {
    lang = lang && (lang in Date.locale) ? lang : 'en';
    return Date.locale[lang].getWeekDayName[position];
};

Date.locale = {
    en: {
        getWeekDayName: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        getWeekDayShortName: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    },
    pt: {
        getWeekDayName: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        getWeekDayShortName: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
    }
};


// Função generica para inserir uma tag HTML em um local especifico quantas vezes necessário. - pnunes
function forOperation(startindex, totalCount, isInsert, object, position, tag) {
    if (isInsert) {
        for (let g = startindex; g < totalCount; g++) {
            object.insertAdjacentHTML(position, tag);
        }
    }
}

//Função para validar se o número é par - pnunes
function validation(num) {
    if (num % 2 == 0) {
        return true;
    } else {
        return false;
    }
}



//Estrutura para filtro - pnunes
var usersSearch = {
    init: function () {
        
        const docu = document;
        const dateCurrent = new Date();
        const date = new Date(dateCurrent.getFullYear(), 0, 1);
        const date2 = new Date(date.getFullYear(), 11, date.getDate());
        
        let minYear = date.getFullYear() - 1;
        let maxYear = date.getFullYear() + 1;

        const dateForm = date.toISOString().split('T');
        const date2Form = date2.toISOString().split('T');

        docu.getElementsByName('startDateSearchKeyword')[0].value = dateForm[0];
        docu.getElementsByName('endDateSearchKeyword')[0].value = date2Form[0];
        
        usersSearch.dateFilter();

    },
    dateFilter: function () {
   
        let startDateInput =  document.getElementsByName('startDateSearchKeyword')[0].value;
        let endDateInput =  document.getElementsByName('endDateSearchKeyword')[0].value;
        let date1 = new Date(startDateInput);
        let date2 = new Date(endDateInput);

        deleteCalendar();
        deleteTCalendar();

        StartCalendar(date1.getFullYear(), date1.getMonth(), date1.getDate(), date2.getFullYear(), date2.getMonth(), date2.getDate());
        
        
    },
    deleteFilter: function(){
    
        let filter = document.getElementsByClassName('filters_JS');
        filter[0].remove();
    
    },
    cleanFilter: function () {
        const dclean = document;
    }
}



//Função que preenche os respectivos dias do mês em relação aos dias da semana - pnunes  

function completedMonth(year, currMonth, days, firstdayofweek, month) {

    const Js_Cons_doc = document;
    const Js_Cons_nm = new Date(year, currMonth, 1).toLocaleString(language, optionsMonth);
    month = currMonth + 1;

    const Js_tag_tr = Js_Cons_doc.getElementsByName(year)[0];
    Js_tag_tr.insertAdjacentHTML('beforeend', `<tr class="OS_tr_element" name="${year}-${currMonth + 1}"><th scope="row">${Js_Cons_nm}</th>`);


    const Js_tag_th = Js_Cons_doc.getElementsByName(year + '-' + month)[0];

    for (var i = 0; i < firstdayofweek; i++) {
        if (i == 0) {
            Js_tag_th.insertAdjacentHTML('beforeend', '<td class="wkd"></td>');
        } else {
            Js_tag_th.insertAdjacentHTML('beforeend', '<td></td>');
        }

    }
    for (var i = 0; i < days.length; i++) {
        let weekday = new Date(year, currMonth, days[i]).getDay();
        if (weekday === 0 || weekday === 6) {
            Js_tag_th.insertAdjacentHTML('beforeend', `<td id="${currMonth + 1}-${days[i]}-${year}" class="common_day_${weekday} wkd">${days[i]}</td>`)

        } else {
            Js_tag_th.insertAdjacentHTML('beforeend', `<td id="${currMonth + 1}-${days[i]}-${year}" class="common_day_${weekday} ">${days[i]}</td>`)

        }

        firstdayofweek++;
    }
    while (firstdayofweek < 7) {
        firstdayofweek++;
    }


    let rest = 37 - firstdayofweek;
    forOperation(0, rest, true, Js_tag_th, 'beforeend', '<td></td>');


    Js_tag_tr.insertAdjacentHTML('afterend', '</tr>');



}


//Função que preenche os respectivos dias do mês em relação aos dias da semana - pnunes  
function completedTMonth(year, currMonth, days, firstdayofweek, month) {

    const Js_Cons_doc = document;
    const Js_Cons_nm = new Date(year, currMonth, 1).toLocaleString(language, optionsMonth);
    month = currMonth + 1;
    const Js_tag_tr = Js_Cons_doc.getElementsByName("t_" + year+ "_"+ currMonth)[0];

    for(let i = 0; i < 7; i ++){

        Js_tag_tr.insertAdjacentHTML('beforeend', `<tr class="" name="t-${year}-${month}"><th scope="row"></th></tr>`);
    }
    const Js_tag_th = Js_Cons_doc.getElementsByName('t-' + year + '-' + month);

    for (var i = 0; i < firstdayofweek; i++) {
        Js_tag_th[0].insertAdjacentHTML('beforeend', '<td></td>');
    }   
    var tag = 0;
    for (var x = 0; x < days.length; x++) {
            let weekday = new Date(year, currMonth, days[x]).getDay();
            Js_tag_th[tag].insertAdjacentHTML('beforeend', `<td id="${currMonth + 1}-${days[x]}-${year}">${days[x]}</td>`)
            if(weekday == 6){
                tag++;
            }   
            firstdayofweek++;  
    }while (firstdayofweek < 7) {
        firstdayofweek++;
        
    }
    

}


// Função de cálculo para ano bissexto - pnunes
function leapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// Função para obter o número de dias de um mês em um determinado ano - pnunes 
function daysMonth(month, year) {
    const daysMonth = [31, leapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysMonth[month];
}



// Função para chamar a criação do calendário o calendário  - pnunes

function StartCalendar(yearI, monthI, dayI, yearE, monthE, dayE) {
    const startDate = new Date(yearI, monthI , dayI);
    const endDate = new Date(yearE, monthE, dayE);

    createCalendarPerLine(startDate, endDate);
    createTraditional(startDate, endDate);

}


//Função para calcular a diferença de anos - pnunes
function monthDiff(dateFrom, dateTo) {
    return dateTo.getMonth() - dateFrom.getMonth() +
        (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
}


//Função para calcular a diferença de meses - pnunes
function getYearDiff(date1, date2) {
    return Math.abs(date2.getFullYear() - date1.getFullYear());
}


//Função para criar o calendário visualmente - pnunes
function createCalendarDrawPerLine(year) {

    const Js_Cons_document = document;
    const Js_tag_container_main = Js_Cons_document.getElementsByClassName('Js_calendar')[0];
    Js_tag_container_main.insertAdjacentHTML('afterbegin', `<div><table class="calendar">`);

    const Js_tag_table = Js_Cons_document.getElementsByClassName('calendar')[0];


    Js_tag_table.insertAdjacentHTML('afterbegin', `<thead class="thead_calendar"><tr><th>${year}</th>`);

    const Js_tag_thead = Js_Cons_document.getElementsByClassName('thead_calendar')[0];
    let x = 0;

    for (let i = 0; i < 37; i++) {
        Js_tag_thead.firstChild.insertAdjacentHTML('beforeend', `<td class="day_${x}">${Date.prototype.getWeekDayShortName(language, x)}</td>`);
        (x < 6 ? x++ : x = 0);
    }

    const Js_Cons_Sd = Js_Cons_document.getElementsByClassName('day_0');
    const Js_Cons_St = Js_Cons_document.getElementsByClassName('day_6');

    for (let i = 0; i < Js_Cons_Sd.length; i++) {
        Js_Cons_Sd[i].classList.add('wkd');
    }
    for (let i = 0; i < Js_Cons_St.length; i++) {
        Js_Cons_St[i].classList.add('wkd');
    }

    Js_tag_table.insertAdjacentHTML('beforeend', '</tr></thead>');
    Js_tag_table.insertAdjacentHTML('beforeend', `<tbody name="${year}" class="tbody_calendar">`);

    Js_tag_table.insertAdjacentHTML('beforeend', '</tbody>');
    Js_tag_table.insertAdjacentHTML('beforeend', '</table></div>');


}


// Função para criar o calendário com base em datas com o(s) mes(es) por linha- pnunes
function createCalendarPerLine(date1, date2) {


    let dateInit = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()); //variavel de controle
    let dateEnd = new Date(date2.getFullYear(), date2.getMonth(), 1);


    const diffyears = getYearDiff(date1, date2);
    const diffMonth = monthDiff(date1, date2); //Diferença entre os meses
    const arrayDates = [];
    let curryear = dateInit.getFullYear();


    //construção da tabela com base nos anos. 
    for (let i = 0; i <= diffyears; i++) {
        createCalendarDrawPerLine(curryear);
        curryear = curryear + 1;
    }

    curryear = 0;
    let month = dateInit.getMonth();

    for (let k = 0; k <= diffMonth; k++) {

        if (dateInit < dateEnd) {
            arrayDates.push(dateInit);
            month = month + 1;
            dateInit = new Date(date1.getFullYear(), month, 1);
        } else {
            arrayDates.push(dateEnd);
        }

    }

    for (let position = 0; position < arrayDates.length; position++) {

        let currDate = new Date(arrayDates[position].getFullYear(),arrayDates[position].getMonth(),1);
        let firstDay = currDate.getDay();

        const days = [];

        const numDaysMonth = daysMonth(currDate.getMonth(), currDate.getFullYear());
        for (let day = 1; day <= numDaysMonth; day++) {
            days.push(day);
        }

        completedMonth(currDate.getFullYear(), currDate.getMonth(), days, firstDay, position);

        firstDay = (firstDay + numDaysMonth) % 7;

    }
}



//Função para criar o calendário tradicional visualmente - pnunes
function createTraditionalCalendarDraw(year,month) {

    const Js_Cons_document = document;
    const Js_tag_container_main = Js_Cons_document.getElementsByClassName('Js_Traditional_calendar')[0];
    const Js_Cons_nm = new Date(year, month, 1).toLocaleString(language, optionsMonth);
    Js_tag_container_main.insertAdjacentHTML('afterbegin', `<div class="tcalendar_div"><h2>${year} - ${Js_Cons_nm}</h2><table class="tcalendar">`);

    const Js_tag_table = Js_Cons_document.getElementsByClassName('tcalendar')[0];


    Js_tag_table.insertAdjacentHTML('afterbegin', `<thead class="thead_tcalendar"><th></th><tr>`);

    const Js_tag_thead = Js_Cons_document.getElementsByClassName('thead_tcalendar')[0];
    let x = 0;

    for (let i = 0; i < 7; i++) {
        Js_tag_thead.firstChild.insertAdjacentHTML('beforeend', `<td class="">${Date.prototype.getWeekDayShortName(language, x)}</td>`);
        (x < 6 ? x++ : x = 0);
    }


    Js_tag_table.insertAdjacentHTML('beforeend', '</tr></thead>');
    Js_tag_table.insertAdjacentHTML('beforeend', `<tbody year="${year}" class="tbody_tcalendar" name="t_${year}_${month}">`);

    Js_tag_table.insertAdjacentHTML('beforeend', '</tbody>');
    Js_tag_table.insertAdjacentHTML('beforeend', '</table></div>');


}


// Função para criar o calendário tradicional com base em datas - pnunes
function createTraditional(date1, date2) {


    let dateInit = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()); //variavel de controle
    let dateEnd = new Date(date2.getFullYear(), date2.getMonth(), 1);


    const diffyears = getYearDiff(date1, date2);
    const diffMonth = monthDiff(date1, date2); //Diferença entre os meses
    const arrayDates = [];
    let curryear = dateInit.getFullYear();


    let month = dateInit.getMonth();

    for (let k = 0; k <= diffMonth; k++) {

        if (dateInit < dateEnd) {
            arrayDates.push(dateInit);
            month = month + 1;
            dateInit = new Date(date1.getFullYear(), month, 1);
        } else {
            arrayDates.push(dateEnd);
        }

    }

    for (let position = 0; position < arrayDates.length; position++) {

        let currDate = new Date(arrayDates[position].getFullYear(),arrayDates[position].getMonth(),1);
        createTraditionalCalendarDraw(currDate.getFullYear(),currDate.getMonth());

        let firstDay = currDate.getDay();

        const days = [];

        const numDaysMonth = daysMonth(currDate.getMonth(), currDate.getFullYear());
        for (let day = 1; day <= numDaysMonth; day++) {
            days.push(day);
        }

        completedTMonth(currDate.getFullYear(), currDate.getMonth(), days, firstDay, position);

        firstDay = (firstDay + numDaysMonth) % 7;

    }
}




// Função para os eventos percorrerem o mês  - pnunes
function curr(qtdDays, currMonth, positionDay, year, monthE, yearE, Id, color) {

    let currDate = null;
  
    let lastdays = 0;
  
   
  
    for (let y = 0; y < qtdDays; y++) {
  
        currDate = document.getElementById(currMonth + '-' + (positionDay + y) + "-" + year);
  
        lastdays = qtdDays - y;
  
       
  
        if (currDate == null && lastdays > 0) {
  
          currMonth = currMonth + 1;
  
          positionDay = 1;
  
          if (year == yearE && currMonth <= monthE) {
  
            curr(lastdays, currMonth, positionDay, year, monthE, yearE, Id, color);
  
            qtdDays = 0;
  
          } else if (year < yearE && currMonth <= 12) {
  
            curr(lastdays, currMonth, positionDay, year, monthE, yearE, Id, color);
  
            qtdDays = 0;
  
          } else if (year < yearE && currMonth > 12) {
  
            currMonth = 0;
  
            year = year + 1;
  
            qtdDays = qtdDays - lastdays;
  
            curr(lastdays, currMonth, positionDay, year, monthE, yearE, Id, color);
  
          }
  
        } else {
  
          currDate.children[1].insertAdjacentHTML('beforeend', `<a class="a_button ${color}" onclick = "openPopUp(${currMonth},${positionDay + y},${year},${Id})"></a>`);
  
        }
  
      }
  
   
  
  }


// Função para criar eventos - pnunes
function setEvent(dayF, month, year, dayE, monthE, yearE, Id, color) {
    let a = document;
    const d1 = year + "-" + month + "-"+ dayF;
    const d2 = yearE + "-" + monthE + "-" + dayE;

    const diffInMs = new Date(d2) - new Date (d1)
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24) ;

    let lastdays = 0;
    let ini = null;
    
    const xy = 1;
    let b = null;

    const end = a.getElementById(monthE + "-"  + (dayE) + "-" + yearE);
    b = curr (diffInDays, month, dayF, year, month, year, Id, color);
    end.children[1].insertAdjacentHTML ('beforeend',' <a classo"a button ${color}" onclick = "openPopUp(${monthE],${dayE),$(yearE),$(Id))"</a>');
    const cor = a.getElementsByClassName (color);

    for (let i = 0; i < cor.length; i++){
    cor[1].style.backgroundColors = "#" + color;

    }

}

// função para apagar o calendário vigente - pnunes
function deleteCalendar() {
    const Js_document = document;
    const OS_calendar = Js_document.getElementsByClassName('calendar');
    
    if(OS_calendar.length != 0 ){
        for (let i = 0; i <= OS_calendar.length; i++) {
            OS_calendar[0].remove();
        }

    }

   
}
function deleteTCalendar() {
    const Js_document = document;
    const OS_calendar = Js_document.getElementsByClassName('tcalendar_div');
    
    if(OS_calendar.length != 0 ){
        for (let i = 0; i <= OS_calendar.length; i++) {
            OS_calendar[0].remove();
        }

    }

   
}

// Função para abrir popUp com base no click do evento - pnunes
function openPopUp(month, day, year) {
    let newWin = window.open("about:blank", "hello", "width=200,height=200");
    newWin.document.write("Hello, world!" + "Mês:" + month + "Dia:" + day + "Ano:" + year);
}



