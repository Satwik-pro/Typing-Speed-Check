const testWrapper = document.querySelectorAll(".test-wrapper")[1];
const testArea = document.querySelector("#test-area");
// const originText = document.querySelector("#origin-text p").innerHTML;

var originText = document.getElementById("test-input").value;

const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

let words = 0;
let totalSeconds = 0;
let res = 0;
let arrayWords = [];

function myFunction() {
    var inputText = prompt("Paste/Type The Input Text Here", "Paste/Type Here");
    originText = inputText;
    document.getElementById("test-input").value = originText;
}

var timer = [0,0,0,0];
var interval;
var timerRunning = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if(time <= 9) 
    time = "0" + time;
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = leadingZero(timer[0])+":"+leadingZero(timer[1])+":"+leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor(timer[3]/6000);
    timer[1] = Math.floor((timer[3]/100) - (timer[0]*60));
    timer[2] = Math.floor(timer[3] - timer[1]*100 - timer[0]*6000);
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0, textEntered.length);

    if(textEntered == originText) {
        testWrapper.style.borderColor = "green";
        arrayWords = originText.split(" ");
        words = arrayWords.length;
        totalSeconds = timer[0]*60 + timer[1];
        res = (words/totalSeconds)*60;
        document.getElementById("result").innerHTML = "Result = " + Math.floor(res) + " words/min";
        clearInterval(interval);
    } else {
        if(textEntered == originTextMatch) {
            testWrapper.style.borderColor = "blue";
        } else {
            testWrapper.style.borderColor = "red";
        }
    }
}

// Start the timer:
function start() {
    let textEnteredLength = testArea.value.length;
    if(textEnteredLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
}

// Reset everything:
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;
    document.getElementById("result").innerHTML = "Result = 0 words/min";
    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress",start,false);
testArea.addEventListener("keyup",spellCheck,false);
resetButton.addEventListener("click",reset,false);