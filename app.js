//Checks what page you are on
const clockPage = document.getElementById('clock-page')
const stopwatchPage = document.getElementById('stopwatch-page')
const timerPage = document.getElementById('timer-page')

//Display Variables
const hours_span = document.getElementById('hours');
const minutes_span = document.getElementById('minutes');
const seconds_span = document.getElementById('seconds');
const miliseconds_div = document.getElementById('miliseconds');

//Timer input
const seconds_input = document.getElementById('seconds-input')
const minutes_input = document.getElementById('minutes-input')
const hours_input = document.getElementById('hours-input')


//Stopwatch Variables
let miliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;

//Start and Stop Buttons
const startButtonBorder = document.getElementById('main-start')
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

    if (miliseconds===100) {
        miliseconds=0;
        seconds++;
        if (seconds===60) {
            seconds_span.innerHTML = checkZero(0);
        } else {
            seconds_span.innerHTML = checkZero(seconds);
        }
            
    }

    if (seconds===60) {
        seconds=0;
        minutes++;
        if (minutes===60) {
            minutes_span.innerHTML = checkZero(0);
        } else {
            minutes_span.innerHTML = checkZero(minutes);
        }
    }

    if (minutes===60) {
        minutes=0;
        hours++;
        if (hours===60) {
            hours_span.innerHTML = checkZero(0);
        } else {
            hours_span.innerHTML = checkZero(hours);
        }
    }

    miliseconds += 1
    if (miliseconds===100) {
        miliseconds_div.innerHTML = checkZero(0);
    } else {
        miliseconds_div.innerHTML = checkZero(miliseconds);
    }
        
}

function timer() {
    if(miliseconds===100) {
        console.log(seconds)
        console.log(minutes)
        console.log(hours)
        miliseconds=0;
        seconds--;
        if (seconds===0) {
            if(seconds===0 && minutes===0 && hours===0) {
                timerInProgress = false;
                clearInterval(startStopwatch);
                resetTimer();
            } else if (minutes>0 || hours >0) {
                seconds=60;
                seconds_input.placeholder = "00";
            }
        } else {
            seconds_input.placeholder = checkZero(seconds)
        }

        if (seconds===59) {
            minutes--;
        }

        if(minutes<0 && hours>0) {
            minutes = 59
        } 
        
        if (minutes===59 && seconds===59) {
            hours--;
        }

        minutes_input.placeholder = checkZero(minutes)
        hours_input.placeholder = checkZero(hours)
    }
    miliseconds += 1;
}

function resetStopwatch() {
    hours_span.innerHTML = "00";
    minutes_span.innerHTML = "00";
    seconds_span.innerHTML = "00";
    miliseconds_div.innerHTML = "";
    miliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    transformToStart();
}

function resetTimer() {
    seconds_input.placeholder = "00";
    minutes_input.placeholder = "00";
    hours_input.placeholder = "00";
    miliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    transformToStart();
}

function transformToStop() {
    startButton.classList.remove('inner-start')
    startButtonBorder.classList.remove('main-start');
    startButton.classList.add('inner-stop')
    startButtonBorder.classList.add('main-stop');
    startButton.innerHTML = "STOP";
}

function transformToStart() {
    startButton.classList.remove('inner-stop')
    startButtonBorder.classList.remove('main-stop');
    startButton.classList.add('inner-start')
    startButtonBorder.classList.add('main-start');
    startButton.innerHTML = "START";
}

function zeroNull(number) {
    if(number===null || number===NaN || number==="") {
        return 0;
    } else return number;
}

function main() {

    if (clockPage) {
        clockInProgress = true;
        stopwatchInProgress = false;
        timerProgress = false
        clock();

    } else if (stopwatchPage) {
        startButton.addEventListener('click', () => {
            clockInProgress=false;
            timerProgress = false
            if (stopwatchInProgress===false) {
                stopwatchInProgress = true;
                transformToStop();
                startStopwatch = setInterval(stopwatch, 10);
            } else {
                clearInterval(startStopwatch);
                stopwatchInProgress = false;
                transformToStart();               
            }
        })

        resetButton.addEventListener('click', () => {
            clearInterval(startStopwatch);
            stopwatchInProgress = false;
            resetStopwatch();
        })

    } else if (timerPage) {
        startButton.addEventListener('click', () => {
            clockInProgress=false;
            stopwatchInProgress = false
            if (timerInProgress===false) {
                timerInProgress = true;
                transformToStop();
                if(seconds===0 && minutes===0 && hours===0){
                    seconds = zeroNull(seconds_input.value);
                    minutes = zeroNull(minutes_input.value);
                    hours = zeroNull(hours_input.value);
                    seconds_input.value = "";
                    minutes_input.value = "";
                    hours_input.value = "";
                }
                startStopwatch = setInterval(timer, 10);
            } else {
                clearInterval(startStopwatch);
                timerInProgress = false;
                transformToStart();
            }
        })

        resetButton.addEventListener('click', () => {
            clearInterval(startStopwatch);
            timerInProgress = false;
            resetTimer();
        })
    }
}

main();



