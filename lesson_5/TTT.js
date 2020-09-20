class Board {
  constructor() {
    // need a way to model the 3x3 grid.
  }
}

class Square {
  constructor() {
    // need to keep track of this square's marker.
  }
}

class Row {
  constructor() {
    // need a way to identify a row of 3 squares.
  }
}

class Marker {
  constructor() {
    // represents a player's piece on the board.
  }
}

class Player {
  constructor() {
    // "X" or "O" to represent the player's symbol.
  }

  mark() {
    // need to be able to mark the board with the player's marker.
    // how to access the board?
  }

  play() {
    // need a way for the player to play the game.
    // how to access the board? 
  }
}

class Human extends Player {
  constructor() {

  }
}

class Computer extends Player {
  constructor() {

  }
}

class TTTGame {
  constructor() {
    // need a board and two players.
  }

  play() {
    // orchestrate game play.
  }
}

let game = new TTTGame();
game.play();