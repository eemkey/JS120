const readline = require("readline-sync");
const POINTS_TO_WIN = 5;
const VALID_CHOICES = {
  rock: ["rock", "r"],
  paper: ["paper", "p"],
  scissors: ["scissors", "sc"],
  lizard: ["lizard", "l"],
  spock: ["spock", "sp"]
};

function createPlayer() {
  return {
    move: null,
    movesHistory: []
  };
}

function convertToFullValidChoiceName(input) {
  for (let prop in VALID_CHOICES) {
    if (VALID_CHOICES[prop].includes(input)) {
      return prop;
    }
  }
  return null;
}

function createHuman() {
  let playerObj = createPlayer();

  let humanObj = {
    choose() {
      let choice;

      while (true) {
        console.log("");
        console.log("Pick (r)ock, (p)aper, (sc)issors, (l)izard, or (sp)ock:");
        choice = readline.question();
        if ([].concat(...Object.values(VALID_CHOICES)).includes(choice)) break;
        console.log("Sorry, invalid choice.");
      }

      this.move = convertToFullValidChoiceName(choice);
      this.movesHistory.unshift(this.move);
    }
  };
  return Object.assign(playerObj, humanObj);
}

function createComputer() {
  let playerObj = createPlayer();

  let computerObj = {
    choose() {
      const choices = Object.keys(VALID_CHOICES);
      let randomIdx = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIdx];
      this.movesHistory.unshift(this.move);
    }
  };
  return Object.assign(playerObj, computerObj);
}

function createScoreBoard() {
  return {
    humanScore: 0,
    computerScore: 0
  };
}

// function createRule() {
//   // possible state? not clear whether Rules need state
// }

const RPSGame = {

  human: createHuman(),
  computer: createComputer(),
  scoreBoard: createScoreBoard(),

  WINNING_COMBOS: {
    rock: ["scissors", "lizard"],
    paper: ["rock", "spock"],
    scissors: ["paper", "lizard"],
    lizard: ["paper", "spock"],
    spock: ["rock", "scissors"]
  },

  displayWelcomeMessage() {
    console.log("Welcome to Rock, Paper, Scissors, Lizard, Spock!");
    console.log(`The first player to reach ${POINTS_TO_WIN} points is the grand winner.`);
  },

  displayGoodbyeMessage() {
    console.log("");
    console.log("Thanks for playing Rock, Paper, Scissors, Lizard, Spock!");
  },

  displayRoundWinner(outcome) {
    console.log("");
    if (outcome === "human") {
      console.log("You win this round!");
    } else if (outcome === "computer") {
      console.log("Computer wins this round!");
    } else {
      console.log("It's a tie this round!");
    }
  },

  displayPickedChoices(humanMove, computerMove) {
    console.log(`You chose ${humanMove.toUpperCase()}`);
    console.log(`The computer chose ${computerMove.toUpperCase()}`);
  },

  displayMovesHistory(humanMovesHistory, computerMovesHistory) {
    let num = 5;
    let lastHumanMoves = humanMovesHistory.slice(0, num);
    let lastComputerMoves = computerMovesHistory.slice(0, num);
    let spaces = 10;
    console.log(`   -Latest ${num} moves-`);
    console.log(`human          computer`);
    for (let count = 1; count <= num; count++) {
      let lengthOfString = String(lastHumanMoves[count - 1]).length;
      console.log(`${count}: ${lastHumanMoves[count - 1] === undefined ? " ".repeat(lengthOfString) : lastHumanMoves[count - 1]} ${" ".repeat(spaces - lengthOfString)} ${count}: ${lastComputerMoves[count - 1] === undefined ? " " : lastComputerMoves[count - 1]}`);
    }
    console.log("");
  },

  displayCurrentScore(scoreBoard) {
    console.log(`human: ${scoreBoard.humanScore} computer: ${scoreBoard.computerScore}`);
  },

  updateScoreBoard(outcome) {
    if (outcome === "human") {
      this.scoreBoard.humanScore++;
    } else if (outcome === "computer") {
      this.scoreBoard.computerScore++;
    }
  },

  isWinner(player1, player2) {
    return this.WINNING_COMBOS[player1].includes(player2);
  },

  determineRoundWinner(humanMove, computerMove) {
    if (this.isWinner(humanMove, computerMove)) {
      return "human";
    } else if (this.isWinner(computerMove, humanMove)) {
      return "computer";
    } else {
      return "tie";
    }
  },

  displayGrandWinner(scoreBoard) {
    console.log("");
    if (scoreBoard.humanScore === POINTS_TO_WIN) {
      console.log("You are the grand winner!");
    } else {
      console.log("Computer is the grand winner!");
    }
  },

  determineGrandWinner(scoreBoard) {
    return scoreBoard.computerScore === POINTS_TO_WIN ||
    scoreBoard.humanScore === POINTS_TO_WIN;
  },

  getPlayAgainAnswer() {
    console.log("");
    console.log("Would you like to play again? (y/n)");
    let answer = readline.question().toLowerCase();

    while ((answer[0] !== "n" && answer[0] !== "y") || answer.length !== 1) {
      console.log("Invalid answer. Would you like to play again? (y/n)");
      answer = readline.question().toLowerCase();
    }
    return answer;
  },

  isPlayAgain(answer) {
    return answer === "y";
  },

  playRound() {
    let human = this.human;
    let computer = this.computer;
    human.choose();
    computer.choose();
    console.clear();
    let outcome = this.determineRoundWinner(human.move, computer.move);
    this.updateScoreBoard(outcome);
    this.displayMovesHistory(human.movesHistory, computer.movesHistory);
    this.displayPickedChoices(human.move, computer.move);
    this.displayRoundWinner(outcome);
    this.displayCurrentScore(this.scoreBoard);
  },

  play() {
    while (true) {
      console.clear();
      this.displayWelcomeMessage();
      this.scoreBoard = createScoreBoard();
      while (!this.determineGrandWinner(this.scoreBoard)) {
        this.playRound();
      }

      this.displayGrandWinner(this.scoreBoard);
      if (!this.isPlayAgain(this.getPlayAgainAnswer())) break;
    }

    this.displayGoodbyeMessage();
  }
};

RPSGame.play();