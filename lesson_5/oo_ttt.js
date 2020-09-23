let readline = require("readline-sync");

class Square {
  static UNUSED_SQUARE = " ";
  static HUMAN_MARKER = "X";
  static COMPUTER_MARKER = "O";
  static MIDDLE_SQUARE = "5";

  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }

  toString() {
    return this.marker;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }
}

class Board {

  constructor() {
    this.reset();
  }

  reset() {
    this.squares = {};
    for (let counter = 1; counter <= 9; counter++) {
      this.squares[String(counter)] = new Square();
    }
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.isUnusedSquare(key));
  }

  isUnusedSquare(key) {
    return this.squares[key].isUnused();
  }

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });

    return markers.length;
  }

  isFull() {
    return this.unusedSquares().length === 0;
  }

  displayWithClear() {
    console.clear();
    console.log("");
    console.log("");
    console.log("");
    this.display();
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

class Player {
  constructor(marker) {
    this.marker = marker;
    this.score = 0;
  }

  getMarker() {
    return this.marker;
  }

  getScore() {
    return this.score;
  }

  incrementScore() {
    this.score += 1;
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

  static MATCH_GAMES = 3;

  static joinOr(choices, firstDelimiter = ", ", optionalLastDelimiter = "or") {
    let numOfChoices = choices.length;
    if (numOfChoices <= 2) {
      return choices.join(optionalLastDelimiter);
    }
    let leftSide = choices.slice(0, -1);
    let lastChoice = choices.slice(-1);
    return `${leftSide.join(firstDelimiter)}${firstDelimiter}${optionalLastDelimiter} ${lastChoice}`;
  }

  static POSSIBLE_WINNING_ROWS = [
    [ "1", "2", "3" ],
    [ "4", "5", "6" ],
    [ "7", "8", "9" ],
    [ "1", "4", "7" ],
    [ "2", "5", "8" ],
    [ "3", "6", "9" ],
    [ "1", "5", "9" ],
    [ "3", "5", "7" ],
  ];

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Tic Tac Toe!");
    console.log("");
  }

  displayGoodByeMessage() {
    console.log("Thanks for playing Tic Tac Toe!");
    console.log("");
  }

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log("You win!");
    } else if (this.isWinner(this.computer)) {
      console.log("Computer wins.");
    } else {
      console.log("A tie game.");
    }
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Choose a square (${TTTGame.joinOr(validChoices)})`;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }

  computerMoves() {
    let choice = this.offensiveComputerMove();

    if (!choice) {
      choice = this.defensiveComputerMove();
    }

    if (!choice) {
      choice = this.pickMiddleSquare();
    }

    if (!choice) {
      choice = this.pickRandomSquare();
    }

    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  defensiveComputerMove() {
    return this.findAtRiskSquare(this.human);
  }

  offensiveComputerMove() {
    return this.findAtRiskSquare(this.computer);
  }

  findAtRiskSquare(player) {
    let possibleWinningRows = TTTGame.POSSIBLE_WINNING_ROWS.filter(row => {
      return this.board.countMarkersFor(player, row) === 2;
    });
    let choice;
    for (let row of possibleWinningRows) {
      let square = this.atRiskSquare(row);
      if (square) {
        choice = square;
        return choice;
      }
    }
    return null;
  }

  atRiskSquare(row) {
    for (let square of row) {
      if (this.board.unusedSquares().includes(square)) {
        return square;
      }
    }
    return null;
  }

  pickMiddleSquare() {
    if (this.board.unusedSquares().includes(Square.MIDDLE_SQUARE)) {
      return Square.MIDDLE_SQUARE;
    }
    return null;
  }

  pickRandomSquare() {
    let choice;
    let validChoices = this.board.unusedSquares();
    do {
      choice = Math.floor((Math.random() * 9) + 1).toString();
    } while (!validChoices.includes(choice));
    return choice;
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }

  updateMatchScore() {
    if (this.isWinner(this.human)) {
      this.human.incrementScore();
    } else if (this.isWinner(this.computer)) {
      this.computer.incrementScore();
    }
  }

  displayMatchScore() {
    console.log(`Player: ${this.human.getScore()} Computer: ${this.computer.getScore()}`);
    console.log("");
  }

  matchOver() {
    return this.human.getScore() === 3 || this.computer.getScore() === 3;
  }

  displayMatchResults() {
    if (this.human.getScore() === 3) {
      console.log("You won the match! Congratulations!");
    } else if (this.computer.getScore() === 3) {
      console.log("Computer won the match. Better luck next time!");
    } else {
      console.log("No one won the match.");
    }
  }

  playOneGame() {
    this.board.reset();
    this.board.display();
    this.displayMatchScore();
    while (true) {
      this.humanMoves();
      if (this.gameOver()) break;

      this.computerMoves();
      if (this.gameOver()) break;

      this.board.displayWithClear();
      this.displayMatchScore();
    }

    this.board.displayWithClear();
    this.displayResults();
  }

  playAgain() {
    let answer;
    const prompt = "Would you like to play again? (y/n)";
    while (true) {
      answer = readline.question(prompt);
      if (["y", "n"].includes(answer)) break;
      console.log("Invalid answer. Please choose 'y' or 'n'.");
    }
    console.clear();
    return answer === "y";
  }

  playMatch() {
    console.log(`First player to win ${TTTGame.MATCH_GAMES} games wins the match.`);
    while (true) {
      this.playOneGame();
      this.updateMatchScore();
      this.displayMatchScore();
      if (this.matchOver()) break;
      if (!this.playAgain()) break;
    }
    this.displayMatchResults();
  }

  play() {
    this.displayWelcomeMessage();
    this.playMatch();
    this.displayGoodByeMessage();
  }
}

let game = new TTTGame();
game.play();