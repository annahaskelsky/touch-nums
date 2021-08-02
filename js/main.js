'use strict'

var elTBody = document.querySelector('tbody');
var elInfo = document.querySelector('.info');
var elStopwatch = document.querySelector('.stopwatch');

var gTableSize = Math.sqrt(document.querySelector('.checkbox').value);
var gNextNum = 1;
var gClickedCards = 0;

var gIsTimer = false;
var startingTime;

createBoard();

function init(elRadio) {
    gTableSize = Math.sqrt(+(elRadio.value));
    createBoard();
}

function createBoard() {
    var nums = shuffleArr();
    var strHTML = '';
    for (var i = 0; i < gTableSize; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < gTableSize; j++) {
            strHTML += `<td><div onclick="cellClicked(this)">${nums.pop()}</div></td>`
        }
        strHTML += '</tr>'
    }
    elTBody.innerHTML = strHTML;
}

function cellClicked(elCell) {
    if (+(elCell.innerText) === gNextNum) {
        if (!gIsTimer) {
            gIsTimer = true;
            startingTime = new Date();
            startInterval();
        }
        gNextNum++;
        gClickedCards++;
        elCell.style.backgroundColor = '#ed8b10';
        elInfo.style.visibility = 'hidden';
    }
    if (gClickedCards === gTableSize ** 2) {
        gIsTimer = false;
        stopInterval();
        elInfo.style.visibility = 'visible';
        elInfo.innerHTML = '<button onclick="handlePlayAgain()">Start Over</button>'
    }
}

function shuffleArr() {
    var nums = [];
    for (var i = 1; i <= gTableSize ** 2; i++) {
        nums.push(i);
    }
    for (i = 0; i < nums.length; i++) {
        var randomIdx = Math.floor(Math.random() * nums.length);
        var temp = nums[i];
        nums[i] = nums[randomIdx];
        nums[randomIdx] = temp;
    }
    return nums;
}

function handlePlayAgain() {
    elStopwatch.innerText = '00:00:000';
    elTBody.innerHTML = '';
    elInfo.innerHTML = 'Click the first number to start.'
    gNextNum = 1;
    gClickedCards = 0;
    createBoard();
}

// Stopwatch
var interval;
function startInterval() {
    interval = setInterval(getTimer, 1);
}

function stopInterval() {
    clearInterval(interval);
}

function totalGameTime() {
    var currentTime = new Date();
    return currentTime.getTime() - startingTime.getTime();
}

function getTimer() {
    var gameTimeMs = totalGameTime();
    var formattingString = formatTime(gameTimeMs);
    elStopwatch.innerText = formattingString;
}

function formatTime(totalMS) {
    var gameTimeSec = totalMS / 1000;
    var gameTimeSecNew = Math.floor(gameTimeSec);
    var gameTimeMin = gameTimeSec / 60;

    gameTimeMin = Math.floor(gameTimeMin);
    gameTimeSec = Math.floor(gameTimeSec - (gameTimeMin * 60));
    totalMS = totalMS - (gameTimeSecNew * 1000);

    var gameTimeMinFinal = gameTimeMin < 10 ? ('0' + gameTimeMin) : gameTimeMin;
    var gameTimeSecFinal = gameTimeSec < 10 ? ('0' + gameTimeSec) : gameTimeSec;
    var gameTimeMsFinal = (String(totalMS).slice(0, 3)) < 10 ? ('0' + (String(totalMS).slice(0, 2))) : (String(totalMS).slice(0, 3));
    return `${gameTimeMinFinal}:${gameTimeSecFinal}:${gameTimeMsFinal}`;
}

