import * as fs from "fs";

const filepath: string = "./07/input.txt";
const content = fs.readFileSync(filepath, "utf-8").split("\r\n");

const cardRank = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];

type Hand = {
    Card: string;
    Bid: number;
    isFullHouse: number;
    HighestMatching: number;
    NoMatchings: number;
};

var handsArray: Hand[] = [];

content.forEach((line) => {
    const [card, bid] = line.split(" ");
    handsArray.push({ Card: card, Bid: parseInt(bid), isFullHouse: 0, HighestMatching: 0, NoMatchings: 0 });
});

handsArray.forEach((hand, index) => {
    var charHashSet = new Map<string, number>();
    var set = new Set(hand.Card.split(""));
    set.forEach((entry) => {
        charHashSet.set(entry, 0);
    });
    hand.Card.split("").forEach((card) => {
        charHashSet.set(card, (charHashSet.get(card) || 0) + 1);
    });
    const valuesArray = Array.from(charHashSet.values());
    handsArray[index].HighestMatching = Math.max(...valuesArray);
    let count = 0;
    valuesArray.forEach((value) => {
        if (value === handsArray[index].HighestMatching) count++;
    });
    handsArray[index].NoMatchings = count;
    if (
        valuesArray.length === 2 &&
        ((valuesArray[0] === 3 && valuesArray[1] === 2) || (valuesArray[0] === 2 && valuesArray[1] === 3))
    ) {
        handsArray[index].isFullHouse = 1;
    }
});

handsArray.sort((a, b) => {
    if (a.HighestMatching !== b.HighestMatching) return a.HighestMatching - b.HighestMatching;
    if (a.isFullHouse !== b.isFullHouse) return a.isFullHouse - b.isFullHouse;
    if (a.NoMatchings !== b.NoMatchings) return a.NoMatchings - b.HighestMatching;
    for (let i = 0; i < 5; ++i) {
        const cardRankA = cardRank.indexOf(a.Card.charAt(i));
        const cardRankB = cardRank.indexOf(b.Card.charAt(i));
        if (cardRankA !== cardRankB) return cardRankB - cardRankA;
    }
    return 0;
});

var sum = 0;

handsArray.forEach((hand, index) => {
    sum += hand.Bid * (index + 1);
});

// console.log(handsArray);
console.log(sum);
