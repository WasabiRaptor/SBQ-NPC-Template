# What to do here

This `.npctype` file is the most important file of the NPC as it determines all of their dialogue as well as their settings, behavior, vore prefrences, and any uinque scrips they may have.

## identity

The identity of your NPC, their appearance and etc, if you want to manually define all that data, you can do so, however, if you are making an NPC that uses existing customization for an existing race, and want a silightly easier time, you can just use the ingame character creator to make your character!

If you've created a player character and you want to use their appearance for an NPC, you can head into your storage folder, and find the correct `.player` file for the character you created, easiest way to get the right one is to have it be your most recenly played character, so therefore will be the most recently modified file, then you'll want to look in your `starbound` folder for a folder that matches the name of your OS, inside you'll find a file called `dump_versioned_json` you will then want to open a command terminal, drag `dump_versioned_json` into it, then drag the `.player` file you want to dump into it, twice, first for input, second for output and append `.json` onto the end of the second one, and hit enter, this will dump a human readable json file of the player data, within which you will be able to find the `identity` table, you can now just copy that over to your NPC and they will have the same customizations!

## uniqueId

This is a must if you don't want to have multiple instances of the same character around, it should be replaced with the ID of your NPC, if not, do that now.

## dialogueStepScripts

If you want to have scripts for custom behavior for the dialogue tree and dialoguebox, add some scripts to the `dialogueStepScripts` arg.

Scripts added here are used by the dialogue tree when handling `next` steps

## dialogueTree

This, this will likely be the largest endeavor in making an OC if you don't just want to use the default lines already created.

The `dialogueTree` table points to all the lines the NPC will have for various interactions, you can either define unique lines to your NPC by editing or adding lines to the contexts already there, all the dialogue itself should be contained in the `sbqTemplate.dialogue` file

The dialogue tree has multiple starts relating to different contexts, only the start of each part of the tree is pre defined and must be used, after the start, one can delete or change anything about the tree to make it behave as they wish for their NPC, and get as specific in context of a certain vore type as they wish with their lines by checking the current settings.

The starts of the tree are as follows.

### greeting

The standard greeting upon interacting with the NPC and bringing up their dialogue box. I've commented on some of the behavior on how to make a interactive dialogue tree with the dropdown options and such in this area.

### Predator lines

#### vore

The line the NPC says when performing vore.

The `getVoreButtonAction` and `doingVore` keys for the next step shouldn't be used in other parts of the tree.

#### struggle

The line the NPC says every so often when a prey struggles, or a prey within interacts with them, which would also have the dialogue box appear and one could have further conversation.

#### letout

The line the NPC says upon their prey escaping or being released.

The `struggleTrigger` key for the next step shouldn't be used in other parts of the tree.

### Prey lines

#### vored

The line the NPC says upon getting vored.

#### struggling

The line the NPC says every so often as they struggle within a pred, or from getting intereacted with via the predator's hud, which would also have the dialogue box appear and one could have further conversation.

#### escape

The line the NPC says upon escaping a pred, or being released.

The `struggleTrigger` key for the next step shouldn't be used in other parts of the tree.

## huntingChecklist baitingChecklist

For each of the NPC's moods, you can have a checklist for hunting and baiting, that must be fulfilled by an NPC's potential target for it to consider seeking them out.


## sbqDefaultSettings sbqPreyEnabled sbqOverrideSettings sbqOverridePreyEnabled

The general settings for this NPC, while not required as any setting not defined will fallback to general defaults, you should define all the settings that your NPC would want set, as well as lock any settings that you would need to make sure they stay in character.

## deleting unecessary parts

If there are any parts of the config here you may feel are unecessary for your NPC, such as parts of the dialogue tree containing lines for things your NPC will not be partaking in, just delete that part of the tree! there should be no consequences as long as you do it correctly, which is why I suggest using an editor such as VSC so you can just collapse the region, and easily see what you have to delete

## Checking if you have any missing dialogue

to check if you have any missing dialogue that is referenced in your dialouge tree you can use this node js script, it will output a file with all the dialogue contexts that your tree has pointed to, but have not been defined in your dialogue file
`node missingDialogue.js npcs/sbq/ocs/sbqTemplate.npctype npcs/sbq/ocs/sbqTemplate.dialogue`

this script doesn't care about dialouge that has a path pointing outside the relevant file, so be aware of that if you are pointing to other files as well
