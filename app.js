//Checks what page you are on
const clockPage = document.getElementById('clock-page')
const stopwatchPage = document.getElementById('stopwatch-page')
const timerPage = document.getElementById('timer-page')

//Display Variables
const hours_span = document.getElementById('hours');
const minutes_span = document.getElementById('minutes');
const seconds_span = document.getElementById('seconds');
const miliseconds_div = document.getElementById('miliseconds');


//Stopwatch Variables
let miliseconds_stopWatch = 0;
let seconds_stopWatch = 0;
let minutes_stopWatch = 0;
let hours_stopWatch = 0;

//Modes
const clockMode = document.getElementById('clock-mode');
const stopwatchMode = document.getElementById('stopwatch-mode');

//Start and Stop Buttons
const startButton = document.getElementById('inner-start');
const resetButton = document.getElementById('inner-reset');
const syncButton = document.getElementById('inner-sync');

//State of each mode
let clockInProgress = true;
let stopwatchInProgress = false;
let timerInProgress = false;
let startStopwatch = 0;
let startClock = 0;

function clock() {

    if (clockInProgress) {
        let current_time = new Date();
        let refresh=0; // Refresh rate in milli seconds

        if (current_time.getHours() < 10) {
            hours_span.innerHTML = `0${current_time.getHours()}`;
        } else {
            hours_span.innerHTML = current_time.getHours();
        }

        if (current_time.getMinutes() < 10) {minutes_span.innerHTML = `0${current_time.getMinutes()}`;}
        else {minutes_span.innerHTML = current_time.getMinutes();}
            
        if (current_time.getSeconds() < 10) {
            seconds_span.innerHTML = `0${current_time.getSeconds()}`;
        } else {
            seconds_span.innerHTML = current_time.getSeconds();
        }

        startClock = setTimeout('clock()',refresh) //calls clock function again to refresh
    } else {
        clearTimeout(startClock)
    }

}

function checkZero(time) {
    if (time < 10) {return `0${time}`;}
    else {return time;}
}
    
function stopwatch(){

    if (miliseconds_stopWatch===100) {
        miliseconds_stopWatch=0;
        seconds_stopWatch++;
        if (seconds_stopWatch===60) {
            seconds_span.innerHTML = checkZero(0);
        } else {
            seconds_span.innerHTML = checkZero(seconds_stopWatch);
        }
            
    }

    if (seconds_stopWatch===60) {
        seconds_stopWatch=0;
        minutes_stopWatch++;
        if (minutes_stopWatch===60) {
            minutes_span.innerHTML = checkZero(0);
        } else {
            minutes_span.innerHTML = checkZero(minutes_stopWatch);
        }
    }

    if (minutes_stopWatch===60) {
        minutes_stopWatch=0;
        hours_stopWatch++;
        if (hours_stopWatch===60) {
            hours_span.innerHTML = checkZero(0);
        } else {
            hours_span.innerHTML = checkZero(hours_stopWatch);
        }
    }

    miliseconds_stopWatch += 1
    if (miliseconds_stopWatch===100) {
        miliseconds_div.innerHTML = checkZero(0);
    } else {
        miliseconds_div.innerHTML = checkZero(miliseconds_stopWatch);
    }
        
}

function timer() {
    console.log('timer')
}

function resetStopwatch() {
    hours_span.innerHTML = "00";
    minutes_span.innerHTML = "00";
    seconds_span.innerHTML = "00";
    miliseconds_div.innerHTML = "";
    miliseconds_stopWatch = 0;
    seconds_stopWatch = 0;
    minutes_stopWatch = 0;
    hours_stopWatch = 0;
}

function main() {

    if (clockPage) {

        syncButton.addEventListener('click', () => {
            stopwatchInProgress = false;
            clockInProgress = true;
            clock();
        })

    } else if (stopwatchPage) {
        startButton.addEventListener('click', () => {
            clockInProgress=false;
            if (stopwatchInProgress===false) {
                stopwatchInProgress = true;
                startStopwatch = setInterval(stopwatch, 10);
            } else {
                clearInterval(startStopwatch);
                stopwatchInProgress = false;
            }
        })

        resetButton.addEventListener('click', () => {
            clearInterval(startStopwatch);
            stopwatchInProgress = false;
            resetStopwatch();
        })

    } else if (timerPage) {

    }


}


main();



