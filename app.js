let startTime;
let running = false;
let interval;

const display = document.getElementById("time");
const startStopBtn = document.getElementById("startStop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapsContainer = document.getElementById("lapsContainer");

startStopBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);

function startStop() {
  if (running) {
    clearInterval(interval);
    running = false;
    startStopBtn.textContent = "Start";
  } else {
    startTime =
      Date.now() - (lapTimes.length ? lapTimes.reduce((a, b) => a + b, 0) : 0);
    interval = setInterval(updateDisplay, 10);
    running = true;
    startStopBtn.textContent = "Stop";
  }
}

function updateDisplay() {
  const elapsed = Date.now() - startTime;
  display.textContent = formatTime(elapsed);
}

function formatTime(time) {
  const hours = Math.floor(time / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
}

function pad(num) {
  return num.toString().padStart(2, "0");
}

let lapTimes = [];

function lap() {
  const lapTime = Date.now() - startTime;
  lapTimes.push(lapTime);
  const lapDisplay = document.createElement("div");
  lapDisplay.textContent = `Lap ${lapTimes.length}: ${formatTime(lapTime)}`;
  lapsContainer.appendChild(lapDisplay);
}

function reset() {
  clearInterval(interval);
  running = false;
  startStopBtn.textContent = "Start";
  display.textContent = "00:00:00.00";
  lapTimes = [];
  lapsContainer.innerHTML = "";
}
