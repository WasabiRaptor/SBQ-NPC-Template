const fs = require('fs');
const { argv } = require('node:process');
const JSONC = require('comment-json');

let dupes = {}

for (let file of argv.slice(2)) {
	let contents = fs.readFileSync(file, { encoding: "utf-8" });
	let data = JSONC.parse(contents)?.scriptConfig?.dialogueTree;
	if (!data) {
		console.log("error reading " + file);
		continue;
	}
	let out = handle([], data);
	let output = JSONC.stringify(out, null, "\t");
	fs.writeFileSync(file + ".out", output, { encoding: "utf-8" });
}

function handle(path, obj) {
	console.log(path);
	if (obj.randomDialogue || obj.dialogue) {
		let hash = JSON.stringify(obj.randomDialogue || obj.dialogue);
		if (dupes[hash]) {
			return JSONC.parse(`{\n//${path.join(".")} duplicates ${dupes[hash]}\n}`);
		} else {
			dupes[hash] = path.join(".");
			return { [path.join(".")]: obj.randomDialogue || obj.dialogue };
		}
	}
	let out = {}
	for (let [key, child] of Object.entries(obj)) {
		if (key == "next") continue;
		if (typeof child != "object") continue;
		if (Array.isArray(child)) continue;
		JSONC.assign(out, handle([...path, key], child));
	}
	return out;
}
