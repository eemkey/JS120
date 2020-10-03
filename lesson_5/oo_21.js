const readline = require("readline-sync");
const shuffle = require("shuffle-array");

class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
    this.hidden = false;
  }

  static SUITS = ["♥", "♠", "♦", "♣"];
  static RANKS = ["2", "3", "4", "5", "6", "7",
    "8", "9", "10", "J", "Q", "K", "A"];

  getSuit() {
    return this.suit;
  }

  getRank() {
    return this.rank;
  }

  isHidden() {
    return this.hidden;
  }

  isAce() {
    return this.getRank() === "A";
  }

  isJack() {
    return this.getRank() === "J";
  }

  isQueen() {
    return this.getRank() === "Q";
  }

  isKing() {
    return this.getRank() === "K";
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

  toString() {
    if (this.isHidden()) {
      return "??";
    } else {
      return `${this.getRank()}${this.getSuit()}`;
    }
  }
}

class Deck {
  constructor() {
    this.makeNewShuffledDeck();
  }

  makeNewShuffledDeck() {
    this.deck = [];
    for (let suit of Card.SUITS) {
      for (let rank of Card.RANKS) {
        this.deck.push(new Card(suit, rank));
      }
    }
    this.shuffleDeck();
  }

  shuffleDeck() {
    shuffle(this.deck);
  }

  dealCardFaceDown() {
    let card = this.dealCardFaceUp();
    card.hide();
    return card;
  }

  dealCardFaceUp() {
    if (this.deck.length > 0) {
      return this.deck.pop();
    } else {
      this.makeNewShuffledDeck();
      return this.deck.pop();
    }
  }
}

let Hand = {
  resetHand() {
    this.hand = [];
  },

  addToHand(card) {
    this.hand.push(card);
  },

  showHand(caption) {
    console.log(caption);

    for (let card of this.hand) {
      console.log(`${card}`);
    }
  },

  getHand() {
    return this.hand;
  },

  revealHand() {
    for (let card of this.hand) {
      card.reveal();
    }
  }
};

class Player {
  static STARTING_MONEY = 5;
  static MONEY_GOAL = 10;

  constructor() {
    this.money = Player.STARTING_MONEY;
    this.name = "Player";
    this.resetHand();
  }

  winBet() {
    this.money += 1;
  }

  loseBet() {
    this.money -= 1;
  }

  isBroke() {
    return this.money <= 0;
  }

  isRich() {
    return this.money >= Player.MONEY_GOAL;
  }

  getMoney() {
    return this.money;
  }
}

class Dealer {
  constructor() {
    this.name = "Dealer";
    this.resetHand();
  }
}

Object.assign(Player.prototype, Hand);
Object.assign(Dealer.prototype, Hand);

class Game {
  static TARGET_SCORE = 21;
  static DEALER_STAY_SCORE = 17;

  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck = new Deck();
  }

  displayWelcomeMessage() {
    console.clear();
    console.log(`* Welcome to ${Game.TARGET_SCORE}!`);
    console.log(`* Your goal is to get as close to ${Game.TARGET_SCORE} without going over.`);
    console.log(`* You start with $${Player.STARTING_MONEY}. For every win, you get $1. For every loss, you lose $1.`);
    console.log(`* The game ends when you're broke ($0) or when you're rich ($${Player.MONEY_GOAL}).`);
    console.log("");
    console.log("");
  }

  displayGoodbyeMessage() {
    console.log("");
    console.log("Thanks for playing 21. Goodbye!");
  }

  displayMoney() {
    console.log(`Player has $${this.player.getMoney()}.`);
    console.log("");
  }

  displayBrokeOrRich() {
    if (this.player.isBroke()) {
      console.log("You're broke!");
    }

    if (this.player.isRich()) {
      console.log("You're rich!");
    }
  }

  displayScore(participant) {
    console.log(`${participant.name}'s score: ${this.calculateScore(participant)}`);
  }

  displayCards() {
    this.dealer.showHand("-Dealer's Hand-");
    this.displayScore(this.dealer);
    console.log("");
    console.log("");
    this.player.showHand("-Player's Hand-");
    this.displayScore(this.player);
  }

  displayWinner() {
    if (this.isWinner() === this.player) {
      console.log("Congrats, you win!");
    } else if (this.isWinner() === this.dealer) {
      console.log("Sorry, dealer wins.");
    } else {
      console.log("It's a tie.");
    }
    console.log("");
  }

  clearAndDisplayStats() {
    console.clear();
    this.displayCards();
    this.displayMoney();
  }

  updateMoney() {
    if (this.isWinner() === this.player) {
      this.player.winBet();
    } else if (this.isWinner() === this.dealer) {
      this.player.loseBet();
    }
  }

  calculateScore(hand) {
    let cards = hand.getHand();
    let score = cards.reduce((total, card) => total + this.getValueOf(card), 0);
    return this.adjustScoreForAces(cards, score);
  }

  adjustScoreForAces(cards, score) {
    cards.filter(card => card.isAce()).forEach(() => {
      if (score > Game.TARGET_SCORE) {
        score -= 10;
      }
    });
    return score;
  }

  getValueOf(card) {
    if (card.isHidden()) {
      return 0;
    } else if (card.isAce()) {
      return 11;
    } else if (card.isFaceCard()) {
      return 10;
    } else {
      return parseInt(card.getRank(), 10);
    }
  }

  dealCards() {
    this.player.resetHand();
    this.dealer.resetHand();

    this.player.addToHand(this.deck.dealCardFaceUp());
    this.dealer.addToHand(this.deck.dealCardFaceUp());
    this.player.addToHand(this.deck.dealCardFaceUp());
    this.dealer.addToHand(this.deck.dealCardFaceDown());
  }

  hit(hand) {
    hand.addToHand(this.deck.dealCardFaceUp());
  }

  isBust(hand) {
    return this.calculateScore(hand) > Game.TARGET_SCORE;
  }

  hitOrStay() {
    console.log("");
    let answer;

    while (true) {
      let prompt = "Do you want to hit(h) or stay(s)?";
      answer = readline.question(prompt).toLowerCase();
      if (["s", "h"].includes(answer)) break;
      console.log("Sorry that is not a valid choice.");
    }
    return answer;
  }

  playAgain() {
    console.log("");
    let answer;
    while (true) {
      answer = readline.question("Play again? (y/n)").toLowerCase();
      if (["y", "n"].includes(answer)) break;
      console.log("Invalid answer.");
    }
    return answer;
  }

  playerTurn() {
    while (true) {
      if (this.calculateScore(this.player) === Game.TARGET_SCORE) break;
      if (this.hitOrStay() === "h") {
        this.hit(this.player);
        this.clearAndDisplayStats();
      } else {
        break;
      }
      if (this.isBust(this.player) ||
      this.calculateScore(this.player) === Game.TARGET_SCORE) {
        break;
      }
    }
  }

  dealerTurn() {
    this.dealer.revealHand();
    this.clearAndDisplayStats();
    if (!this.isBust(this.player)) {
      while (true) {
        let score = this.calculateScore(this.dealer);
        if (score < Game.DEALER_STAY_SCORE) {
          this.hit(this.dealer);
          this.clearAndDisplayStats();
        } else {
          break;
        }
        if (this.isBust(this.dealer)) {
          break;
        }
      }
    }
  }

  isWinner() {
    let playerScore = this.calculateScore(this.player);
    let dealerScore = this.calculateScore(this.dealer);

    if (!this.isBust(this.player) &&
      ((playerScore > dealerScore) ||
      this.isBust(this.dealer))) {
      return this.player;
    } else if (!this.isBust(this.dealer) &&
      ((dealerScore > playerScore) ||
      this.isBust(this.player))) {
      return this.dealer;
    } else {
      return null;
    }
  }

  playOneGame() {
    this.dealCards();
    this.displayCards();
    this.displayMoney();
    this.playerTurn();
    this.dealerTurn();
  }

  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.playOneGame();
      this.updateMoney();
      this.clearAndDisplayStats();
      this.displayWinner();
      if (this.player.isBroke() || this.player.isRich()) break;
      if (this.playAgain() !== "y") break;
      console.clear();
    }
    this.displayBrokeOrRich();
    this.displayGoodbyeMessage();
  }
}

let game = new Game();
game.play();