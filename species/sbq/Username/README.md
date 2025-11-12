# Important!
You only need to make a new species if your NPC is a unique species, or you don't want them reliant on the species they're based on being installed!

If your NPC is just a member of an existing species, and you don't mind them requiring that species to be installed you can just delete this folder, NPCs can use custom assets, such as bodies or hairstyles or clothes that aren't selectable in the customizer even without defining a custom species for them, and you can go ahead and delete this folder rather than fiddling with it

## Instructions

### Step 1: Create Species Animations
Modify the images and animations at `/humanoid/sbq/Username/Charactername` into animations for your OC just as you would when creating a custom race.

### Step 2: Assign Base Color Palette
Starbound replaces colors on the base sprites of a species using color replace directives which are uniquely defined per species, this makes it difficult to use any assets interchangibly because most species have entierly different color palettes, therefore we have to define some extra data for SBQ's scripts to recolor its animations to work with your species, else the animations will just have funky colors.

Open the images you've created for your species that are in `/humanoid/sbq/Username/Charactername`, and open the `/species/sbq/Username/Charactername.species` file here. Look for `baseColorPalette`, you are going define a list of hex colors going from darkest to lightest, for each color in the sprite. These should be lists of 3-4 hex colors, where the first color is the outline and the fourth color is an optional highlight, if your color doesn't have a highlight, just remove it from the list.

Further colors can be defined for use in SBQ's replacing, however 'primary' and 'secondary' are what are used for the color replacements on the digest drop items, so it's important to define them.

### Step 4: Assign Replace Colors to Generated Images
Within `/species/sbq/Username/Charactername.species` look for `sbqPartImages`, each entry is the relative path from `/humanoid/speciesName/` where an image will be generated when mods are loading, these images are used for SBQ's vore animations and are modified versions of the base species' images as well as recolored versions of animations from SBQ to match your species. Each entry has a `sourceImage` which is the image to copy and modify, `processingDirectives` a string of starbound's image processing directives to apply to the image, `patches` a list of image patching scripts to modify the image, and then lastly `remapDirectives` a list of pairs that are used to generate the color replace directives.

You can instead create your own images at the paths (relative to `/humanoid/sbq/Username/Charactername`) if you want! But you will have to define their .frames if you do so.

For most races, you will only need to concern yourself with the parts that have `remapDirectives`, simply go through the list and read the comments, replacing the second entry in each pair with the name of the color in the pallete it should be for your species.

for example, if this was for the belly part, if your species belly was say a 'teritary' color, you'd want to change it to:
```json
	[
		"primary",
		"tertiary"
	]
```
