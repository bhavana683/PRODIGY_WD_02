let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;

const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const milliseconds = document.getElementById('milliseconds');
const lapsList = document.getElementById('lapsList');

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startPause() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 10);
        startPauseBtn.textContent = 'Pause';
        running = true;
    } else {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        startPauseBtn.textContent = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    startPauseBtn.textContent = 'Start';
    minutes.textContent = '00';
    seconds.textContent = '00';
    milliseconds.textContent = '00';
    lapsList.innerHTML = '';
    lapCounter = 0;
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let s = Math.floor((difference % (1000 * 60)) / 1000);
    let ms = Math.floor((difference % 1000) / 10);

    minutes.textContent = (m < 10) ? '0' + m : m;
    seconds.textContent = (s < 10) ? '0' + s : s;
    milliseconds.textContent = (ms < 10) ? '0' + ms : ms;
}

function recordLap() {
    if (running) {
        lapCounter++;
        const lapTime = `${minutes.textContent}:${seconds.textContent}:${milliseconds.textContent}`;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapsList.appendChild(lapItem);
    }
}
