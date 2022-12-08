/* Displaying Current Date and Time, including Second */
function dateAndTime() {

  var date = dayjs().format('dddd, MMM DD, YYYY');
  var time = dayjs().format('h:mm:ss A');
  $("#currentDay").text("Today is " + date + " , and it is now " + time + " EST");

}; 

/* Get Current Hour to Assign Text Box Background Colors */
function changeColor() {
  
  var currentHour = dayjs().format('hA');

  for (var x=0; x<$('.hour').length; x++) {

    if ($('.hour')[x].textContent === currentHour) {

      $('.time-block').eq(x).prevAll().children().filter(".description").addClass("past");
      $('.time-block').eq(x).children().filter(".description").addClass("present");
      $('.time-block').eq(x).nextAll().children().filter(".description").addClass("future");

      }
    }

};

/* Refreshes Page to Reflect Correct Text Box Color When the Time Crosses over to Next Hour */
function nextHour() {

  var refreshHour = dayjs().format('mm:ss');

  if (refreshHour === '59:57') {
    countDown.play();
  }; 

  if (refreshHour === '00:01'){

    /* Security Save before the Page Refreshes to Reflect Correct Time Box Color */
    for (var i=0; i< $('.description').length; i++) {

      var safetySaveContent = $('.description').eq(i).val();
      var safetySaveKey = "#" + $('.time-block').eq(i).attr('id');
      localStorage.setItem(safetySaveKey,safetySaveContent);

    }
    location.reload();
  }
};


/* Sound Effects */
var enterData = new Audio();
enterData.src = "Assets/Sound Effects/Click.wav";

var typing = new Audio();
typing.src = "Assets/Sound Effects/KeyDown.wav";

var saveData = new Audio();
saveData.src = "Assets/Sound Effects/Save.wav";

var erase = new Audio();
erase.src = "Assets/Sound Effects/Clear.wav";

var countDown = new Audio();
countDown.src = "Assets/Sound Effects/Hour Countdown.wav";


$(function () {

  /* Updates Current Date and  Time Every Second */
  setInterval(dateAndTime,1000);

  /* To Set Background Color Based on Time of Day, Updated by the Second */
  setInterval(changeColor,1000);

  /* To Refresh the Page when it's the Next Hour */
  setInterval(nextHour,1000);

  $('.description').on("keydown", function() {
    typing.play();
  })

  /* Text Boxes and Sound Effect and Reminder to Save Task */
  $('.description').on("focus", function() {
    enterData.play();
    $(this).nextAll().filter($('.saveBtn')).toggleClass("reminder");
  })

  $('.description').on("blur", function() {
    $(this).nextAll().filter($('.saveBtn')).toggleClass("reminder");
  })

  /* Clear Text Buttom */
  $('.clear').on("click", function() {
    erase.play();
    $(this).prev().fadeTo(500,0);
    $(this).prev().val("");
    $(this).prev().fadeTo(500,1);
    var clearTask = $(this).parent().attr('id');
    var clearTaskId = "#" + clearTask;
    localStorage.setItem(clearTaskId,"");

  })


  /* Display Saved Tasks */
   for (var i=9; i<18; i++) {
    var displayTask = localStorage.getItem('#hour-'+i);
    $('#hour-'+i).children().filter($('.description')).val(displayTask);
   };
  
  /* Even Listener for Save Buttons */
  $('.saveBtn').on('click',function(){

    var idName = $(this).parent().attr('id');

    var taskDescription = $('#' + idName).children().filter($(".description")).val();

    saveData.play();

    $('#' + idName).children().filter($(".description")).fadeOut(300);
    $('#' + idName).children().filter($(".description")).fadeIn(300);

    localStorage.setItem('#' + idName,taskDescription);

  })


});
