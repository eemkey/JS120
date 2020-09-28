const readline = require("readline-sync");
const shuffle = require("shuffle-array");

class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
    this.hidden = false;
  }

  static SUITS = ["♥", "♠", "♦", "♣"];
  static RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

  getSuit() {
    return this.suit;
  }

  getRank() {
    return this.rank;
  }

  getCardVal() {
    if (isHidden()) {
      return "Hidden";
    } else {
      return `${this.getRank()}${this.getSuit()}`
    }
  }

  isHidden() {
    return this.hidden;
  }

  isAce() {
    return this.getSuit() === "A";
  }

  isJack() {
    return this.getSuit() === "J";
  }

  isQueen() {
    return this.getSuit() === "Q";
  }

  isKing() {
    return this.getSuit() === "K";
  }

  isFaceCard() {
    return this.isJack() || this.isQueen() || this.isKing();
  }

  hide() {
    this.hidden = true;
  }

  reveal() {
    this.hidden = false;
  }
}

class Deck {
  constructor() {
    this.cards = [];

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
    console.log("Welcome to 21!");
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
    console.log("Thanks for playing 21. Goodbye!");
  }
}

let game = new TwentyOneGame();
game.start();


