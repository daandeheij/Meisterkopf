
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
    for(var j = 0; j < numberOfCodeSlots; j++){
        content += '<div class="code-peg-grid-item"><div id="guess-' + i + '-' + j + '" class="code-peg-slot" ondrop="drop(event)" ondragover="allowDrop(event)"></div></div>';
    }

    content += '<div class="key-peg-grid">';

    // Generates a 2-by-2 grid of key slots.
    for(var j = 0; j < numberOfKeySlots; j++){
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
for(var i = 0; i < numberOfCodeSlots; i++){
    content += '<div class="code-peg-grid-item"><div id="solution-' + i + '" class="code-peg-slot"></div></div>';
}

// Close the div.
content += '</div>';

// Add the generated html to the solution element.
solution.innerHTML += content;