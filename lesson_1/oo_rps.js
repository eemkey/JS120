const readline = require("readline-sync");
const POINTS_TO_WIN = 3;
const VALID_CHOICES = {
  rock: ["rock", "r"],
  paper: ["paper", "p"],
  scissors: ["scissors", "sc"],
};

function createPlayer() {
  return {
    move: null
  };
}

function convertChoice(input) {
  for (let prop in VALID_CHOICES) {
    if (VALID_CHOICES[prop].includes(input)) {
      return prop;
    }
  }
}

function createHuman() {
  let playerObj = createPlayer();

  let humanObj = {
    choose() {
      let choice;

      while (true) {
        console.log("Please choose rock, paper, or scissors:");
        choice = readline.question();
        if ([].concat(...Object.values(VALID_CHOICES)).includes(choice)) break;
        console.log("Sorry, invalid choice.");
      }

      this.move = convertChoice(choice);
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
    }
  };
  return Object.assign(playerObj, computerObj);
}

function createScoreBoard() {
  return {
    pointsToWin: POINTS_TO_WIN,
    humanScore: 0,
    computerScore: 0
  }
}

// function createMove() {
//   return {
//     // possible state: type of move (rock, paper, scissors)
//   };
// }

// function createRule() {
//   // possible state? not clear whether Rules need state
// }

// let compare = function(move1, move2) {
//   // not yet implemented
// };



const RPSGame = {

  human: createHuman(),
  computer: createComputer(),
  scoreBoard: createScoreBoard(),

  WINNING_COMBOS: {
    rock: ["scissors"],
    paper: ["rock"],
    scissors: ["paper"],
  },

  displayWelcomeMessage() {
    console.log("Welcome to Rock, Paper, Scissors!");
  },
  displayGoodbyeMessage() {
    console.log("Thanks for playing, Rock, Paper, Scissors. Goodbye!");
  },
  displayWinner(outcome, humanMove, computerMove) {
    console.log(`You chose ${humanMove}`);
    console.log(`The computer chose ${computerMove}`);

    if (outcome === "human") {
      console.log("You win this round!");
    } else if (outcome === "computer") {
      console.log("Computer wins this round!");
    } else {
      console.log("It's a tie this round!");
    }
  },
  displayCurrentScore(scoreBoard) {
    console.log(`human: ${scoreBoard.humanScore} computer: ${scoreBoard.computerScore}`);
  },
  updateScoreBoard(outcome) {
    if (outcome === "human") {
      this.scoreBoard.humanScore++;
    } else if (outcome === "computer"){
      this.scoreBoard.computerScore++;
    }
  },
  determineOutcome(humanMove, computerMove) {
    if ((humanMove === "rock" && computerMove === "scissors") ||
        (humanMove === "paper" && computerMove === "rock") ||
        (humanMove === "scissors" && computerMove === "paper")) {
      return "human";
    } else if ((humanMove === "rock" && computerMove === "paper") ||
               (humanMove === "paper" && computerMove === "scissors") ||
               (humanMove === "scissors" && computerMove === "rock")) {
      return "computer";
    } else {
      return "tie";
    }
  },

  displayGrandWinner(scoreBoard) {
    if (scoreBoard.humanScore === POINTS_TO_WIN) {
      console.log("You win!");
    } else {
      console.log("Computer wins!");
    }
  },

  detectGrandWinner(scoreBoard) {
    return scoreBoard.computerScore === POINTS_TO_WIN || scoreBoard.humanScore === POINTS_TO_WIN;
  },


  playAgain() {
    console.log("Would you like to play again? (y/n)");
    let answer = readline.question();
    return answer.toLowerCase()[0] === "y";
  },

  play() {
    this.displayWelcomeMessage();

    while (true) {
      this.scoreBoard = createScoreBoard();
      while (!this.detectGrandWinner(this.scoreBoard)) {
        this.human.choose();
        this.computer.choose();
  
        let outcome = this.determineOutcome(this.human.move, this.computer.move);
        this.updateScoreBoard(outcome);
        this.displayWinner(outcome, this.human.move, this.computer.move);
        this.displayCurrentScore(this.scoreBoard);
      }

      this.displayGrandWinner(this.scoreBoard);
      if (!this.playAgain()) break;
    }

    this.displayGoodbyeMessage();
  }
};

RPSGame.play();