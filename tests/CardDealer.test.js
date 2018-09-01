const CardDealer = require("../CardDealer");

const mockCustomDeck = [
    { color: "red", value: 1 },
    { color: "green", value: 2 },
    { color: "blue", value: 2 }
];

describe("CardDealer", () => {
    beforeEach(() => jest.clearAllMocks());
    test("Creates a standard deck if no deck is passed", () => {
        const spy = jest.spyOn(CardDealer.prototype, "_createStandardDeck");
        const dealer = new CardDealer();

        expect(spy).toHaveBeenCalled();
    });
    test("Standard deck matches snapshot", () => {
        const dealer = new CardDealer();

        expect(dealer.deck).toMatchSnapshot();
    });
    test("Accepts a custom deck", () => {
        const dealer = new CardDealer(mockCustomDeck);

        expect(dealer.deck).toEqual(mockCustomDeck);
    });
    test("Deal returns current card index if given no argument", () => {
        const dealer = new CardDealer(mockCustomDeck);

        expect(dealer.deal()).toBe(mockCustomDeck[0]);
    });
    test("Deal returns the amount of card given as an argument", () => {
        const dealer = new CardDealer();

        expect(dealer.deal(10).length).toBe(10);
    });
    test("Deal throws an error if there are not enough cards remaining", () => {
        const dealer = new CardDealer();

        expect(() => {
            dealer.deal(dealer.deck.length + 5);
        }).toThrowError();
    });
    test("Card index increases by amount of cards dealt", () => {
        const dealer = new CardDealer();

        const amount = 5;

        dealer.deal(5);

        expect(dealer._cardIdx).toBe(5);
    });
    test("Shuffle shuffles the deck and returns the class instance", () => {
        const dealer = new CardDealer(mockCustomDeck);

        expect(dealer.shuffle()).toBe(dealer);
        expect(dealer.deck).not.toBe(mockCustomDeck);
    });
    test("Shuffling resets the card index", () => {
        const dealer = new CardDealer();

        dealer.deal(10);

        expect(dealer.shuffle()._cardIdx).toBe(0);
    });
});
