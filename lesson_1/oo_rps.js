const readline = require("readline-sync");
/* RPS is a two player game in which each player chooses one of three possible moves: rock, paper, or scissors. The winner is chosen based on the following rules:
rock crushes scissors (rock wins)
scissors cuts paper (scissors wins)
paper wraps rock (paper wins)
if both players choose the same move, the game is a tie

Nouns: player, move, rule
Verbs: choose, compare

Player
  - choose
Move
Rule

???
  - compare
*/

function createPlayer(playerType) {
  return {
    playerType: playerType,
    move: null,

    choose() {
      if (this.isHuman()) {
        let choice;

        while (true) {
          console.log("Please choose rock, paper, or scissors:");
          choice = readline.question();
          if (["rock", "paper", "scissors"].includes(choice)) break;
          console.log("Sorry, invalid choice.");
        }

        this.move = choice;

      } else {
        const choices = ["rock", "paper", "scissors"];
        let randomIdx = Math.floor(Math.random() * choices.length);
        this.move = choices[randomIdx];
      }
    },

    isHuman() {
      return this.playerType === "human";
    }
  };
}

function createMove() {
  return {
    // possible state: type of move (rock, paper, scissors)
  };
}

function createRule() {
  // possible state? not clear whether Rules need state
}

let compare = function(move1, move2) {
  // not yet implemented
};

const RPSGame = {
  human: createPlayer("human"),
  computer: createPlayer("computer"),

  displayWelcomeMessage() {
    console.log("Welcome to Rock, Paper, Scissors!");
  },
  displayGoodbyeMessage() {
    console.log("Thanks for playing, Rock, Paper, Scissors. Goodbye!");
  },
  displayWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;
    console.log(`You chose ${humanMove}`);
    console.log(`The computer chose ${computerMove}`);

    if ((humanMove === "rock" && computerMove === "scissors") ||
        (humanMove === "paper" && computerMove === "rock") ||
        (humanMove === "scissors" && computerMove === "paper")) {
          console.log("You win!");
    } else if ((humanMove === "rock" && computerMove === "paper") ||
               (humanMove === "paper" && computerMove === "scissors") ||
               (humanMove === "scissors" && computerMove === "rock")) {
          console.log("Computer wins!");
    } else {
      console.log("It's a tie");
    }
  },

  playAgain() {
    console.log("Would you like to play again? (y/n)");
    let answer = readline.question();
    return answer.toLowerCase()[0] === "y";
  },
  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      if (!this.playAgain()) break;
    }
    this.displayGoodbyeMessage();
  }
};

RPSGame.play();