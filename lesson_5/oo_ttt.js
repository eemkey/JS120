let readline = require("readline-sync");

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

  setMarker(marker) {
    this.marker = marker;
  }
}

class Board {
  constructor() {
    this.squares = {};
    for (let counter = 1; counter <= 9; counter++) {
      this.squares[String(counter)] = new Square();
    }
  }
  
  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);

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

class Player {
  constructor(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);

  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);

  }
}

class TTTGame {
  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
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

  humanMoves() {
    let choice;

    while(true) {
      choice = readline.question("Choose a square between 1 and 9: ");
      let integerVal = parseInt(choice, 10);
      if (integerVal >= 1 && integerVal <= 9) {
        break;
      }

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }

  computerMoves() {
    let choice = Math.floor((Math.random() * 9) + 1);
    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  gameOver() {
    return false;
  }

  play() {
    // orchestrate game play.
    this.displayWelcomeMessage();

    while (true) {
      this.board.display();
      this.humanMoves();
      this.board.display();
      if (this.gameOver()) break;

      this.computerMoves();
      this.board.display();
      if (this.gameOver()) break;
      break;
    }

    this.displayResults();
    this.displayGoodByeMessage();
  }
}

let game = new TTTGame();
game.play();