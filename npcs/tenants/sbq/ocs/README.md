# What to do here

This `.npctype` file is the most important file of the NPC as it determines all of their dialogue as well as their settings, behavior, vore prefrences, and any uinque scrips they may have.

## uniqueId

This is a must if you don't want to have multiple instances of the same character around, it should be replaced with the ID of your NPC, if not, do that now.

## dialogueBoxScripts

If you want to have scripts for custom behavior for the dialogue tree and dialoguebox, add some scripts to the `dialogueBoxScripts` arg.

Scripts added here are used by the dialogue tree when handling `next` steps, as well as the `callScript` arg for when conversing with the dialogue box.

## dialogueTree

This, this will likely be the largest endeavor in making an OC if you don't just want to use the default lines already created.

The `dialogueTree` table contains all the lines the NPC will have relating to vore, or interacting with their dialogue box, you can either define unique lines to your NPC by editing or adding lines to the contexts already there.

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


## sbqDefaultSettings sbqPreyEnabled

The general settings for this NPC, while not required as any setting not defined will fallback to general defaults, you should define all the settings that your NPC would want set, as well as lock any settings that you would need to make sure they stay in character.
