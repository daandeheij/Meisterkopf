# Meisterkopf
An online, multiplayer javascript implementation of the classic game 'Mastermind'. For the TU Delft course CSE1500.

TODO:

- 'LaTeX'
    -Messages
    -
- 'Disable/enable relevant UI objects'
- Requirements in assignment
    - Fullscreen mode
    - Checking resolution user and alert if below
    - Aborting game after player disconnect
    - Upload screenshots page
    - Client-side cookie to report how many times user has accessed game
- Keeping score (by client or server), - Display to user win/lose
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
- Check validity game move
    - Is submitGuess by codebreaker
    - Is submitCode by codemaker
    - Is submitGuess a valid guess (4 colors)
- Create board object
- 'Additional explanations on mouse over UI objects'
- Test whether NPM install and NPM start is sufficient for running server
- Reduce redundancy

-very optional
- Deploy
- Add option to play against specific user (using invite url/name/something)
    -let user specify #rounds
    - extra in-game label that shows current score