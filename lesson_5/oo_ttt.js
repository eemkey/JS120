class Square {
  static UNUSED_SQUARE = " ";
  static HUMAN_MARKER = "X";
  static COMPUTER_MARKER = "O";

  constructor(marker = " ") {
    this.marker = marker;
  }

  toString() {
    return this.marker;
  }
}

class Board {
  constructor() {
    this.squares = {};
    for (let counter = 1; counter <= 9; counter++) {
      this.squares[String(counter)] = new Square();
    }
  }
  
  display() {
    console.log("");
    console.log("     |     |");
    console.log(`  ${this.squares["1"]}  |  ${this.squares["2"]}  |  ${this.squares["3"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["4"]}  |  ${this.squares["5"]}  |  ${this.squares["6"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["7"]}  |  ${this.squares["8"]}  |  ${this.squares["9"]}`);
    console.log("     |     |");
    console.log("");
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
    this.board = new Board();
  }

  displayWelcomeMessage() {
    console.log("Welcome to Tic Tac Toe!");
  }

  displayGoodByeMessage() {
    console.log("Thanks for playing Tic Tac Toe!");
  }

  displayResults() {
    // shows the results of the game (win, lose, tie).
  }

  firstPlayerMoves() {
    // the first player makes a move.
  }

  secondPlayerMoves() {
    // the second player makes a move.
  }

  gameOver() {
    return false;
  }

  play() {
    // orchestrate game play.
    this.displayWelcomeMessage();

    while (true) {
      this.board.display();
      this.firstPlayerMoves();
      if (this.gameOver()) break;

      this.secondPlayerMoves();
      if (this.gameOver()) break;
      break;
    }

    this.displayResults();
    this.displayGoodByeMessage();
  }
}

let game = new TTTGame();
game.play();