const fs = require('fs');
const {argv} = require('node:process');
const JSONC = require('comment-json');

let dupes = {}

let npcFile = fs.readFileSync(argv[2], { encoding: "utf-8" });
let dialogueFile = fs.readFileSync(argv[3], { encoding: "utf-8" });

let dialogueTree = JSONC.parse(npcFile)?.scriptConfig?.dialogueTree;
if (!dialogueTree) {
	console.log("error reading " + argv[2]);
	process.exit(1)
}
let dialogue = JSONC.parse(dialogueFile)
if (!dialogue) {
	console.log("error reading " + argv[3]);
	process.exit(1)
}

let out = handle([], dialogueTree);
let output = JSONC.stringify(out, null, "\t");
fs.writeFileSync(argv[3] + ".out", output, { encoding: "utf-8" });


function handle(path, dialogueTree1) {
	//console.log(path);
	let out = {}
	if (dialogueTree1.randomDialogue || dialogueTree1.dialogue) {
		JSONC.assign(out, checkDialogue((dialogueTree1.randomDialogue || dialogueTree1.dialogue)));
	}
	for (let [key, child] of Object.entries(dialogueTree1)) {
		if (key == "next") continue;
		if (typeof child != "object") continue;
		if (Array.isArray(child)) continue;
		JSONC.assign(out, handle([...path, key], child));
	}
	return out;
}

function checkDialogue(input) {
	let out = {}
	if (typeof input == "string") {
		if (input.substring(0,1) == ":") {
			let key = input.slice(1, input.length)
			console.log(key)
			console.log(dialogue[key])
			if (typeof dialogue[key] == "undefined") {
				return { [key] : ":missingDialogue" }
			}
		}
	}
	if (typeof input == "object") {
		if (Array.isArray(input)) {
			input.forEach(element => {
				JSONC.assign(out, checkDialogue(element));
			});
		}
	}
	return out;
}
