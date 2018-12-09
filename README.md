# Meisterkopf
An online, multiplayer javascript implementation of the classic game 'Mastermind'. For the TU Delft course CSE1500.

BUGS:

- a guess [4x green] for [yellow, pink, green, brown] yields 1x black 1xwhite. should be 1x black....
- in 2nd round. Guessing correctly yields 'nice try, try again'

TODO:



- Requirements in assignment
    - Fullscreen mode
    - Checking resolution user and alert if below DONE!
    - Upload screenshots page

- CSS requirements (both splashscreen and gamescreen):
    - :hover, :active DONE!
    - ::after, ::before DONE!
    - position:relative, position:absolute
    - At least 1 animation, 1 transition DONE!

- 

- Test whether NPM install and NPM start is sufficient for running server
- Reduce redundancy

-very optional
- Deploy
- Add option to play against specific user (using invite url/name/something)
    -let user specify #rounds
    - extra in-game label that shows current score

    - DONE'LaTeX'
    -DONE Messages
    DONE - Implement disable/enable elements in game.js
    -Player disconnect
    -announce guess, announce pins
    -DONE- Aborting game after player disconnect
    -DONE - Show value of cookie
    Done - 'Create a how to play'
- Sounds (non-exhaustive list)
    - Game start
    - Game end (win/lose)
    - dragging pin to board
    - submitting guess
    - submitting code
    - Background music

    - Animations (non-exhaustive list) DONE FOR NOW
    - Announcing guess and pins (perhaps let these fade in)
    - Splash: how to play appear
    - Optional: - Entering game screen (fade as well ?) smooth transition splash --> game

    -DONE: Check validity game move
    - Is submitGuess by codebreaker
    - Is submitCode by codemaker
    - Is submitGuess a valid guess (4 colors)
- Create board object

not necessary

- 'Additional explanations on mouse over UI objects'