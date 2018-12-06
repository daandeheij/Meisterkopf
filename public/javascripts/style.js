// Define the following color constants:
const YELLOW = "#ffd08e";
const PINK = "#efc3f5";
const BLUE = "#5273af";
const GREEN = "#bcbd8b";
const RED = "#d35269";
const BROWN = "#704c55";

// Define some constant properties of the board.
const NUMBEROFCODESLOTS = 4;
const NUMBEROFKEYSLOTS = 4;

var board = new Board();
var sidebar = new Sidebar();

function Board(){

    this.setup = function(){
        //generates the rows of the board
        // Find the elements with the guesses and solutions ids.
        var guesses = document.getElementById('guesses');
        var solution = document.getElementById('solution');

        // Declare an empty content string, in which the board html will be generated.
        var content = '';

        // Generates 12 rows of code and key slots.
        for (var i = 0; i < MAXGUESSES + 1; i++) {
            content += '<div class="code-peg-grid hidden" id="row' + i + '">';

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
        content = '<div class="code-peg-grid" id="solutionrow">';
        // Generate 4 columns of the solution code slots.
        for (var i = 0; i < NUMBEROFCODESLOTS; i++) {
            content += '<div class="code-peg-grid-item"><div id="solution-' + i + '" class="code-peg-slot" ondrop="drop(event)" ondragover="allowDrop(event)"></div></div>';
        }

        // Close the div.
        content += '</div>';

        // Add the generated html to the solution element.
        solution.innerHTML += content;
    }

    this.reset = function(){
        for (var i = 0; i < MAXGUESSES + 1; i++) {
            for (var j = 0; j < NUMBEROFCODESLOTS; j++) {
                board.hideRow(j);
                var codeslot = document.getElementById("guess-" + i + '-' + j);
                var keyslot = document.getElementById("key-" + i + '-' + j);
                codeslot.style.backgroundColor = "#f1f1f1";
                keyslot.style.backgroundColor = "#a5a9b7";
            }
        }
        for (var i = 0; i < 4; i++)
        {
            board.hideSolution();
            var solutionslot = document.getElementById("solution-" + i);
            solutionslot.style.backgroundColor = "#f1f1f1";
        }
    }

    this.disable = function(){
        var boardElement = document.getElementById("board");
        boardElement.classList.add("disabled");
    }

    this.enable = function(){
        var boardElement = document.getElementById("board");
        boardElement.classList.remove("disabled");
    }

    this.show = function(){
        var boardElement = document.getElementById("board");
        boardElement.classList.remove("hidden");
    }

    this.hide = function(){
        var boardElement = document.getElementById("board");
        boardElement.classList.add("hidden");
    }

    this.showRow = function(row){
        var rowElement = document.getElementById("row" + row);
        rowElement.classList.remove("hidden");
    }

    this.hideRow = function(row){
        var rowElement = document.getElementById("row" + row);
        rowElement.classList.add("hidden");
    }

    this.showSolution = function(){
        var rowElement = document.getElementById("solution");
        rowElement.classList.remove("hidden");
    }

    this.hideSolution = function(){
        var rowElement = document.getElementById("solution");
        rowElement.classList.add("hidden");
    }

    this.showColorPicker = function(){
        var colorPickerElement = document.getElementById("color-picker");
        colorPickerElement.classList.remove("hidden");
    }

    this.hideColorPicker = function(){
        var colorPickerElement = document.getElementById("color-picker");
        colorPickerElement.classList.add("hidden");
    }

    this.showButton = function(){
        var button = document.getElementById("submit-button");
        button.classList.remove("hidden");
    }

    this.hideButton = function(){
        var button = document.getElementById("submit-button");
        button.classList.add("hidden");
    }

    this.setKey = function(row, pin, color){
        var pinToChange = document.getElementById('key-' + row + '-' + pin);
        pinToChange.style.backgroundColor = color;
    }

    this.getGuess = function(row){
        var guess = [];

        for(j = 0; j < NUMBEROFCODESLOTS; j++)
        {
            var codeslot = document.getElementById("guess-" + row + '-' + j);
            var color = codeslot.style.backgroundColor;

            switch(color){
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

    this.setGuess = function(row, guess){
        for(j = 0; j < 4; j++)
        {
            var codeslot = document.getElementById("guess-" + row + '-' + j);

            switch(guess[j]){
                case "YELLOW":
                codeslot.style.backgroundColor = YELLOW;
                    break;
                case "PINK":
                codeslot.style.backgroundColor = PINK;
                    break;
                case "BLUE":
                codeslot.style.backgroundColor = BLUE;
                    break;
                case "GREEN":
                codeslot.style.backgroundColor = GREEN;
                    break;
                case "RED":
                codeslot.style.backgroundColor = RED;
                    break;
                case "BROWN":
                codeslot.style.backgroundColor = BROWN;
                    break;
            }
        }
    }

    this.getSolution = function(){
        var guess = [];

        for(j = 0; j < NUMBEROFCODESLOTS; j++)
        {
            var codeslot = document.getElementById("solution-" + j);
            var color = codeslot.style.backgroundColor;

            switch(color){
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
}

function Sidebar(){

    this.startTime = null;
    this.scoreLabel = document.getElementById("scoreLabel");
    this.timeLabel = document.getElementById("timeLabel");
    this.statusLabel = document.getElementById("statusLabel");
    this.roundLabel = document.getElementById("roundLabel");

    this.updateClock = function(){
        var currentTime = Math.floor(Date.now() / 1000);
        var elapsed = currentTime - sidebar.startTime;

        var minutes = Math.floor(elapsed / 60);
        var seconds = Math.floor(elapsed % 60);

        minutes = sidebar.prettifyTime(minutes);
        seconds = sidebar.prettifyTime(seconds);

        this.timeLabel.innerHTML = "TIME " + minutes + ":" + seconds;     
    }

    // Helper function for updateClock. Adds leading zeroes
    this.prettifyTime = function(i) {
        // add zero in front of numbers < 10
        if (i < 10) {
            i = "0" + i;
        };
        return i;
    }

    this.setScore = function(score){
        scoreLabel.innerHTML = "SCORE " + score;
    }

    this.setStatus = function(status) {
        statusLabel.innerHTML = status;
    }

    this.setRound = function(round) {
        roundLabel.innerHTML = "ROUND " + round + "/2";
    }

    this.disable = function(){
        var sidebarElement = document.getElementById("side-bar");
        sidebarElement.classList.add("disabled");
    }

    this.enable = function(){
        var sidebarElement = document.getElementById("side-bar");
        sidebarElement.classList.remove("disabled");
    }

    this.hide = function(){
        var sidebarElement = document.getElementById("side-bar");
        sidebarElement.classList.add("hidden");
    }

    this.show = function(){
        var sidebarElement = document.getElementById("side-bar");
        sidebarElement.classList.remove("hidden");
    }
}

function allowDrop(event){
    event.preventDefault();
}

function drag(event){
    event.dataTransfer.setData("id", event.target.id);
}

function drop(event){
    var id = event.dataTransfer.getData("id")

    switch (id) {
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