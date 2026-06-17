/**
 * LPC Sheet Definitions
 *
 * Defines all sprite categories, their available options, z-ordering for layer compositing,
 * and paths to load sprites from the GitHub CDN.
 *
 * Base URL for all sprites:
 * https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/spritesheets/
 */

const CDN_BASE =
    "https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/spritesheets";

/**
 * Body types available in the LPC generator
 */
export const BODY_TYPES = [
    { id: "male", label: "Male" },
    { id: "female", label: "Female" },
    { id: "muscular", label: "Muscular" },
    { id: "pregnant", label: "Pregnant" },
    { id: "teen", label: "Teen" },
    { id: "child", label: "Child" },
];

/**
 * Skin color palette
 * Each entry has a display name, hex for the swatch, and the LPC palette folder name
 */
export const SKIN_COLORS = [
    { id: "light", label: "Light", hex: "#f5d6b4" },
    { id: "olive", label: "Olive", hex: "#c5a882" },
    { id: "dark", label: "Dark", hex: "#8c6239" },
    { id: "dark2", label: "Dark 2", hex: "#6e4429" },
    { id: "darkelf", label: "Dark Elf", hex: "#7a7a8e" },
    { id: "darkelf2", label: "Dark Elf 2", hex: "#5a5a6e" },
    { id: "tanned", label: "Tanned", hex: "#dbb180" },
    { id: "tanned2", label: "Tanned 2", hex: "#c89860" },
    { id: "orc", label: "Orc", hex: "#6a9040" },
    { id: "red_orc", label: "Red Orc", hex: "#a04040" },
    { id: "zombie", label: "Zombie", hex: "#80a070" },
    { id: "skeleton", label: "Skeleton", hex: "#d4c8a0" },
];

/**
 * Hair colors
 */
export const HAIR_COLORS = [
    { id: "blonde", label: "Blonde", hex: "#dcc22a" },
    { id: "brunette", label: "Brunette", hex: "#7a4b28" },
    { id: "redhead", label: "Redhead", hex: "#b32817" },
    { id: "raven", label: "Raven", hex: "#1e1e1e" },
    { id: "white", label: "White", hex: "#e8e8e8" },
    { id: "gray", label: "Gray", hex: "#9a9a9a" },
    { id: "light_blonde", label: "Light Blonde", hex: "#f0e68c" },
    { id: "strawberry_blonde", label: "Strawberry", hex: "#d4894a" },
    { id: "auburn", label: "Auburn", hex: "#8b3a2f" },
    { id: "pink", label: "Pink", hex: "#e888a0" },
    { id: "blue", label: "Blue", hex: "#5080c0" },
    { id: "green", label: "Green", hex: "#50a050" },
    { id: "purple", label: "Purple", hex: "#8060a0" },
];

/**
 * Helper to map body types to age groups for heads/noses/ears
 */
const getAgeGroup = (bt) => (bt === 'child' ? 'child' : 'adult');

/**
 * All sprite categories with their options and z-ordering.
 *
 * zPos determines the layer order for compositing:
 *   lower zPos = rendered first (behind)
 *   higher zPos = rendered on top
 *
 * Each category contains items. Each item has:
 *   - id: unique identifier
 *   - label: display name
 *   - path: relative path template within the spritesheets folder
 *           {bodyType} is replaced with the selected body type
 *           {animation} is replaced with the current animation name
 */
export const CATEGORIES = [
    {
        id: "body",
        label: "Body",
        zPos: 10,
        required: true,
        items: [
            // Body is always present - items are body types
            // Body color is handled separately via palette
        ],
        getPath: (bodyType, animation) =>
            `body/bodies/${bodyType}/${animation}.png`,
    },
    {
        id: "head",
        label: "Head",
        zPos: 15,
        required: false,
        subcategories: [
            {
                id: "ears",
                label: "Ears",
                items: [
                    { id: "none", label: "None", path: null },
                    {
                        id: "bigears",
                        label: "Big Ears",
                        getPath: (bt, anim) =>
                            `head/ears/big/${getAgeGroup(bt)}/${anim}.png`,
                    },
                    {
                        id: "elvenears",
                        label: "Elven Ears",
                        getPath: (bt, anim) =>
                            `head/ears/elven/${getAgeGroup(bt)}/${anim}.png`,
                    },
                ],
            },
            {
                id: "nose",
                label: "Nose",
                items: [
                    { id: "none", label: "None", path: null },
                    {
                        id: "bignose",
                        label: "Big Nose",
                        getPath: (bt, anim) =>
                            `head/nose/big/${getAgeGroup(bt)}/${anim}.png`,
                    },
                    {
                        id: "buttonnose",
                        label: "Button Nose",
                        getPath: (bt, anim) =>
                            `head/nose/button/${getAgeGroup(bt)}/${anim}.png`,
                    },
                    {
                        id: "straightnose",
                        label: "Straight Nose",
                        getPath: (bt, anim) =>
                            `head/nose/straight/${getAgeGroup(bt)}/${anim}.png`,
                    },
                ],
            },
            {
                id: "eyes",
                label: "Eyes",
                items: [
                    { id: "none", label: "Default", path: null },
                    {
                        id: "eyes_blue",
                        label: "Blue Eyes",
                        getPath: (bt, anim) =>
                            `head/eyes/blue/${getAgeGroup(bt)}/${anim}.png`,
                    },
                    {
                        id: "eyes_brown",
                        label: "Brown Eyes",
                        getPath: (bt, anim) =>
                            `head/eyes/brown/${getAgeGroup(bt)}/${anim}.png`,
                    },
                    {
                        id: "eyes_green",
                        label: "Green Eyes",
                        getPath: (bt, anim) =>
                            `head/eyes/green/${getAgeGroup(bt)}/${anim}.png`,
                    },
                    {
                        id: "eyes_gray",
                        label: "Gray Eyes",
                        getPath: (bt, anim) =>
                            `head/eyes/gray/${getAgeGroup(bt)}/${anim}.png`,
                    },
                ],
            },
        ],
    },
    {
        id: "hair",
        label: "Hair",
        zPos: 50,
        required: false,
        items: [
            { id: "none", label: "None", path: null },
            {
                id: "bangs",
                label: "Bangs",
                getPath: (bt, anim) => `hair/bangs/${bt}/${anim}.png`,
            },
            {
                id: "bangslong",
                label: "Bangs Long",
                getPath: (bt, anim) => `hair/bangslong/${bt}/${anim}.png`,
            },
            {
                id: "bangslong2",
                label: "Bangs Long 2",
                getPath: (bt, anim) => `hair/bangslong2/${bt}/${anim}.png`,
            },
            {
                id: "bangsshort",
                label: "Bangs Short",
                getPath: (bt, anim) => `hair/bangsshort/${bt}/${anim}.png`,
            },
            {
                id: "bedhead",
                label: "Bedhead",
                getPath: (bt, anim) => `hair/bedhead/${bt}/${anim}.png`,
            },
            {
                id: "bob",
                label: "Bob",
                getPath: (bt, anim) => `hair/bob/${bt}/${anim}.png`,
            },
            {
                id: "bob2",
                label: "Bob 2",
                getPath: (bt, anim) => `hair/bob2/${bt}/${anim}.png`,
            },
            {
                id: "braids",
                label: "Braids",
                getPath: (bt, anim) => `hair/braids/${bt}/${anim}.png`,
            },
            {
                id: "buzzcut",
                label: "Buzzcut",
                getPath: (bt, anim) => `hair/buzzcut/${bt}/${anim}.png`,
            },
            {
                id: "cornrows",
                label: "Cornrows",
                getPath: (bt, anim) => `hair/cornrows/${bt}/${anim}.png`,
            },
            {
                id: "curly",
                label: "Curly",
                getPath: (bt, anim) => `hair/curly/${bt}/${anim}.png`,
            },
            {
                id: "curtains",
                label: "Curtains",
                getPath: (bt, anim) => `hair/curtains/${bt}/${anim}.png`,
            },
            {
                id: "jewfro",
                label: "Jewfro",
                getPath: (bt, anim) => `hair/jewfro/${bt}/${anim}.png`,
            },
            {
                id: "longhawk",
                label: "Longhawk",
                getPath: (bt, anim) => `hair/longhawk/${bt}/${anim}.png`,
            },
            {
                id: "longknot",
                label: "Long Knot",
                getPath: (bt, anim) => `hair/longknot/${bt}/${anim}.png`,
            },
            {
                id: "loose",
                label: "Loose",
                getPath: (bt, anim) => `hair/loose/${bt}/${anim}.png`,
            },
            {
                id: "messy1",
                label: "Messy",
                getPath: (bt, anim) => `hair/messy1/${bt}/${anim}.png`,
            },
            {
                id: "messy2",
                label: "Messy 2",
                getPath: (bt, anim) => `hair/messy2/${bt}/${anim}.png`,
            },
            {
                id: "mohawk",
                label: "Mohawk",
                getPath: (bt, anim) => `hair/mohawk/${bt}/${anim}.png`,
            },
            {
                id: "natural",
                label: "Natural",
                getPath: (bt, anim) => `hair/natural/${bt}/${anim}.png`,
            },
            {
                id: "page",
                label: "Page",
                getPath: (bt, anim) => `hair/page/${bt}/${anim}.png`,
            },
            {
                id: "page2",
                label: "Page 2",
                getPath: (bt, anim) => `hair/page2/${bt}/${anim}.png`,
            },
            {
                id: "parted",
                label: "Parted",
                getPath: (bt, anim) => `hair/parted/${bt}/${anim}.png`,
            },
            {
                id: "pixie",
                label: "Pixie",
                getPath: (bt, anim) => `hair/pixie/${bt}/${anim}.png`,
            },
            {
                id: "plain",
                label: "Plain",
                getPath: (bt, anim) => `hair/plain/${bt}/${anim}.png`,
            },
            {
                id: "ponytail",
                label: "Ponytail",
                getPath: (bt, anim) => `hair/ponytail/${bt}/${anim}.png`,
            },
            {
                id: "ponytail2",
                label: "Ponytail 2",
                getPath: (bt, anim) => `hair/ponytail2/${bt}/${anim}.png`,
            },
            {
                id: "princess",
                label: "Princess",
                getPath: (bt, anim) => `hair/princess/${bt}/${anim}.png`,
            },
            {
                id: "shorthawk",
                label: "Shorthawk",
                getPath: (bt, anim) => `hair/shorthawk/${bt}/${anim}.png`,
            },
            {
                id: "shortknot",
                label: "Short Knot",
                getPath: (bt, anim) => `hair/shortknot/${bt}/${anim}.png`,
            },
            {
                id: "shoulderl",
                label: "Shoulder Left",
                getPath: (bt, anim) => `hair/shoulderl/${bt}/${anim}.png`,
            },
            {
                id: "shoulderr",
                label: "Shoulder Right",
                getPath: (bt, anim) => `hair/shoulderr/${bt}/${anim}.png`,
            },
            {
                id: "spiked",
                label: "Spiked",
                getPath: (bt, anim) => `hair/spiked/${bt}/${anim}.png`,
            },
            {
                id: "spiked2",
                label: "Spiked 2",
                getPath: (bt, anim) => `hair/spiked2/${bt}/${anim}.png`,
            },
            {
                id: "swoop",
                label: "Swoop",
                getPath: (bt, anim) => `hair/swoop/${bt}/${anim}.png`,
            },
            {
                id: "unkempt",
                label: "Unkempt",
                getPath: (bt, anim) => `hair/unkempt/${bt}/${anim}.png`,
            },
            {
                id: "wavy",
                label: "Wavy",
                getPath: (bt, anim) => `hair/wavy/${bt}/${anim}.png`,
            },
            {
                id: "xlong",
                label: "Extra Long",
                getPath: (bt, anim) => `hair/xlong/${bt}/${anim}.png`,
            },
        ],
    },
    {
        id: "headwear",
        label: "Headwear",
        zPos: 55,
        required: false,
        items: [
            { id: "none", label: "None", path: null },
            {
                id: "bandana",
                label: "Bandana",
                getPath: (bt, anim) =>
                    `hat/cloth/bandana/adult/${anim}.png`,
            },
            {
                id: "chain_helmet",
                label: "Chain Helmet",
                getPath: (bt, anim) =>
                    `hat/helmet/chain/adult/${anim}.png`,
            },
            {
                id: "leather_cap",
                label: "Leather Cap",
                getPath: (bt, anim) =>
                    `hat/cloth/cap/adult/${anim}.png`,
            },
            {
                id: "plate_helmet",
                label: "Plate Helmet",
                getPath: (bt, anim) =>
                    `hat/helmet/plate/adult/${anim}.png`,
            },
            {
                id: "tiara",
                label: "Tiara",
                getPath: (bt, anim) =>
                    `hat/formal/tiara/adult/${anim}.png`,
            },
            {
                id: "hood_chain",
                label: "Hood (Chain)",
                getPath: (bt, anim) =>
                    `hat/helmet/hood_chain/adult/${anim}.png`,
            },
            {
                id: "hood_cloth",
                label: "Hood (Cloth)",
                getPath: (bt, anim) =>
                    `hat/cloth/hood/adult/${anim}.png`,
            },
            {
                id: "hood_robe",
                label: "Hood (Robe)",
                getPath: (bt, anim) =>
                    `hat/cloth/robe_hood/adult/${anim}.png`,
            },
        ],
    },
    {
        id: "torso",
        label: "Torso",
        zPos: 30,
        required: false,
        items: [
            { id: "none", label: "None", path: null },
            {
                id: "chain_mail_shirt",
                label: "Chain Mail",
                getPath: (bt, anim) =>
                    `torso/chain/mail(v2)/${bt}/${anim}.png`,
            },
            {
                id: "leather_armor",
                label: "Leather Armor",
                getPath: (bt, anim) =>
                    `torso/leather/chest_v2/${bt}/${anim}.png`,
            },
            {
                id: "plate_armor",
                label: "Plate Armor",
                getPath: (bt, anim) =>
                    `torso/plate/chest_armour/${bt}/${anim}.png`,
            },
            {
                id: "longsleeve_laced",
                label: "Longsleeve (Laced)",
                getPath: (bt, anim) =>
                    `torso/shirts/longsleeve/laced/${bt}/${anim}.png`,
            },
            {
                id: "longsleeve_white",
                label: "Longsleeve (White)",
                getPath: (bt, anim) =>
                    `torso/shirts/longsleeve/white_longsleeve/${bt}/${anim}.png`,
            },
            {
                id: "shirt_sleeveless",
                label: "Sleeveless Shirt",
                getPath: (bt, anim) =>
                    `torso/shirts/sleeveless/brown_sleeveless/${bt}/${anim}.png`,
            },
            {
                id: "vest_leather",
                label: "Leather Vest",
                getPath: (bt, anim) =>
                    `torso/leather/vest/${bt}/${anim}.png`,
            },
            {
                id: "robe",
                label: "Robe",
                getPath: (bt, anim) =>
                    `torso/robes/robe/${bt}/${anim}.png`,
            },
        ],
    },
    {
        id: "legs",
        label: "Legs",
        zPos: 20,
        required: false,
        items: [
            { id: "none", label: "None", path: null },
            {
                id: "pants_white",
                label: "White Pants",
                getPath: (bt, anim) =>
                    `legs/pants/white_pants/${bt}/${anim}.png`,
            },
            {
                id: "pants_teal",
                label: "Teal Pants",
                getPath: (bt, anim) =>
                    `legs/pants/teal_pants/${bt}/${anim}.png`,
            },
            {
                id: "pants_red",
                label: "Red Pants",
                getPath: (bt, anim) =>
                    `legs/pants/magenta_pants/${bt}/${anim}.png`,
            },
            {
                id: "legion_skirt",
                label: "Legion Skirt",
                getPath: (bt, anim) =>
                    `legs/skirts/legion/${bt}/${anim}.png`,
            },
            {
                id: "robe_skirt",
                label: "Robe Skirt",
                getPath: (bt, anim) =>
                    `legs/skirts/robe_skirt/${bt}/${anim}.png`,
            },
            {
                id: "plate_legs",
                label: "Plate Legs",
                getPath: (bt, anim) =>
                    `legs/armor/plate_legs/${bt}/${anim}.png`,
            },
        ],
    },
    {
        id: "feet",
        label: "Feet",
        zPos: 18,
        required: false,
        items: [
            { id: "none", label: "Barefoot", path: null },
            {
                id: "shoes_brown",
                label: "Brown Shoes",
                getPath: (bt, anim) =>
                    `feet/shoes/brown_shoes/${bt}/${anim}.png`,
            },
            {
                id: "shoes_black",
                label: "Black Shoes",
                getPath: (bt, anim) =>
                    `feet/shoes/maroon_shoes/${bt}/${anim}.png`,
            },
            {
                id: "boots_tall",
                label: "Tall Boots",
                getPath: (bt, anim) =>
                    `feet/boots/brown_tall_boots/${bt}/${anim}.png`,
            },
            {
                id: "plate_boots",
                label: "Plate Boots",
                getPath: (bt, anim) =>
                    `feet/armor/plate_boots/${bt}/${anim}.png`,
            },
            {
                id: "golden_boots",
                label: "Golden Boots",
                getPath: (bt, anim) =>
                    `feet/boots/golden_boots/${bt}/${anim}.png`,
            },
        ],
    },
    {
        id: "arms",
        label: "Arms",
        zPos: 35,
        required: false,
        items: [
            { id: "none", label: "None", path: null },
            {
                id: "plate_arms",
                label: "Plate Arms",
                getPath: (bt, anim) =>
                    `arms/armor/plate/${bt}/${anim}.png`,
            },
            {
                id: "leather_bracers",
                label: "Leather Bracers",
                getPath: (bt, anim) =>
                    `arms/bracers/leather/${bt}/${anim}.png`,
            },
            {
                id: "plate_bracers",
                label: "Plate Bracers",
                getPath: (bt, anim) =>
                    `arms/bracers/plate/${bt}/${anim}.png`,
            },
            {
                id: "gloves",
                label: "Gloves",
                getPath: (bt, anim) =>
                    `arms/gloves/cloth/${bt}/${anim}.png`,
            },
        ],
    },
    {
        id: "weapons",
        label: "Weapons",
        zPos: 60,
        required: false,
        items: [
            { id: "none", label: "None", path: null },
            {
                id: "dagger",
                label: "Dagger",
                getPath: (bt, anim) =>
                    `weapons/right hand/dagger/male/${anim}.png`,
            },
            {
                id: "longsword",
                label: "Longsword",
                getPath: (bt, anim) =>
                    `weapons/right hand/longsword/male/${anim}.png`,
            },
            {
                id: "rapier",
                label: "Rapier",
                getPath: (bt, anim) =>
                    `weapons/right hand/rapier/male/${anim}.png`,
            },
            {
                id: "spear",
                label: "Spear",
                getPath: (bt, anim) =>
                    `weapons/right hand/spear/male/${anim}.png`,
            },
            {
                id: "bow",
                label: "Bow",
                getPath: (bt, anim) =>
                    `weapons/left hand/bow/male/${anim}.png`,
            },
            {
                id: "shield_round",
                label: "Round Shield",
                getPath: (bt, anim) =>
                    `weapons/left hand/shield_round/male/${anim}.png`,
            },
            {
                id: "shield_kite",
                label: "Kite Shield",
                getPath: (bt, anim) =>
                    `weapons/left hand/shield_kite/male/${anim}.png`,
            },
        ],
    },
    {
        id: "tools",
        label: "Tools",
        zPos: 58,
        required: false,
        items: [
            { id: "none", label: "None", path: null },
            {
                id: "woodaxe",
                label: "Wood Axe",
                getPath: (bt, anim) =>
                    `tools/woodaxe/male/${anim}.png`,
            },
            {
                id: "pickaxe",
                label: "Pickaxe",
                getPath: (bt, anim) =>
                    `tools/pickaxe/male/${anim}.png`,
            },
            {
                id: "hoe",
                label: "Hoe",
                getPath: (bt, anim) =>
                    `tools/hoe/male/${anim}.png`,
            },
            {
                id: "wateringcan",
                label: "Watering Can",
                getPath: (bt, anim) =>
                    `tools/wateringcan/male/${anim}.png`,
            },
        ],
    },
];

/**
 * Get full CDN URL for a sprite path
 */
export function getSpriteUrl(relativePath) {
    return `${CDN_BASE}/${relativePath}`;
}

/**
 * Get the category definition by id
 */
export function getCategoryById(categoryId) {
    return CATEGORIES.find((c) => c.id === categoryId);
}

/**
 * Get all category IDs
 */
export function getAllCategoryIds() {
    return CATEGORIES.map((c) => c.id);
}

export { CDN_BASE };
