const shuffle = require("lodash.shuffle");

class CardDealer {
    constructor(deck = this._createStandardDeck()) {
        this._deck = deck;
        this._cardIdx = 0;
    }

    get deck() {
        return this._deck;
    }

    deal(numCards = 1) {
        if (numCards + this._cardIdx > this._deck.length) {
            throw new Error(
                `There aren't enough cards in the deck.  Reshuffle to start over`
            );
        }
        const hand = this._getHand(numCards);

        this._incrementCardIdx(numCards);
        return hand;
    }

    shuffle() {
        this._deck = shuffle(this._deck);
        this._resetCardIdx();
        return this;
    }

    _createStandardDeck() {
        const suits = ["Hearts", "Spades", "Clubs", "Diamonds"];
        const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, "J", "Q", "K"];

        let deck = [];

        suits.forEach(suit =>
            values.forEach(value => {
                deck.push({ suit, value });
            })
        );

        return deck;
    }

    _getHand(numCards) {
        if (numCards === 1) {
            return this._deck[this._cardIdx];
        } else {
            return Array.from(
                { length: numCards },
                (v, i) => this._deck[this._cardIdx + i]
            );
        }
    }

    _incrementCardIdx(amount) {
        this._cardIdx = this._cardIdx + amount;
    }

    _resetCardIdx() {
        this._cardIdx = 0;
    }
}

module.exports = CardDealer;
