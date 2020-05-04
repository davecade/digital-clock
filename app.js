const hours_span = document.getElementById('hours');
const minutes_span = document.getElementById('minutes');
const seconds_span = document.getElementById('seconds');

function refreshClock(){
    let refresh=1000; // Refresh rate in milli seconds
    mytime=setTimeout('clock();',refresh)
}

function clock() {
    let current_time = new Date();

    if (current_time.getHours() < 10) {
        hours_span.innerHTML = `0${current_time.getHours()}`;
    } else {
        hours_span.innerHTML = current_time.getHours();
    }


    if (current_time.getMinutes() < 10) {
        minutes_span.innerHTML = `0${current_time.getMinutes()}`;
    } else {
        minutes_span.innerHTML = current_time.getMinutes();
    }
        
    
    if (current_time.getSeconds() < 10) {
        seconds_span.innerHTML = `0${current_time.getSeconds()}`;
    } else {
        seconds_span.innerHTML = current_time.getSeconds();
    }
    refreshClock();
}

clock();