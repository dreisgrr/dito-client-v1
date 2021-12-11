function convertToEST(date) {
  estOffset = -4.0; // -5 + 1 daylight savings
  utc = date.getTime() + date.getTimezoneOffset() * 60000;
  return new Date(utc + 3600000 * estOffset);
}
function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hour = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    total: t,

    hour: hour,
    minutes: minutes,
    seconds: seconds,
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);

  var hoursSpan = clock.querySelector(".hour");
  var minutesSpan = clock.querySelector(".minutes");
  var secondsSpan = clock.querySelector(".seconds");

  function updateClock() {
    var t = getTimeRemaining(endtime);

    hoursSpan.innerHTML = ("0" + t.hour).slice(-2);
    minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
    secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

function getTimeRaffle() {
  var now = new Date();
  var nextDraw = new Date();
  nextDraw.setDate(now.getDate() + 1);
  nextDraw.setHours(11, 0, 0, 0);
  return nextDraw;
}

function convertToEST(date) {
  estOffset = +8;
  utc = date.getTime() + date.getTimezoneOffset() * 60000;
  return new Date(utc + 3600000 * estOffset);
}

var deadline = getTimeRaffle();
initializeClock("clockdiv", convertToEST(deadline));
