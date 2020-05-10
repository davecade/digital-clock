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

//Timer completed animation
const clockBox =  document.getElementById('clock-box')

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
    if (time < 10) {
        return `0${time}`;
    } else {return time;}
}
    
function stopwatch(){

    miliseconds++;
    if (miliseconds===100) {
        miliseconds_div.innerHTML = checkZero(0);
    } else {
        miliseconds_div.innerHTML = checkZero(miliseconds);
    }

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


        
}
let asd = 0
function timer() {
    seconds_input.value = checkZero(seconds)
    minutes_input.value = checkZero(minutes)
    hours_input.value = checkZero(hours)

    miliseconds++;
    if(miliseconds===100) {
        miliseconds=0;
        seconds--;
        if (seconds<0) {
            if(seconds<=0 && minutes<=0 && hours<=0) {
                timerInProgress = false;
                clearInterval(startStopwatch);
                clockBox.classList.add('animate__animated', 'animate__heartBeat', 'animate__repeat-3')

                resetTimer()
            } else if (minutes>0 || hours >0) {
                seconds=59;
            }
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
    }
    
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

function resetTimer(resetButtTrig=false) {
    seconds_input.value = "";
    minutes_input.value = "";
    hours_input.value = "";
    miliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    if (resetButtTrig===false) {
        setTimeout(() => {
            clockBox.classList.remove('animate__animated', 'animate__heartBeat', 'animate__repeat-3')
        }, 4000);
    }
    transformToStart();
    timerInProgress = false;
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
    } else if (number.length>=2) {
        for (let i=0; i<number.length-2; i++){
            if (number[i] != 0) {
                return number.slice(i)
            } 
        }

        number = number.slice(number.length-2)
        if (number[0]==0) {
            return number[1]
        }
    }

    return number;
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
            timerProgress = false;
            startButton.classList.add('animate__animated', 'animate__rubberBand')
            setTimeout(() => {
                startButton.classList.remove('animate__animated', 'animate__rubberBand')
            }, 1000)
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
            resetButton.classList.add('animate__animated', 'animate__rubberBand')
            setTimeout(() => {
                resetButton.classList.remove('animate__animated', 'animate__rubberBand')
            }, 1000)
            resetStopwatch();
        })

    } else if (timerPage) {
        startButton.addEventListener('click', () => {
            if (timerInProgress===false) {
                if(seconds===0 && minutes===0 && hours===0){
                    seconds = zeroNull(seconds_input.value);
                    minutes = zeroNull(minutes_input.value);
                    hours = zeroNull(hours_input.value);
                }

                if (seconds > 59 || seconds < 0 || minutes > 59 || minutes < 0 || hours > 99 || hours < 0) {
                    alert("Numbers must be within ranges: seconds(0-59) minutes(0-59) hours(0-99)")
                    resetTimer();
                } else if (seconds===0 && minutes===0 && hours===0) {
                    alert("Please enter timer with at least 1 second")
                    timerInProgress = false;
                } else {
                    timerInProgress = true;
                    clockInProgress=false;
                    stopwatchInProgress = false
                    transformToStop();
                    startButton.classList.add('animate__animated', 'animate__rubberBand')
                    setTimeout(() => {
                        startButton.classList.remove('animate__animated', 'animate__rubberBand')
                    }, 1000)
                    startStopwatch = setInterval(timer, 10);
                }
                
            } else {
                clearInterval(startStopwatch);
                timerInProgress = false;
                transformToStart();
            }
        })

        resetButton.addEventListener('click', () => {
            clearInterval(startStopwatch);
            timerInProgress = false;
            resetButton.classList.add('animate__animated', 'animate__rubberBand')
            setTimeout(() => {
                resetButton.classList.remove('animate__animated', 'animate__rubberBand')
            }, 1000)
            clockBox.classList.remove('animate__animated', 'animate__heartBeat', 'animate__repeat-3')
            resetTimer(true);
        })
    }
}

main();



