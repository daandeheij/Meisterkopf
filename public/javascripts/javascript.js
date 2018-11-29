generateRows();
//saves the current time in seconds (after page load) for the clock
var startTime = Math.floor(Date.now() / 1000);
//get the counter object of document that needs to be updated
var timecounter = document.getElementById("timelabel");
//call clock function every second
window.setInterval(updateClock, 1000);

function generateRows() {
    //generates the rows of the board
    // Find the elements with the guesses and solutions ids.
    guesses = document.getElementById('guesses');
    solution = document.getElementById('solution');

    // Declare some properties of the board.
    var numberOfRows = 12;
    var numberOfCodeSlots = 4;
    var numberOfKeySlots = 4;

    // Declare an empty content string, in which the board html will be generated.
    var content = '';

    // Generates 12 rows of code and key slots.
    for (var i = 0; i < numberOfRows; i++) {
        content += '<div class="code-peg-grid">';

        // Generates 4 columns of code slots.
        for (var j = 0; j < numberOfCodeSlots; j++) {
            content += '<div class="code-peg-grid-item"><div id="guess-' + i + '-' + j + '" class="code-peg-slot" ondrop="drop(event)" ondragover="allowDrop(event)"></div></div>';
        }

        content += '<div class="key-peg-grid">';

        // Generates a 2-by-2 grid of key slots.
        for (var j = 0; j < numberOfKeySlots; j++) {
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
    for (var i = 0; i < numberOfCodeSlots; i++) {
        content += '<div class="code-peg-grid-item"><div id="solution-' + i + '" class="code-peg-slot"></div></div>';
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
            event.target.style.backgroundColor = "#ffd08e";
            keypin(0, 0, 'white');
            break;
        case "color-picker-slot-1":
            event.target.style.backgroundColor = "#efc3f5";
            break;
        case "color-picker-slot-2":
            event.target.style.backgroundColor = "#5273af";
            break;
        case "color-picker-slot-3":
            event.target.style.backgroundColor = "#bcbd8b";
            break;
        case "color-picker-slot-4":
            event.target.style.backgroundColor = "#d35269";
            break;
        case "color-picker-slot-5":
            event.target.style.backgroundColor = "#704c55";
            break;
    }

    event.preventDefault();
}

function submit() {
    console.log("CLICK");
}

function keypin(row, pin, color) {
    var pinToChange = document.getElementById('key-' + row + '-' + pin);
    pinToChange.style.backgroundColor = color;
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

