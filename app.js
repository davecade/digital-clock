const hours_span = document.getElementById('hours');
const minutes_span = document.getElementById('minutes');
const seconds_span = document.getElementById('seconds');
const miliseconds_div = document.getElementById('miliseconds');


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
    
let seconds = 0
function startSeconds(){
    seconds += 1
    if (seconds < 10) {
        seconds_span.innerHTML = `0${seconds}`;
    } else {
        seconds_span.innerHTML = seconds;
    }

    //miliseconds_div.innerHTML = current_time.getMilliseconds();
}


//clock();
setInterval(startSeconds, 1000);