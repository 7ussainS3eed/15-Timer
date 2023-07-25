let hider = function(el, el2) {
    el.style.display = "none";
    el2.style.display = "block";
}
let page = document.querySelector("html");
let off = document.querySelector(".off");
let on = document.querySelector(".on");
if (localStorage.getItem("change")) {
    page.style.filter = "invert(1)";
    hider(off, on);
}
off.onclick = function() {
    page.style.filter = "invert(1)";
    hider(off, on);
    localStorage.setItem("change", 1);
}
on.onclick = function() {
    page.style.filter = "invert(0)";
    hider(on, off);
    localStorage.removeItem("change");
}

let cont = document.querySelector(".cont");
let setting = function(el , el2, el3) {
    el.onclick = function() {
        el.style.border = "3px solid";
    }
    el.onblur = function() {
        el.style.border = "2px solid";
    }
    el.onchange = function() {
        for (i = 0; i < el.value.length; i++) {
            if(el.value[i] == ".") {
                if (i == 1) {
                    el.value = `0${el.value[i-1]}`;
                }
                else {
                    el.value = `${el.value[i-2]}${el.value[i-1]}`;
                }
                break;
            }
        }
        if (el.value < 10 && el.value[0] != 0 && el.value != 0) {
            el.value = `0${el.value}`;
        }
        else if (el.value == 0 | el.value == "") {
            el.value = "00";
        }
        else {
            el.value = `${el.value[el.value.length-2]}${el.value[el.value.length-1]}`;
        }
        if (el.value != 0 | el2.value != 0 | el3.value != 0) {
            cont.style.display = "flex";
        }
        else {
            cont.style.display = "none";
        }
    }
}
let hours = document.querySelector(".hours"); 
let minutes = document.querySelector(".minutes");
let seconds = document.querySelector(".seconds");
setting(hours, minutes, seconds);
setting(minutes, hours, seconds);
setting(seconds, hours, minutes);
hours.oninput = function () {
    if (hours.value > 23 | hours.value < 0 | (hours.value != 0 && hours.value != ""
    && Number.isInteger(parseInt(hours.value)) == false) 
    | (hours.value[hours.value.length-3] == 0 && hours.value[hours.value.length-2] == "."
    && hours.value[hours.value.length-1] != 0)
    | (hours.value[hours.value.length-3] != 0 && hours.value[hours.value.length-2] == "."
    && hours.value[hours.value.length-1] != 0)) {
        alert("Hours value must be an integer number in the range from 0 to 23");
        hours.value = "00";
    }
    if (hours.value != 0 | minutes.value != 0 | seconds.value != 0) {
        cont.style.display = "flex";
    }
    else {
        cont.style.display = "none";
    }
}
let setting2 = function(el, el2) {
    el.oninput = function () {
        if (el.value > 59 | el.value < 0 | (el.value != 0 && el.value != "" 
        && Number.isInteger(parseInt(el.value)) == false) 
        | (el.value[el.value.length-3] == 0 && el.value[el.value.length-2] == "." 
        && el.value[el.value.length-1] != 0)
        | (el.value[el.length-3] != 0 && el.value[el.value.length-2] == "." && el.value[el.value.length-1] != 0)) {
            alert("Minutes and seconds values must be integer numbers in the range from 0 to 59");
            el.value = "00";
        }
        if (hours.value != 0 | el.value != 0 | el2.value != 0) {
            cont.style.display = "flex";
        }
        else {
            cont.style.display = "none";
        }
    }
}
setting2(minutes, seconds);
setting2(seconds, minutes);

let work = document.querySelector(".work");
let hours3 = document.querySelectorAll(".hours3");
let minutes3 = document.querySelectorAll(".minutes3");
let seconds3 = document.querySelectorAll(".seconds3");
let hours2 = document.querySelector(".hours2");
let minutes2 = document.querySelector(".minutes2");
let seconds2 = document.querySelector(".seconds2");
let slic = function(el) {
    if (el.innerHTML < 10) {
        el.innerHTML = ("0" + el.innerHTML).slice(-2);
    }
};
let icon0 = document.querySelector(".icon0");
let icon = document.querySelector(".icon");
let icon5 = document.querySelector(".icon5");
let icon2 = document.querySelector(".icon2");
let cont2 = document.querySelector(".cont2");
let interval;
let timer = new Audio("./sounds/timer.mp3");
document.querySelector(".start").onclick = function() {
    new Audio("./sounds/go.mp3").play();
    hider(document.querySelector(".pre"), work);
    hours3[0].innerHTML = hours.value;
    minutes3[0].innerHTML = minutes.value;
    seconds3[0].innerHTML = seconds.value; 
    hours2.innerHTML = hours.value;
    minutes2.innerHTML = minutes.value;
    seconds2.innerHTML = seconds.value;
    if (hours2.innerHTML != 0 && minutes2.innerHTML == 0 && seconds2.innerHTML == 0) {
        setTimeout(function() {
            hider(icon0, icon);
            hider(icon5, icon2);
            hours2.innerHTML--;
            timer.play();
            slic(hours2);
            minutes2.innerHTML = 59;
            seconds2.innerHTML = 59;
            cont2.style.display = "flex";
            fan1();
        }, 1000);
    }
    else if (minutes2.innerHTML != 0 && seconds2.innerHTML == 0) {
        setTimeout(function() {
            hider(icon0, icon);
            hider(icon5, icon2);
            minutes2.innerHTML--;
            timer.play();
            slic(minutes2);
            seconds2.innerHTML = 59;
            cont2.style.display = "flex";
            fan1();
        }, 1000);
    }
    else if (hours2.innerHTML != 0 && minutes2.innerHTML == 0 && seconds2.innerHTML != 0) {
            interval = setInterval(function() {
            hider(icon0, icon);
            hider(icon5, icon2);
            seconds2.innerHTML--;
            timer.play();
            slic(seconds2);
            cont2.style.display = "flex";
            if (seconds2.innerHTML == -1) {
                clearInterval(interval);
                hours2.innerHTML--;
                slic(hours2);
                minutes2.innerHTML = 59;
                seconds2.innerHTML = 59;
                fan1();
            }
        }, 1000);
    }
    else {
        interval = setTimeout(function() {
            hider(icon0, icon);
            hider(icon5, icon2);
            cont2.style.display = "flex";
        }, 1000);
        fan1();
    }
}

let interval2;
let fan1 = function() {
        interval2 = setInterval(function() {
        seconds2.innerHTML--;
        if (hours2.innerHTML != 0 | seconds2.innerHTML != 0 | minutes2.innerHTML != 0) {
            timer.play();
        }
        else {
            new Audio("./sounds/alarm.mp3").play();
            setInterval(function() {
                new Audio("./sounds/alarm.mp3").play();
            }, 29000);
            hider(work, document.querySelector(".last"));
            hours3[1].innerHTML = hours.value;
            minutes3[1].innerHTML = minutes.value;
            seconds3[1].innerHTML = seconds.value;
        }
        slic(seconds2);
        if (seconds2.innerHTML == 0) {
            clearInterval(interval2);
            fan2();
        }
    }, 1000);
}

let fan2 = function() {
    if (minutes2.innerHTML != 0) {
        setTimeout(function() {
            minutes2.innerHTML--;
            slic(minutes2);
            seconds2.innerHTML = 60;
        }, 1000);
        fan1();
    }
    if (minutes2.innerHTML == 0 && hours2.innerHTML != 0) {
        setTimeout(function() {
            hours2.innerHTML--;
            slic(hours2)
            minutes2.innerHTML = 59;
            seconds2.innerHTML = 60;
        }, 1000)
        fan1();
    }
}

document.querySelector(".reset").onclick = function() {
    hours.value = "00";
    minutes.value = "00";
    seconds.value = "00";
    cont.style.display = "none";
}

let stop = document.querySelector(".stop");
let resume = document.querySelector(".resume");
let icon3 = document.querySelector(".icon3");
let change = function(el, el2, el3, el4) {
    el.style.display = "none";
    el2.style.display = "block";
    el3.style.display = "none";
    el4.style.display = "block";
}
stop.onclick = function() {
    clearInterval(interval);
    clearInterval(interval2);
    change(stop, resume, icon, icon3);
}
resume.onclick = function() {
    fan1();
    change(resume, stop, icon3, icon);
}

let reload = function(el) {
    el.onclick = function() {
        location.reload();
    }
}
reload(document.querySelector(".give"));

let mute = document.querySelector(".mute");
let unmute = document.querySelector(".unmute");
let icon4 = document.querySelector(".icon4");
mute.onclick = function() {
    timer = new Audio("./sounds/mute.mp3");
    change(mute, unmute, icon2, icon4);
}
unmute.onclick = function() {
    timer = new Audio("./sounds/timer.mp3");
    change(unmute, mute, icon4, icon2);
}

reload(document.querySelector(".back"));