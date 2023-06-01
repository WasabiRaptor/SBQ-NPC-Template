# SBQ-NPC-Template
a template for adding NPCs to the starbecue mod

# What to do

## Replace Filenames

This guide is going to only assume you are creating an NPC for a specific OC to work in the SBQ system rather than making a playable race, however if that is what one desires, one would mostly just have to follow the steps here layered on top of any eixisting guide for adding a playable race.

The first thing you're going to want to do, is do replace all the filenames within this template folder to match your OC or NPC's name!

I would suggest opening the folder within a editor like visual studio code, and doing a find and replace for `sbqTemplate` and replace it with `sbqOCName_OCOwnerName` where `OCName` and `OCOwnerName` are replaced with the relavant names, the sbq prefix isn't entirely necessary, but will very much help with not causing any conflicts, and is a good identifier for which mod your OC is an addition to, as well as the appending of the OC's Owner name so its much easier to know who belongs to who as well as preventing conflicts if two people happen to have OCs with the same name.

## Create Sprites and Species

### humanoid

Within the `humanoid` folder you should now have a template folder for your OC, and a `README` file to explain the specifics of what you may want to edit.

However, if your OC is from an existing supported race, modded or not, and entirely made using the base sprites from whatever race they are, even with unavailble color options, you can delete this folder, as it would be entirely unnessary for your OC and we can ontinue on.

### species

Within the `species` folder, there should be a template `.species` file for you OC, and a `README` file to explain the specifics of what you may want to edit.

If you deleted the template `humanoid` folder in the last step, you can delete the `species` folder too.

If your OC is a member of an existing species, but uses some custom assets, its up to you if you want to keep this file and define them as their own species, or delete it and have them be be that existing species.

## Define the NPC and Tenant

### Tenant

In the folder `tenants/sbq/ocs` you'll find a `.tenant` file, you'll have to make sure its renamed, and the relevant names and IDs in the file itself are renamed to the correct values, as guided by the comments.

In the folder `npcs/tenants` you should find a file named `sbqTenantCatalogue.json.patch` if you edit this as the comments instruct your tenant will be listed in the selection box for the sbq colony deed.

### Main NPC

In the folder `npcs/tenants/sbq/ocs` you should find a `README` file instructing you in more detail on what to do, that file is the most important part of this, as it is what makes the NPC actually exist, what controls their properties, as well as where their ID is defined.

In the folder `npcs/sbqHub` you'll find another `README` file that will instruct you on how to have a safe version of your OC and so it will be part of the random selection pool for NPC spawns on Auri's planet, this isn't important, and you can just delete this if you don't care about that.

## Add an NPC house to the village

The last and most optional step of them all, you can create a house to spawn in the village on Auri's planet, as an example for what sort of items to use to summon them as a tenant

If you want to do this, rename the files in `dungeons/missions/sbqHub` and check the `README` on what else to do, else you can just delete the folder

## Updating an Existing NPC

to update an existing NPC you cna export the dialogue from the old tree into a new file just for the dialouge using a node js script included in the root here
`node dialoguegen.js npcs/tenants/sbq/ocs/sbqTemplate.npctype`

You should then copy the new dialogue tree scructure, and then rename the labels in the output file to match where you want that dialogue to be used

## Checking if you have any missing dialogue

to check if you have any missing dialogue that is referenced in your dialouge tree you can use this node js script, it will output a file with all the dialogue contexts that your tree has pointed to, but have not been defined in your dialogue file
`node missingDialogue.js npcs/tenants/sbq/ocs/sbqTemplate.npctype npcs/tenants/sbq/ocs/sbqTemplate.dialogue`

you can optionally add a second dialogue file as another argument, in which it will output that file's dialogue for you, rather than it pointing to your missing dialogue

this script doesn't care about dialouge that has a path pointing outside the relevant file, so be aware of that if you are pointing to other files as well
