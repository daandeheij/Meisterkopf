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

var ui = new UI();
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
            content += '<div class="code-peg-grid hidden" id="row-' + i + '">';

            // Generates 4 columns of code slots.
            for (var j = 0; j < NUMBEROFCODESLOTS; j++) {
                content += '<div class="code-peg-grid-item"><div id="guess-' + i + '-' + j + '" class="code-peg-slot" ondrop="ui.drop(event)" ondragover="ui.allowDrop(event)"></div></div>';
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
            content += '<div class="code-peg-grid-item"><div id="solution-' + i + '" class="code-peg-slot" ondrop="ui.drop(event)" ondragover="ui.allowDrop(event)"></div></div>';
        }

        // Close the div.
        content += '</div>';

        // Add the generated html to the solution element.
        solution.innerHTML += content;
    }

    this.reset = function(){
        for (var i = 0; i < MAXGUESSES + 1; i++) {

            board.hideRow(i);

            for (var j = 0; j < NUMBEROFCODESLOTS; j++) {
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
        ui.disableElement("board");
    }

    this.enable = function(){
        ui.enableElement("board");
    }

    this.show = function(){
        ui.showElement("board");
    }

    this.hide = function(){
        ui.hideElement("board");
    }

    this.showRow = function(row){
        ui.showElement("row-" + row);
    }

    this.hideRow = function(row){
        ui.hideElement("row-" + row);
    }

    this.showSolution = function(){
        ui.showElement("solution");
    }

    this.hideSolution = function(){
        ui.hideElement("solution");
    }

    this.showColorPicker = function(){
        ui.showElement("color-picker");
    }

    this.hideColorPicker = function(){
        ui.hideElement("color-picker");
    }

    this.showButton = function(){
        ui.showElement("submit-button");
    }

    this.hideButton = function(){
        ui.hideElement("submit-button");
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
        ui.disableElement("side-bar");
    }

    this.enable = function(){
        ui.enableElement("side-bar");
    }

    this.hide = function(){
        ui.hideElement("side-bar");
    }

    this.show = function(){
        ui.showElement("side-bar");
    }
}

function UI(){
    this.disableElement = function(id){
        var element = document.getElementById(id);
        element.classList.add("disabled");
    }

    this.enableElement = function(id){
        var element = document.getElementById(id);
        element.classList.remove("disabled");
    }

    this.showElement = function(id){
        var element = document.getElementById(id);
        element.classList.remove("hidden");
    }

    this.hideElement = function(id){
        var element = document.getElementById(id);
        element.classList.add("hidden");
    }

    this.allowDrop = function(event){
        event.preventDefault();
    }
    
    this.drag = function(event){
        event.dataTransfer.setData("id", event.target.id);
    }
    
    this.drop = function(event){
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
}