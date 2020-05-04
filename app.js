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


function clock() {
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

    setTimeout('clock()',refresh) //calls clock function again to refresh
}

function checkZero(time) {
    if (time < 10) {return `0${time}`;}
    else {return time;}
}
    
function stopwatch(){

    if (miliseconds_stopWatch===100) {
        miliseconds_stopWatch=0;
        seconds_stopWatch++;
        seconds_span.innerHTML = checkZero(seconds_stopWatch);
    }

    if (seconds_stopWatch===59) {
        seconds_stopWatch=0;
        minutes_stopWatch++;
        minutes_span.innerHTML = checkZero(minutes_stopWatch);
    }

    if (minutes_stopWatch===59) {
        getMinutes=0;
        hours_stopWatch++
        hours_span.innerHTML = checkZero(hours_stopWatch);
    }

    miliseconds_stopWatch += 1
    miliseconds_div.innerHTML = checkZero(miliseconds_stopWatch);

    //miliseconds_div.innerHTML = current_time.getMilliseconds();
}

//clock();
//setInterval(stopwatch, 10);