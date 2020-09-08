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
        console.log("Please choose rock (r), paper (p), scissors (sc), lizard (l), or spock (sp):");
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
    rock: ["scissors", "lizard"],
    paper: ["rock", "spock"],
    scissors: ["paper", "lizard"],
    lizard: ["paper", "spock"],
    spock: ["rock", "scissors"]
  },

  displayWelcomeMessage() {
    console.log("Welcome to Rock, Paper, Scissors, Lizard, Spock!");
  },
  displayGoodbyeMessage() {
    console.log("Thanks for playing, Rock, Paper, Scissors, Lizard, Spock. Goodbye!");
  },
  displayWinner(outcome) {
    if (outcome === "human") {
      console.log("You win this round!");
    } else if (outcome === "computer") {
      console.log("Computer wins this round!");
    } else {
      console.log("It's a tie this round!");
    }
  },

  displayChoices(humanMove, computerMove) {
    console.log(`You chose ${humanMove}`);
    console.log(`The computer chose ${computerMove}`);
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

  isWinner(player1, player2) {
    return this.WINNING_COMBOS[player1].includes(player2);
  },

  determineOutcome(humanMove, computerMove) {
    if (this.isWinner(humanMove, computerMove)) {
      return "human";
    } else if (this.isWinner(computerMove, humanMove)) {
      return "computer";
    } else {
      return "tie";
    }
  },

  displayGrandWinner(scoreBoard) {
    if (scoreBoard.humanScore === POINTS_TO_WIN) {
      console.log("You are the grand winner!");
    } else {
      console.log("Computer is the grand winner!");
    }
  },

  detectGrandWinner(scoreBoard) {
    return scoreBoard.computerScore === POINTS_TO_WIN || scoreBoard.humanScore === POINTS_TO_WIN;
  },


  getPlayAgainAnswer() {
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

  play() {
    this.displayWelcomeMessage();

    while (true) {
      this.scoreBoard = createScoreBoard();
      while (!this.detectGrandWinner(this.scoreBoard)) {
        this.human.choose();
        this.computer.choose();
  
        let outcome = this.determineOutcome(this.human.move, this.computer.move);
        this.updateScoreBoard(outcome);
        this.displayChoices(this.human.move, this.computer.move);
        this.displayWinner(outcome);
        this.displayCurrentScore(this.scoreBoard);
      }

      this.displayGrandWinner(this.scoreBoard);
      if (!this.isPlayAgain(this.getPlayAgainAnswer())) break;
    }

    this.displayGoodbyeMessage();
  }
};

RPSGame.play();