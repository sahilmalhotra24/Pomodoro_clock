/*
 As a user, I can start a 25 minute pomodoro,
and the timer will go off once 25 minutes has elapsed.
*/


var minutes = 25;
var isPaused = false;
var timerId = 0;

$("#length").text(minutes);
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    timerId = setInterval(function () {
      if(!isPaused){
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            timer = duration;
            $("#stop").hide();
            $("#resume").hide();
        }

      }

    }, 1000);

}


function startPomodoro(min){

  var fiveMinutes = 60 * min,
  display = $('#time');
  startTimer(fiveMinutes, display);
}

// Event listeners

// Session length actions

$("#minus").on("click", function(){
  if(minutes > 1){
    minutes -= 1;
    $("#length").text(minutes);
    $("#time").text(minutes);
  }

});

$("#plus").on("click", function(){
  if( minutes < 45){
    minutes += 1;
    $("#length").text(minutes);
    $("#time").text(minutes);
  }

});

// Start button
$("#start").on("click", function(){
  $("#minus, #plus").attr("disabled", true);

  $(this).hide();
  isPaused = false;
  startPomodoro(minutes);
  $("#stop").show();

});

//Stop button
$("#stop").on("click", function(){
  $(this).hide();
  $("#resume").show();
  isPaused = !isPaused;
});

//Resume button
$("#resume").on("click", function(){
  $(this).hide();
  $("#stop").show();
  isPaused = !isPaused;

});

//Reset button
$("#reset").on("click", function(){
  $("#minus, #plus").attr("disabled", false);


  $("#stop").hide();
  $("#resume").hide();
  $("#start").show();
  clearInterval(timerId);
  $("#time").text(minutes);


});
