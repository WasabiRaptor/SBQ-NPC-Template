# Important!
You only need to make a new species if your NPC is a unique species, or you don't want them reliant on the species they're based on being installed!

If your NPC is just a member of an existing species, and you don't mind them requiring that species to be installed you can just delete this folder, NPCs can use custom assets, such as bodies or hairstyles or clothes that aren't selectable in the customizer even without defining a custom species for them, and you can go ahead and delete this folder rather than fiddling with it


# What To Do here

If you are adding a species for you NPC, there isn't much you need to do with the species file, but there are a few things you probably want to edit within the file to make them more specific to your OC, which I shall note in comments within it

Notable things that you probably would want changed are:
- ouchNoises
- bodyColor
- undyColor
- hairColor
- hair

If you wanted to add more or use the game's vanilla species system to its fullest, you should probably check another guide on adding a species, or check the ingame files on how others are added if they're doing something different that you also want to do.

Again this is a step that isn't necessary for adding an NPC to the mod, so I'm not going to go in more depth, as there are other guides for adding species that could be more helpful, I'm mainly just going to focus on whats needed for the SBQ specific aspects

# baseColorMap

This is very important if your NPC is simply using the base vore animations, or you want their colors to show up when they're infused or on digest item drops!

You will at the very least need to define their `primary`, and `secondary` colors for infusion and item drop colors to match

Base colors are arrays of the hex color palette used in the base images for the species, typically in groups of 4 per color, but three is acceptable
outline, shading, main, highlight

# animationCustom

Custom animation! a feature implemented into the SBQ-Engine specifically to allow for races to be more in line with the rest of the game. The simple explaination is, humanoid species can be animated the same as everything else in the game now with their .animation files. The caveat to that is that since characters can freely tf, all humanoid animations for every species need to have the same amount of animation parts and statetypes with the same names and priorities, good news is that you can have the animations within the statetypes and parts be whatever the fuck you want, it's just the parts themselves and the state priortiy need to be the same for the network to remain synced, so if you add any additional parts or states to your animation they'll need to be patched onto '/humanoid/any/dummy.animation.patch' (a file which every humanoid loads) as empty parts/states so that they technically have the part and therefore the net element, even if the part doesn't contain anything, therefore everything stays synced when a TF happens.

If you're going to use this, theres more information in `documentation.md` which is provided with SBQ-Engine.
