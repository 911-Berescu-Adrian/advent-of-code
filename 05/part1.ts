import * as fs from "fs";

const filepath: string = "./05/input.txt";
const content = fs.readFileSync(filepath, "utf-8").split("\r\n\r\n");

var hashmap: { [key: number]: SeedMap[] } = {};
var locations: number[] = [];

type SeedMap = {
    DestinationStart: number;
    SourceStart: number;
    Range: number;
};
var seedsStr = content[0].split(":")[1].split(" ");
seedsStr.shift();
var seeds = seedsStr.map((seed) => parseInt(seed));

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

seeds.forEach((seed) => {
    var mappedValue = seed;

    for (const key in hashmap) {
        var isMapped = false;
        if (hashmap.hasOwnProperty(key)) {
            const seedMaps = hashmap[key];

            for (const seedMap of seedMaps)
                if (seedMap.SourceStart <= mappedValue && seedMap.SourceStart + seedMap.Range >= mappedValue) {
                    mappedValue = seedMap.DestinationStart + (mappedValue - seedMap.SourceStart);
                    isMapped = true;
                    break;
                }
        }

        if (!isMapped) {
            mappedValue = mappedValue;
        }
    }
    locations.push(mappedValue);
});

console.log(Math.min(...locations));
