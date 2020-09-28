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

  addCard(card) {
    this.hand.push(card);
  },

  showHand() {
    for (let card of this.hand) {
      console.log(`${card}`)
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

  showCurrentMoney() {
    console.log(`$${this.money}`)
  }
}

class Dealer {
  constructor() {
    this.resetHand();
  }
}

Object.assign(Player.prototype, Hand);
Object.assign(Dealer.prototype, Hand);

class TwentyOneGame {
  static TARGET_SCORE = 21;
  static DEALER_STAY_SCORE = 17;

  constructor() {
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Dealer();
  }

  play() {
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
game.play();


