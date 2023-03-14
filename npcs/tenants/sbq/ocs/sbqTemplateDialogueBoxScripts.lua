---@diagnostic disable: undefined-global

-- this is an example function with the args a script would recieve from being used as a "next" step
function dialogueBoxScripts.exampleNextStep(dialogueTree, settings, branch, eid, ...)


	return dialogueTree.default -- the dialogueTree must be returned at the end of the function
	-- when you return the dialogue tree, return the next branch you want to go down
end

-- this is an example function with the args a script would recieve from being used as a "callScript" when clicking the continue button after finishing a dialogue
-- the "..." args are from the "scriptArgs" table from your current position in the dialogue tree when the function is called
function dialogueBoxScripts.exampleCallScript(dialogueTree, settings, branch, eid, ...)


	return dialogueTree.default -- the dialogueTree must be returned at the end of the function
	-- when you return the dialogue tree, return the next branch you want to go down
end
