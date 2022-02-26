# Wordle

Test Cases:

- visualizer: seed=1123, guesses=earth,solid,belly : currently all first column letters are "eliminated"

`game-keyboard`

- WxH = 500x200px
- composed of `data-key` with WxH = 43x58px

Black: #000000
Yellow: #B59F3B
Gray: #3A3A3C
Green: #538D4E
Slate: #818384

TODO:

- handle component styling in top-level App presentation

Tile

- WxH = 62x62px
- Font Size = 32px
- Font Weight = Bold
- 5 rows x 6 cols

Components:

- Keyboard
- KeyboardKey
- Tile
- TileGrid
- NavBar

Events:

- KeyEnter (wire as if button clicked)
- KeyPress (wire as if typing)
- Backspace (subset of KeyEnter, KeyPress)
- Enter (subset of KeyEnter, KeyPress)
- Evaluate Guess & Show Hints
- Game End Condition Check

Handlers:

- when a key is pressed, we conditionally add it to an array of current guess letters
- when the enter key is pressed, try to play, handle invalid word case, clear buffer if successful
- append the guess to the wordle game turns property, update tiles & keyboard hints

Layout:

- navbar
- centered tileboard
- stick-bottom keyboard

RAISE,POUTY
