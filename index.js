const todayInfo = document.querySelector(".js-date-info-box"),
    day = todayInfo.querySelector(".day"),
    date = todayInfo.querySelector(".date"),
    month = todayInfo.querySelector(".month"),
    year = todayInfo.querySelector(".year"),
    calendarArea = document.querySelector(".js-calendar-area"),
    calendarBox = calendarArea.querySelector(".js-calendar-box"),
    dayColumn = calendarBox.getElementsByClassName("day-column"),
    previousMonth = calendarArea.querySelector(".pre-month-btn"),
    nextMonth = calendarArea.querySelector(".next-month-btn");

const dayObj = {
    0: "SUN",
    1: "MON",
    2: "TUE",
    3: "WED",
    4: "THU",
    5: "FRI",
    6: "SAT"
}
const monthObj = {
    0: "JAN",
    1: "FEB",
    2: "MAR",
    3: "APR",
    4: "MAY",
    5: "JUN",
    6: "JUL",
    7: "AUG",
    8: "SEP",
    9: "OCT",
    10: "NOV",
    11: "DEC"
}

const daysInMonth = {
    0: 31,
    1: 28,
    2: 31,
    3: 30,
    4: 31,
    5: 30,
    6: 31,
    7: 31,
    8: 30,
    9: 31,
    10: 30,
    11: 31
}

//Obj 프로퍼티 키값 읽기 참고 https://poiemaweb.com/js-object#3-%EA%B0%9D%EC%B2%B4-%ED%94%84%EB%A1%9C%ED%8D%BC%ED%8B%B0-%EC%A0%91%EA%B7%BC
function getTodayInfo(){
    const makeDate = new Date();
    const dayNumNow = makeDate.getDay(); // 0~6
    const dateNow = makeDate.getDate();
    const monthNumNow = makeDate.getMonth(); //0~11
    const yearNow = makeDate.getFullYear();
    day.innerText = dayObj[dayNumNow];     
    date.innerText = dateNow;
    month.innerText = monthObj[monthNumNow];
    year.innerText = yearNow;
    //현재 월의 1일이 무슨 요일인지 판별 후 해당 요일 라벨링에 1일 표기하기
    checkDay(yearNow, monthNumNow);

}
function checkDay(year, month){
    const check = new Date(year, month);
    const dayOfFirstDate = check.getDay();     // 현재 달의 첫째날 요일!!
    const currentMonth = check.getMonth();
    paintFirstWeek(dayOfFirstDate, currentMonth) 
} 

function paintFirstWeek(dayNumber, month){
    //달력 요일 id 와 대조 -> 일치하는 요일에 "1일" 표기
    //dayColumn[i].addEventListner("change", handleChange);
    for(i=0; i<7; i++){
        const day = dayColumn[i];
        if(parseInt(day.id) === dayNumber){
            const firstDate = document.createElement("span");
            firstDate.innerText = "1";
            day.appendChild(firstDate);
        } else if(parseInt(day.id) < dayNumber){
            const noMatch = document.createElement("span");
            noMatch.innerText = "-";
            day.appendChild(noMatch);
        } else if(parseInt(day.id) > dayNumber){
            const days = document.createElement("span");
            days.innerText = i-1;
            day.appendChild(days)            
        }
    }
    const totalDays = daysInMonth[month]; //  monthNumber 를 인자로 넣어야한다. !- 수정했음일단.
    paintTheRest(totalDays);
}

function paintTheRest(total){
    const notNull = [];
    for(i=0; i<7; i++){
        const day = dayColumn[i];
        const count = day.lastChild.innerText;

        if(parseInt(count) !== null && (parseInt(count)+7) <= total){
            const number = document.createElement("span");
            number.innerText = parseInt(count) +7;
            day.appendChild(number);
            notNull.push(i);
            while((parseInt(day.lastChild.innerText)+7) <= total){
                const number = document.createElement("span");
                number.innerText = parseInt(day.lastChild.innerText) +7;
                day.appendChild(number);
            }
        } 
    }
    const dayNumOfFirstdate = notNull[0]
    for(j=0; j<dayNumOfFirstdate; j++){
        const day = dayColumn[j];
        const number = document.createElement("span");
        number.innerText = 8 - (dayNumOfFirstdate-j)
        day.appendChild(number);
        while((parseInt(day.lastChild.innerText))+7 <= total){
            const number = document.createElement("span");
            number.innerText = parseInt(day.lastChild.innerText) +7;
            day.appendChild(number);
        }
    }
}

/* 다음 달, 이전 달 보기 버튼 클릭시, 현재 캘린더 클린 
function cleanCalendar(){
    for(i=0; i<7; i++){
        const day = dayColumn[i];
        while(day.lastChild !== day.label){
            delete day.lastChild;
        }   
    }
}
*/


function moveToNextMonth(){
    //cleanCalendar();
    const makeDate = new Date();
    const monthNumNow = makeDate.getMonth(); //0~11
    const yearNow = makeDate.getFullYear();

    const makeNextMonth = new Date(yearNow, monthNumNow+1);

    const dayNum = makeNextMonth.getDay(); // 0~6
    const dateOfNext = makeNextMonth.getDate();
    const monthNum = makeNextMonth.getMonth(); //0~11
    const yearOfNext = makeNextMonth.getFullYear();
    
    
    day.innerText = dayObj[dayNum];     
    date.innerText = dateOfNext;
    month.innerText = monthObj[monthNum];
    year.innerText = yearOfNext;

    checkDay(yearOfNext, monthNum);
}
/*
function moveToPreviousMonth(){

}
*/

function init(){
    getTodayInfo();
    nextMonth.addEventListener("click", moveToNextMonth);
    
}

init();