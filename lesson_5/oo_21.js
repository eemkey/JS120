const readline = require("readline-sync");
const shuffle = require("shuffle-array");

class Card {
  constructor() {

  }
}

class Deck {
  constructor() {
    // what state the deck needs
    // 52 cards
    // data structure to keep tract of the cards (array, object)
  }

  deal() {

  }
}

class Participant {
  constructor() {
    // what state?

  }
}

class Player extends Participant {
  constructor() {

  }

  hit() {

  }

  stay() {

  }

  isBusted() {

  }

  score() {

  }
}

class Dealer extends Participant {
  constructor() {

  }

  hit() {

  }

  stay() {

  }

  isBusted() {

  }

  score() {

  }

  hide() {

  }

  reveal() {

  }

  deal() {

  }
}

class TwentyOneGame {
  constructor() {

  }

  start() {
    this.displayWelcomeMessage();
    this.dealCards();
    this.showCards();
    this.playerTurn();
    this.dealerTurn();
    this.displayResult();
    this.displayGoodbyeMessage();
  }

  displayWelcomeMessage() {

  }

  dealCards() {

  }

  showCards() {

  }

  playerTurn() {

  }

  dealerTurn() {

  }

  displayResult() {

  }

  displayGoodbyeMessage() {

  }
}

let game = new TwentyOneGame();
game.start();


