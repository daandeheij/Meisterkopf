# Meisterkopf
An online, multiplayer javascript implementation of the classic game 'Mastermind'. For the TU Delft course CSE1500.

TODO:

V- Implement disable/enable elements in game.js
    V-Player disconnect
    V-announce guess, announce pins
    
- Requirements in assignment
    - Fullscreen mode
    - Checking resolution user and alert if below
    V- Aborting game after player disconnect
    - Upload screenshots page
    V- Show value of cookie
V- Keeping score (by client or server)
V- Display score to user win/lose
- 'Create a how to play'
- Sounds (non-exhaustive list)
    - Game start
    - Game end (win/lose)
    - dragging pin to board
    - submitting guess
    - submitting code
    - Background music
- CSS requirements (both splashscreen and gamescreen):
    - :hover, :active
    - ::after, ::before
    - position:relative, position:absolute
    - At least 1 animation, 1 transition
- Animations (non-exhaustive list)
    - Announcing guess and pins (perhaps let these fade in)
    - Splash: how to play appear
    - Optional: - Entering game screen (fade as well ?) smooth transition splash --> game
V- Check validity game move
    V- Is submitGuess by codebreaker
    V- Is submitCode by codemaker
    V- Is submitGuess a valid guess (4 colors)
V- Create board object
- Test whether NPM install and NPM start is sufficient for running server
- Reduce redundancy

-very optional
- 'Additional explanations on mouse over UI objects'
- Deploy
- Add option to play against specific user (using invite url/name/something)
    -let user specify #rounds
    - extra in-game label that shows current score

    - DONE'LaTeX'
    -DONE Messages