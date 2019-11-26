let breakLength = 5;
let sessionLength = 25;

let seconds = sessionLength * 60;


let pause = true;
let countdown;

let sessionInProgress = false;
let finishedCycle = false;

const breakLengthDisplay = document.querySelector('#break-length');
const sessionLengthDisplay = document.querySelector('#session-length');
const timeLeft = document.querySelector('#time-left');

const breakIncrement = document.querySelector('#break-increment');
const breakDecrement = document.querySelector('#break-decrement');

const sessionIncrement = document.querySelector('#session-increment')
const sessionDecrement = document.querySelector('#session-decrement');

const playButton = document.querySelector('#start_stop')

breakIncrement.addEventListener('click', incrementBreak);
sessionIncrement.addEventListener('click', incrementSession);

breakDecrement.addEventListener('click', decrementBreak);
sessionDecrement.addEventListener('click', decrementSession);

function incrementBreak() {
    breakLength++;
    if (breakLength <= 1) breakLength = 1;
    if (breakLength >= 60) breakLength = 60;
    updateBreakLength()
}

function decrementBreak() {
    breakLength--;
    if (breakLength <= 1) breakLength = 1;
    if (breakLength >= 60) breakLength = 60;
    updateBreakLength()
}

function incrementSession() {
    sessionLength++;
    if (sessionLength <= 1) sessionLength = 1;
    if (sessionLength >= 60) sessionLength = 60;
    seconds = sessionLength * 60;
    displayTimeLeft(seconds)
    updateSessionLength()
}

function decrementSession() {
    sessionLength++;
    if (sessionLength <= 1) sessionLength = 1;
    if (sessionLength >= 60) sessionLength = 60;
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

    // seconds = seconds * 60;
    let timeNow = Date.now();
    let timeThen = timeNow + seconds * 1000;
    pause = false;
    hidePlayPause()

    countdown = setInterval(() => {

        secondsLeft = Math.round((timeThen - Date.now()) / 1000);
        if (secondsLeft < 0) {
            finishedCycle = true;
            clearInterval(countdown);
            return;
        }
        seconds--;
        displayTimeLeft(secondsLeft)
    }, 1000)
};



function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const reminderSeconds = seconds % 60;
    const display = `${minutes}:${reminderSeconds < 10 ? '0' : ''}${reminderSeconds}`;
    document.title = display;
    timeLeft.textContent = display;
}


function startSession() {

    sessionInProgress = true;
    pause = false;
    clearInterval(countdown);
    timer(seconds);
    hidePlayPause();

};

playButton.addEventListener('click', function () {
    if (pause == true) startSession(seconds)
    else pauseTimer()
})


// function isSessionInProgress() {
//     if (sessionInProgress == true) {
//         clearInterval(countdown);
//         pause = true;
//         hidePlayPause();
//     }
// }

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
    breakLength = 5;
    sessionLength = 25;
    seconds = sessionLength * 60;
    updateBreakLength();
    updateSessionLength();
    clearInterval(countdown);
    pause = true;
    hidePlayPause();
    displayTimeLeft(seconds)

}

reset.addEventListener('click', resetTimer)
displayTimeLeft(seconds)