/* Displaying Current Date and Time, including Second */
function dateAndTime() {
  var date = dayjs().format('MMM DD, YYYY');
  var time = dayjs().format('h:mm:ss A');
  $("#currentDay").text("Today is " + date + " , and it is now " + time);

}; 

/* Get Current Hour to Assign Text Box Background Colors */
function changeColor() {

  for (var x=0; x<$('.hour').length; x++) {
    
    var currentHour = dayjs().format('hA');

    if ($('.hour').eq(x).text() === currentHour) {
      $('.time-block').eq(x).prevAll().children().filter(".description").addClass("past");
      $('.time-block').eq(x).children().filter(".description").addClass("present");
      $('.time-block').eq(x).nextAll().children().filter(".description").addClass("future");
      }
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


// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  /* Updates Current Date and  Time Every Second */
  setInterval(dateAndTime,1000);

  /* To Set Background Color Based on Time of Day, Updated by the Second */
  setInterval(changeColor,1000);

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
    $(this).prev().fadeTo(500,1)


  })


  /* Display Saved Tasks */
   for (var i=9; i<18; i++) {
    var displayTask = localStorage.getItem('#hour-'+i);
    $('#hour-'+i).children().filter($('.description')).val(displayTask);
   };
  
  /* Even Listener for Save Buttons */
  $('.saveBtn').on('click',function(){

    var idTag = $(this).parent().attr('id');

    var taskDescription = $('#' + idTag).children().filter($(".description")).val();

    saveData.play();

    $('#' + idTag).children().filter($(".description")).fadeOut(300);
    $('#' + idTag).children().filter($(".description")).fadeIn(300);

    localStorage.setItem('#' + idTag,taskDescription);

  })














  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage? Done
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time? Done
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this? Done
  //
  // TODO: Add code to display the current date in the header of the page. Done
});
