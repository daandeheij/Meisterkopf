# Meisterkopf
An online, multiplayer javascript implementation of the classic game 'Mastermind'. For the TU Delft course CSE1500.


BUGS:
- a guess [4x green] for [yellow, pink, green, brown] yields 1x black 1xwhite. should be 1x black....




TODO:
- Checking resolution user and alert if below
- Upload screenshots page
- Test whether NPM install and NPM start is sufficient for running server
- CSS
    - ::after, ::before
    - position:relative, position:absolute




OPTIONAL:
- Sounds
    - dragging pin to board
    - Background music
- Animations
    - Entering game screen (fade as well ?) smooth transition splash --> game
- Deploy
- Add option to play against specific user (using invite url/name/something)
    - let user specify #rounds
    - extra in-game label that shows current score




FINISHED:
- Implement disable/enable elements in game.js
     -Player disconnect
     -announce guess, announce pins
- Requirements in assignment
     - Fullscreen mode
     - Aborting game after player disconnect
    - Show value of cookie
- Display to user win/lose
- 'Create a how to play'
- Sounds (non-exhaustive list)
    - Game start
    - Game end (win/lose)
    - submitting guess
    - submitting code
- CSS requirements (both splashscreen and gamescreen):
     - :hover, :active
     - At least 1 animation, 1 transition
- Animations (non-exhaustive list)
    - Announcing guess and pins (perhaps let these fade in)
    - Splash: how to play appear
- Check validity game move
     - Is submitGuess by codebreaker
     - Is submitCode by codemaker
     - Is submitGuess a valid guess (4 colors)
- Create board object
- Reduce redundancy
- LaTeX
- Messages