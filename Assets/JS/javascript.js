// time Object
let workTime = {
  "9 AM": "",
  "10 AM": "",
  "11 AM": "",
  "12 PM": "",
  "1 PM": "",
  "2 PM": "",
  "3 PM": "",
  "4 PM": "",
  "5 PM": "",
};

$(document).ready(function(){
    if(!localStorage.getItem('workTime')) {
        updateCalendarTasks(workTime);
      } else {
        updateCalendarTasks(JSON.parse(localStorage.getItem('workTime')));
      }
})
// always show the local time
$('#currentDay').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm:ss a'));


//  for in loop for the workTime object
let counter = 1;
for(var property in workTime) {
  let textEntry = "#text-entry" + counter;
  $(textEntry).text(workTime[property]);

  let timeId = "#time1" + counter;
  let preSetentHour = moment().hour();
  let timeString = $(timeId).text();
  let timeNumber = hourNumberFromHourString(timeString); 
  
//   change the color of the each time accordding to current time
  if(timeNumber < preSetentHour) {
    $(textEntry).addClass("past");
  } else if (timeNumber > preSetentHour) {
    $(textEntry).addClass("future");
  } else {
    $(textEntry).addClass("present");
  }
  counter ++;
}

// function for 
$("button").click(function() {
    value = $(this).siblings("textarea").val();
    hourString = $(this).siblings("div").text();
    
    saveSchedule(hourString, value);
  });


  function hourNumberFromHourString(hourString) {
    switch(hourString) {
      case "9 AM": return 9;
      case "10 AM": return 10;
      case "11 AM": return 11;
      case "12 PM": return 12;
      case "1 PM": return 13;
      case "2 PM": return 14;
      case "3 PM": return 15;
      case "4 PM": return 16;
      case "5 PM": return 17;
    }
  }

  
function loadCorrectDataset() {
    reSetult = localStorage.getItem('workTime')
    return (reSetult ? reSetult : workTime);
  }
  console.log(loadCorrectDataset());
  
// init
function initializeLocalStorage() {
    localStorage.setItem('workTime', JSON.stringify(workTime));
  };
  
  // saving in local storage
  function saveToLocalStorage(dayObj) {
    localStorage.setItem('workTime', JSON.stringify(dayObj));
  }
  
  // saving schedule
  function saveSchedule(hourString, val) {
    if(!localStorage.getItem('workTime')) {
      initializeLocalStorage();
    }
  
    let workHours = JSON.parse(localStorage.getItem('workTime'));
    workHours[hourString] = val
  
    saveToLocalStorage(workHours);
  }
  
  // for refreshing the calendar
  function updateCalendarTasks(dayObject) {
    $(".calendar-row").each(function(index) {
      let reSet = $(this).children("div");
      $(this).children("textarea").text(dayObject[reSet.text()]);
    })
  }





















