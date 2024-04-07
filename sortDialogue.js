const fs = require('fs');
const {argv} = require('node:process');
const JSONC = require('comment-json');

let dupes = {}

let npcFile = fs.readFileSync(argv[2], { encoding: "utf-8" });
let dialogueFile = fs.readFileSync(argv[3], { encoding: "utf-8" });
let secondaryDialogue
if (argv[4]) {
	let secondaryDialogueFile = fs.readFileSync(argv[4], { encoding: "utf-8" });
	secondaryDialogue = JSONC.parse(secondaryDialogueFile);
}

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
checkRepoint(out)
let vanilla = (dialogue?.vanilla ?? {})
JSONC.assign(out, { ["vanilla"]: vanilla })
delete dialogue["vanilla"]

let output = JSONC.stringify(out, null, "\t");
JSONC.assign(dialogue, JSONC.parse(`{\n// Unused Dialogue \n}`));
let unusedDialogue = JSONC.stringify(dialogue, null, "\t")

fs.writeFileSync(argv[3], output.replace(/\n\}$/, ",") + unusedDialogue.replace(/^\{/, ""), { encoding: "utf-8" });


function handle(path, dialogueTree1) {
	//console.log(path);
	let out = {}
	if (dialogueTree1.dialogueRandom || dialogueTree1.dialogue) {
		JSONC.assign(out, checkDialogue((dialogueTree1.dialogueRandom || dialogueTree1.dialogue)));
	}
	for (let [key, child] of Object.entries(dialogueTree1)) {
		if (key == "next") continue;
		if (typeof child != "object") continue;
		if (Array.isArray(child)) continue;
		JSONC.assign(out, handle([...path, key], child));
	}
	return out;
}

function checkRepoint(input) {
	for (let [key, child] of Object.entries(input)) {
		if (typeof child == "string") {
			if ((child.substring(0, 1) == ":") && child != ":missingDialogue") {
				JSONC.assign(input, JSONC.parse(`{\n "${key}": "${child}" // duplicated lines\n }`));
			}
		}
	}
}

function checkDialogue(input) {
	let out = {}
	if (typeof input == "string") {
		if (input.substring(0,1) == ":") {
			let key = input.slice(1, input.length)
			if (!dupes[key]) {
				console.log(key)
				console.log(dialogue[key])
				if (typeof dialogue[key] == "undefined") {
					if (argv[4] && secondaryDialogue[key]) {
						JSONC.assign(out, { [key]: secondaryDialogue[key] });
					} else JSONC.assign(out, { [key]: ":missingDialogue" });
				} else {
					let data = dialogue[key]
					delete dialogue[key]
					dupes[key] = true
					JSONC.assign(out, { [key]: data })
					JSONC.assign(out, checkDialogue(data));
				}
			}
		}
	}
	if (typeof input == "object") {
		if (Array.isArray(input)) {
			input.forEach(element => {
				JSONC.assign(out, checkDialogue(element));
			});
		} else {
			for (let [key, child] of Object.entries(input)) {
				JSONC.assign(out, checkDialogue(child));
			}
		}
	}
	return out;
}
