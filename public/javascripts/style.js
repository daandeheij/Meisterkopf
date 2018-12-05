//define the following color constants:
const YELLOW = "#ffd08e";
const PINK = "#efc3f5";
const BLUE = "#5273af";
const GREEN = "#bcbd8b";
const RED = "#d35269";
const BROWN = "#704c55";

// Declare some properties of the board.
const NUMBEROFROWS = 12;
const NUMBEROFCODESLOTS = 4;
const NUMBEROFKEYSLOTS = 4;

//saves the current time in seconds (after page load) for the clock
//var startTime = Math.floor(Date.now() / 1000);
//get the counter object of document that needs to be updated
//var timecounter = document.getElementById("timelabel");
//call clock function every second
//window.setInterval(updateClock, 1000);

generateRows();

function clearBoard(){
    for (var i = 0; i < NUMBEROFROWS; i++) {
        for (var j = 0; j < NUMBEROFCODESLOTS; j++) {
            var codeslot = document.getElementById("guess-" + i + '-' + j);
            var keyslot = document.getElementById("key-" + i + '-' + j);
            codeslot.style.backgroundColor = "#f1f1f1";
            keyslot.style.backgroundColor = "#a5a9b7";
        }
    }
    for (var i = 0; i < 4; i++)
    {
        var solutionslot = document.getElementById("solution-" + i);
        solutionslot.style.backgroundColor = "#f1f1f1";
    }
}

function generateRows() {
    //generates the rows of the board
    // Find the elements with the guesses and solutions ids.
    guesses = document.getElementById('guesses');
    solution = document.getElementById('solution');

    // Declare an empty content string, in which the board html will be generated.
    var content = '';

    // Generates 12 rows of code and key slots.
    for (var i = 0; i < NUMBEROFROWS; i++) {
        content += '<div class="code-peg-grid">';

        // Generates 4 columns of code slots.
        for (var j = 0; j < NUMBEROFCODESLOTS; j++) {
            content += '<div class="code-peg-grid-item"><div id="guess-' + i + '-' + j + '" class="code-peg-slot" ondrop="drop(event)" ondragover="allowDrop(event)"></div></div>';
        }

        content += '<div class="key-peg-grid">';

        // Generates a 2-by-2 grid of key slots.
        for (var j = 0; j < NUMBEROFKEYSLOTS; j++) {
            content += '<div class="key-peg-grid-item"><div id="key-' + i + '-' + j + '" class="key-peg-slot"></div></div>';
        }

        // Close all the divs.
        content += '</div>';
        content += '</div>';
    }

    // Add the generated html to the guesses element.
    guesses.innerHTML += content;

    // Generate new html for the solution element.
    content = '<div class="code-peg-grid">';

    // Generate 4 columns of the solution code slots.
    for (var i = 0; i < NUMBEROFCODESLOTS; i++) {
        content += '<div class="code-peg-grid-item"><div id="solution-' + i + '" class="code-peg-slot" ondrop="drop(event)" ondragover="allowDrop(event)"></div></div>';
    }

    // Close the div.
    content += '</div>';

    // Add the generated html to the solution element.
    solution.innerHTML += content;
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("id", event.target.id);
}

function drop(event) {
    var data = event.dataTransfer.getData("id")

    switch (data) {
        case "color-picker-slot-0":
            event.target.style.backgroundColor = YELLOW;
            break;
        case "color-picker-slot-1":
            event.target.style.backgroundColor = PINK;
            break;
        case "color-picker-slot-2":
            event.target.style.backgroundColor = BLUE;
            break;
        case "color-picker-slot-3":
            event.target.style.backgroundColor = GREEN;
            break;
        case "color-picker-slot-4":
            event.target.style.backgroundColor = RED;
            break;
        case "color-picker-slot-5":
            event.target.style.backgroundColor = BROWN;
            break;
    }

    event.preventDefault();
}

function submit() {
    if(playerType == "codebreaker"){submitGuess();}
    else{submitCode();}
}

//sets a pin
function keypin(row, pin, color) {
    var pinToChange = document.getElementById('key-' + row + '-' + pin);
    pinToChange.style.backgroundColor = color;
}

//returns the colors of the row in an array
function getGuess(row){
    var guess = [];
    for(j=0; j<4; j++)
    {
        var currentCodePeg = document.getElementById("guess-" + row + '-' + j);
        var currentColor = currentCodePeg.style.backgroundColor;
        switch(currentColor){
            case "rgb(255, 208, 142)":
                guess.push("YELLOW");
                break;
            case "rgb(239, 195, 245)":
                guess.push("PINK");
                break;
            case "rgb(82, 115, 175)":
                guess.push("BLUE");
                break;
            case "rgb(188, 189, 139)":
                guess.push("GREEN");
                break;
            case "rgb(211, 82, 105)":
                guess.push("RED");
                break;
            case "rgb(112, 76, 85)":
                guess.push("BROWN");
                break;
        }
    }
    return guess;
}

function getSolution()
{
    var guess = [];
    for(j=0; j<4; j++)
    {
        var currentCodePeg = document.getElementById("solution-" + j);
        var currentColor = currentCodePeg.style.backgroundColor;
        switch(currentColor){
            case "rgb(255, 208, 142)":
                guess.push("YELLOW");
                break;
            case "rgb(239, 195, 245)":
                guess.push("PINK");
                break;
            case "rgb(82, 115, 175)":
                guess.push("BLUE");
                break;
            case "rgb(188, 189, 139)":
                guess.push("GREEN");
                break;
            case "rgb(211, 82, 105)":
                guess.push("RED");
                break;
            case "rgb(112, 76, 85)":
                guess.push("BROWN");
                break;
        }
    }
    return guess;
}

//Sets the codepegs of row to colors in array(4) guess
function setGuess(row, guess){
    for(j=0; j<4; j++)
    {
        var currentCodePeg = document.getElementById("guess-" + row + '-' + j);
        switch(guess[j]){
            case "YELLOW":
            currentCodePeg.style.backgroundColor = YELLOW;
                break;
            case "PINK":
            currentCodePeg.style.backgroundColor = PINK;
                break;
            case "BLUE":
            currentCodePeg.style.backgroundColor = BLUE;
                break;
            case "GREEN":
            currentCodePeg.style.backgroundColor = GREEN;
                break;
            case "RED":
            currentCodePeg.style.backgroundColor = RED;
                break;
            case "BROWN":
            currentCodePeg.style.backgroundColor = BROWN;
                break;
        }
    }
}

function setRound(round) {
    document.getElementById("roundlabel").innerHTML = "ROUND " + round + "/8"
}

function updateClock() {
    var curTime = Math.floor(Date.now() / 1000);
    var elapsed = curTime - startTime; 
    var minutes = Math.floor(elapsed / 60);
    var seconds = Math.floor(elapsed % 60);  
    minutes = prettifyTime(minutes);
    seconds = prettifyTime(seconds);
    timecounter.innerHTML = "TIME " + minutes + ":" + seconds;      
}

//helper function for updateClock. Adds leading zeroes
function prettifyTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}