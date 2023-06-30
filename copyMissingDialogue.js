const fs = require('fs');
const {argv} = require('node:process');
const JSONC = require('comment-json');

let copyFromFile = fs.readFileSync(argv[2], { encoding: "utf-8" });
let copyToFile = fs.readFileSync(argv[3], { encoding: "utf-8" });
let copyFrom = JSONC.parse(copyFromFile)
if (!copyFrom) {
	console.log("error reading " + argv[2]);
	process.exit(1)
}

let copyTo = JSONC.parse(copyToFile)
if (!copyTo) {
	console.log("error reading " + argv[3]);
	process.exit(1)
}
let dialogueHashes = {}

for (let [key, child] of Object.entries(copyTo)) {
	if (child == ":missingDialogue") {
		copyTo[key] = copyFrom[key] || copyTo[key]
	} else {
		if (Array.isArray(child)) {
			dialogueHashes[JSONC.stringify(child, null, "\t")] = key
		}
	}
}
for (let [key, child] of Object.entries(copyFrom)) {
	if (Array.isArray(child)) continue
	if (typeof (child) == "string") continue
	let hash = JSONC.stringify(child.randomDialogue || child.dialogue, null, "\t")
	if (dialogueHashes[hash]) {
		copyTo[dialogueHashes[hash]] = child
	}
}

let output = JSONC.stringify(copyTo, null, "\t");
fs.writeFileSync(argv[3], output, { encoding: "utf-8" });
