import * as fs from "fs";

const filepath: string = "./07/input.txt";
const content = fs.readFileSync(filepath, "utf-8").split("\r\n");

const cardRank = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"];

type Hand = {
    Cards: string;
    Bid: number;
    isFullHouse: number;
    HighestMatching: number;
    NoMatchings: number;
};

var handsArray: Hand[] = [];

content.forEach((line) => {
    const [card, bid] = line.split(" ");
    handsArray.push({ Cards: card, Bid: parseInt(bid), isFullHouse: 0, HighestMatching: 0, NoMatchings: 0 });
});

handsArray.forEach((hand, index) => {
    var charHashSet = new Map<string, number>();
    var set = new Set(hand.Cards.split(""));
    set.forEach((entry) => {
        charHashSet.set(entry, 0);
    });
    hand.Cards.split("").forEach((card) => {
        charHashSet.set(card, (charHashSet.get(card) || 0) + 1);
    });

    const filteredEntries = Array.from(charHashSet.entries()).filter(([key]) => key !== "J");
    const valuesArray = Array.from(charHashSet.values());
    let maxValue = 0;
    var Jcount: number = 0;
    if (filteredEntries.length !== 0) {
        maxValue = Math.max(...filteredEntries.map(([_, value]) => value));
        Jcount = charHashSet.get("J") || 0;
    } else {
        Jcount = Math.max(...valuesArray);
    }

    handsArray[index].HighestMatching = maxValue + Jcount;
    console.log(hand);
    let count = 0;

    //  get number of matchings

    if (filteredEntries.length !== 0) {
        filteredEntries.forEach(([_, value]) => {
            if (value + Jcount === handsArray[index].HighestMatching) count++;
            if (count === filteredEntries.length) count = 1;
        });
    } else {
        count = 1;
    }
    handsArray[index].NoMatchings = count;
    if (filteredEntries.length === 2 && filteredEntries[0][1] === 2 && filteredEntries[1][1] === 2) {
        handsArray[index].isFullHouse = 1;
    } else if (
        valuesArray.length === 2 &&
        ((valuesArray[0] === 3 && valuesArray[1] === 2) || (valuesArray[0] === 2 && valuesArray[1] === 3))
    ) {
        handsArray[index].isFullHouse = 1;
    }
});

// IS THIS CORRECT ORDER? CHECK IF MATCHINGS SHOULD BE BELOW CARDS
// 2345J VS 23456

handsArray.sort((a, b) => {
    if (a.HighestMatching !== b.HighestMatching) return a.HighestMatching - b.HighestMatching;
    if (a.isFullHouse !== b.isFullHouse) return a.isFullHouse - b.isFullHouse;
    if (a.NoMatchings !== b.NoMatchings) return a.NoMatchings - b.HighestMatching;
    for (let i = 0; i < 5; ++i) {
        const cardRankA = cardRank.indexOf(a.Cards.charAt(i));
        const cardRankB = cardRank.indexOf(b.Cards.charAt(i));
        if (cardRankA !== cardRankB) return cardRankB - cardRankA;
    }
    return 0;
});

var sum = 0;

handsArray.forEach((hand, index) => {
    sum += hand.Bid * (index + 1);
});

console.log(sum);
