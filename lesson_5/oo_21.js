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

  getMoney() {
    return this.money;
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

  displayWelcomeMessage(){
    console.log("Welcome to 21!");
    console.log("");
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing 21. Goodbye!");
  }

  displayMoney() {
    console.log("");
    console.log(`Player has $${this.player.getMoney()}`);
    console.log("");
  }

  displayScore(participant) {
    console.log(`${participant.name}'s score: ${this.calculateScore(participant)}`)
  }

  displayCards() {
    this.dealer.showHand("-Dealer's Hand-");
    this.displayScore(this.dealer);
    console.log("");
    this.player.showHand("-Player's Hand-");
    this.displayScore(this.player);
  }

  clearAndDisplayStats() {
    console.clear();
    this.displayCards();
    this.displayMoney();
  }

  dealCards() {
    this.player.resetHand();
    this.dealer.resetHand();

    this.player.addToHand(this.deck.dealCardFaceUp());
    this.dealer.addToHand(this.deck.dealCardFaceUp());
    this.player.addToHand(this.deck.dealCardFaceUp());
    this.dealer.addToHand(this.deck.dealCardFaceDown());

  }

  calculateScore(hand) {
    let cards = hand.getHand();
    let score = cards.reduce((total, card) => {
      return total + this.getValueOf(card);
    }, 0);

    let numOfAces = cards.filter(card => card.isAce()).length;
    if (numOfAces > 0 && score > TwentyOneGame.TARGET_SCORE) {
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

  hit(hand) {
    hand.addToHand(this.deck.dealCardFaceUp());
  }

  isBust(hand) {
    return this.calculateScore(hand) > TwentyOneGame.TARGET_SCORE;
  }

  hitOrStay() {
    let answer;

    while (true) {
      answer = readline.question("Do you want to hit(h) or stay(s)?").toLowerCase();
      if (["s", "h"].includes(answer)) break;
      console.log("Sorry that is not a valid choice.");
    }
    return answer;
  }

  playerTurn() {
    while (true) {
      if (this.hitOrStay() === "h") {
        this.hit(this.player);
        this.clearAndDisplayStats();
      } else {
        break;
      }
      if (this.isBust(this.player) || this.calculateScore(this.player) === TwentyOneGame.TARGET_SCORE) {
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
        if (score < TwentyOneGame.DEALER_STAY_SCORE) {
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
      (playerScore > dealerScore) ||
      this.isBust(this.dealer)) {
        return this.player;
    } else if (!this.isBust(this.dealer) &&
      (dealerScore > playerScore) ||
      this.isBust(this.player)) {
        return this.dealer;
    } else {
      return null;
    }
  }

  updateMoney() {
    if (this.isWinner() === this.player) {
      this.player.winBet();
    } else if (this.isWinner() === this.dealer) {
      this.player.loseBet();
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
    console.clear();
    this.displayWelcomeMessage();
    // while (true) {
      this.playOneGame();
      this.updateMoney();
      this.clearAndDisplayStats();
      // if (this.player.isBroke() || this.player.isRich()) break;
    // }
    this.displayGoodbyeMessage();
  }
}

let game = new TwentyOneGame();
game.play();


