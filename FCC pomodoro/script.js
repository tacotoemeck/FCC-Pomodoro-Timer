let breakLength = 5;
let sessionLength = 25;

let seconds = sessionLength * 60;


let pause = true;
let countdown;

// let sessionInProgress = false;
let finishedCycle = false;

let sessionInProgress = 'Session';

const breakLengthDisplay = document.querySelector('#break-length');
const sessionLengthDisplay = document.querySelector('#session-length');
const timeLeft = document.querySelector('#time-left');
const timerLabel = document.querySelector('#timer-label');
const timerBox = document.querySelector('.timer')

const breakIncrement = document.querySelector('#break-increment');
const breakDecrement = document.querySelector('#break-decrement');

const sessionIncrement = document.querySelector('#session-increment')
const sessionDecrement = document.querySelector('#session-decrement');

const playButton = document.querySelector('#start_stop')

breakIncrement.addEventListener('click', incrementBreak);
sessionIncrement.addEventListener('click', incrementSession);

breakDecrement.addEventListener('click', decrementBreak);
sessionDecrement.addEventListener('click', decrementSession);

function updateDisplay() {
    timerLabel.innerText = sessionInProgress;
}

updateDisplay()

function incrementBreak() {
    breakLength++;
    if (breakLength <= 1) breakLength = 1;
    if (breakLength >= 60) breakLength = 60;
    resetTimer()
    updateBreakLength()
}

function decrementBreak() {
    breakLength--;
    if (breakLength <= 1) breakLength = 1;
    if (breakLength >= 60) breakLength = 60;
    resetTimer()
    updateBreakLength()
}

function incrementSession() {
    sessionLength++;
    if (sessionLength <= 1) sessionLength = 1;
    if (sessionLength >= 60) sessionLength = 60;
    seconds = sessionLength * 60;
    displayTimeLeft(seconds)
    resetTimer()
    updateSessionLength()
}

function decrementSession() {
    sessionLength--;
    if (sessionLength <= 1) sessionLength = 1;
    if (sessionLength >= 60) sessionLength = 60;
    displayTimeLeft(seconds)
    resetTimer()
    updateSessionLength()
}



function updateBreakLength() {
    breakLengthDisplay.innerText = breakLength;
}

function updateSessionLength() {
    sessionLengthDisplay.innerText = sessionLength;
}

updateBreakLength()


function timer(seconds) {

    let timeNow = Date.now();
    let timeThen = timeNow + seconds * 1000;
    pause = false;
    hidePlayPause()

    countdown = setInterval(() => {

        secondsLeft = Math.round((timeThen - Date.now()) / 1000);
        if (secondsLeft < 0) {
            finishedCycle = true;
            clearInterval(countdown);
            alarm.play()
            autoPlay()

            return;
        }
        seconds--;
        displayTimeLeft(secondsLeft)
    }, 500)
};



function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const reminderSeconds = seconds % 60;
    const display = `${minutes}:${reminderSeconds < 10 ? '0' : ''}${reminderSeconds}`;
    document.title = display;
    timeLeft.textContent = display;
}


function startSession() {

    pause = false;
    clearInterval(countdown);
    timer(seconds);
    hidePlayPause();
    if (sessionInProgress == 'break') {
        timerBox.classList.remove('break')
        timerBox.classList.add('session')
    }
    if (sessionInProgress == 'Session') {
        timerBox.classList.remove('session')
        timerBox.classList.add('break')
    }

    // sessionInProgress = 'Session';

};

playButton.addEventListener('click', function () {
    if (pause == true) startSession(seconds)
    else pauseTimer()
})

function autoPlay() {
    if (sessionInProgress == 'Session') {
        sessionInProgress = 'Break'
        seconds = breakLength * 60;
        timerBox.classList.remove('break')
        timerBox.classList.add('session')
        startSession()
        updateDisplay()
    }
    else {
        sessionInProgress = 'Session'
        seconds = sessionLength * 60;
        timerBox.classList.remove('session')
        timerBox.classList.add('break')
        startSession()
        updateDisplay()
    }
}


function hidePlayPause() {
    if (pause == false) {
        pauseBtn.style.display = 'inline-block';
        playBtn.style.display = 'none';


    } else {
        playBtn.style.display = 'inline-block';
        pauseBtn.style.display = 'none';
    }
};

hidePlayPause()

function pauseTimer() {

    if (pause == false) {
        clearInterval(countdown);
        pause = true;
        hidePlayPause();
        seconds = secondsLeft;
    }
};

function resetTimer() {
    seconds = 0;
    seconds = sessionLength * 60;
    secondsLeft = seconds;
    clearInterval(countdown);
    pause = true;
    hidePlayPause();
    displayTimeLeft(seconds)


}

function setDefualt() {
    breakLength = 5;
    sessionLength = 25;
    updateBreakLength();
    updateSessionLength();
}

reset.addEventListener('click', function () {
    setDefualt();
    resetTimer();

})
displayTimeLeft(seconds)

const alarm = document.createElement('audio'); // A bell sound will play when the timer reaches 0
alarm.setAttribute("src", "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3")