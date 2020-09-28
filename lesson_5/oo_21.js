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

  toString() {
    if (this.isHidden()) {
      return "??";
    } else {
      return `${this.getRank()}${this.getSuit()}`
    }
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

  showCurrentMoney() {
    console.log(`$${this.money}`)
  }
}

class Dealer {
  constructor() {
    this.resetHand();
    this.name = "Dealer";
  }
}

Object.assign(Player.prototype, Hand);
Object.assign(Dealer.prototype, Hand);

class TwentyOneGame {
  static TARGET_SCORE = 21;
  static DEALER_STAY_SCORE = 17;

  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck = new Deck();
  }

  displayWelcomeMessage() {
    console.log("Welcome to 21!");
  }

  dealCards() {
    this.player.resetHand();
    this.dealer.resetHand();

    this.player.addToHand(this.deck.dealCardFaceUp());
    this.dealer.addToHand(this.deck.dealCardFaceUp());
    this.player.addToHand(this.deck.dealCardFaceUp());
    this.dealer.addToHand(this.deck.dealCardFaceDown());

  }

  showCards() {
    this.player.showHand("Player's Hand");
    this.showScore(this.player);

    this.dealer.showHand("Dealer's Hand");
    this.showScore(this.dealer);
  }

  showScore(participant) {
    console.log(`${participant.name}'s score: ${this.calculateScore(participant)}`)
  }

  calculateScore(hand) {
    let cards = hand.getHand();
    console.log(`cards: ${cards}`);
    let score = cards.reduce((total, card) => {
      return total + this.getValueOf(card);
    }, 0);

    if (cards.filter(card => card.isAce()).length > 0 && score > TwentyOneGame.TARGET_SCORE) {
      score -= 10;
    }
    
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

  playerTurn() {

  }

  dealerTurn() {

  }

  displayResult() {

  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing 21. Goodbye!");
  }

  playOneGame() {
    this.dealCards();
    this.showCards();
    this.playerTurn();
    this.dealerTurn();
    this.displayResult();
  }

  play() {
    this.displayWelcomeMessage();
    // while (true) {
      this.playOneGame();
    //   if (this.player.isBroke() || this.player.isRich()) break;
    // }
    this.displayGoodbyeMessage();
  }
}

let game = new TwentyOneGame();
game.play();


