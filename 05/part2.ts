import * as fs from "fs";

const filepath: string = "./05/input.txt";
const content = fs.readFileSync(filepath, "utf-8").split("\r\n\r\n");

var startTime = Date.now();

var hashmap: { [key: number]: SeedMap[] } = {};

type SeedMap = {
    DestinationStart: number;
    SourceStart: number;
    Range: number;
};

type Seed = {
    SeedStart: number;
    Range: number;
};

var seedArray: Seed[] = [];

var seedsStr = content[0].split(":")[1].split(" ");
seedsStr.shift();
var seeds = seedsStr.map((seed) => parseInt(seed));
seeds.forEach((seed, index) => {
    if (index % 2 === 1) {
        seedArray.push({ SeedStart: seeds[index - 1], Range: seed });
    }
});

for (var i = 1; i < content.length; ++i) {
    const lines = content[i].split(":")[1].split("\r\n");
    lines.shift();
    const seedMaps: SeedMap[] = [];

    lines.forEach((line) => {
        const split = line.split(" ");
        seedMaps.push({
            DestinationStart: parseInt(split[0]),
            SourceStart: parseInt(split[1]),
            Range: parseInt(split[2]),
        });
    });
    hashmap[i] = seedMaps;
}

var minLocation: number = 0;
var isSearching = true;
const reversedKeys = Object.keys(hashmap).map(Number).reverse();

for (var i = 0; i < Number.MAX_VALUE && isSearching; ++i) {
    minLocation = i;
    for (const key of reversedKeys) {
        if (hashmap.hasOwnProperty(key)) {
            const seedMaps = hashmap[key];
            for (const seedMap of seedMaps) {
                if (minLocation >= seedMap.DestinationStart && minLocation < seedMap.DestinationStart + seedMap.Range) {
                    // if (i === 0) console.log("BEFORE", minLocation);
                    minLocation = seedMap.SourceStart + (minLocation - seedMap.DestinationStart);
                    // if (i === 0) {
                    // console.log(minLocation, key, seedMap);
                    // }
                    if (key === 1) {
                        // console.log(key, i, minLocation);
                        seedArray.forEach((seed) => {
                            if (seed.SeedStart <= minLocation && minLocation < seed.SeedStart + seed.Range) {
                                // console.log(seed, i);
                                isSearching = false;
                                console.log("LOWEST", i);
                            }
                        });
                        if (!isSearching) break;
                    }
                    break;
                }
            }
        }
    }
}

var endTime = Date.now();

console.log(endTime - startTime, "ms");
