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

function getTorsoGender(bt) {
    if (bt === "female" || bt === "pregnant" || bt === "teen") {
        return "female";
    }
    if (bt === "male" || bt === "muscular") {
        return "male";
    }
    return null;
}

function getTorsoPath(itemId, bt, anim) {
    if (bt === "child") return null;
    const gender = getTorsoGender(bt);
    if (!gender) return null;
    
    if (itemId === "chain_mail_shirt") {
        return `torso/chainmail/${gender}/${anim}.png`;
    }
    if (itemId === "leather_armor") {
        return `torso/armour/leather/${gender}/${anim}.png`;
    }
    if (itemId === "plate_armor") {
        return `torso/armour/plate/${gender}/${anim}.png`;
    }
    if (itemId === "longsleeve_laced") {
        if (gender !== "male") return null;
        return `torso/clothes/longsleeve/laced/male/${anim}/white.png`;
    }
    if (itemId === "longsleeve_white") {
        return `torso/clothes/longsleeve/longsleeve/${gender}/${anim}.png`;
    }
    if (itemId === "shirt_sleeveless") {
        return `torso/clothes/sleeveless/sleeveless/${gender}/${anim}/white.png`;
    }
    if (itemId === "vest_leather") {
        if (gender !== "male") return null;
        return `torso/clothes/vest/male/${anim}/leather.png`;
    }
    if (itemId === "robe") {
        if (gender !== "female") return null;
        return `torso/clothes/robe/female/${anim}/white.png`;
    }
    return null;
}

function getLegsPrefix(bt) {
    if (bt === "child") return "child";
    if (bt === "female" || bt === "pregnant" || bt === "teen") return "thin";
    if (bt === "male" || bt === "muscular") return "male";
    return null;
}

function getLegsPath(itemId, bt, anim) {
    const dir = getLegsPrefix(bt);
    if (!dir) return null;
    
    if (itemId === "pants_white") {
        return `legs/pants/${dir}/${anim}/white.png`;
    }
    if (itemId === "pants_teal") {
        if (dir === "child") return null;
        return `legs/pants/${dir}/${anim}/teal.png`;
    }
    if (itemId === "pants_red") {
        const colorFile = (dir === "child" || dir === "thin") ? "red.png" : "magenta.png";
        return `legs/pants/${dir}/${anim}/${colorFile}`;
    }
    if (itemId === "legion_skirt") {
        if (bt === "child") return null;
        return `legs/skirts/legion/${dir}/${anim}.png`;
    }
    if (itemId === "robe_skirt") {
        return null;
    }
    if (itemId === "plate_legs") {
        if (bt === "child" || bt === "pregnant" || bt === "muscular") return null;
        return `legs/armour/plate/${dir}/${anim}.png`;
    }
    return null;
}

function getFeetPath(itemId, bt, anim) {
    if (bt === "child") return null;
    const dir = (bt === "female" || bt === "pregnant" || bt === "teen") ? "thin" : "male";
    
    if (itemId === "shoes_brown") {
        return `feet/shoes/basic/${dir}/${anim}.png`;
    }
    if (itemId === "shoes_black") {
        return `feet/shoes/revised/${dir}/${anim}.png`;
    }
    if (itemId === "boots_tall") {
        return `feet/boots/basic/${dir}/${anim}.png`;
    }
    if (itemId === "plate_boots") {
        if (bt === "child" || bt === "pregnant" || bt === "teen" || bt === "muscular") return null;
        const plateDir = (bt === "female") ? "female" : "male";
        return `feet/armour/plate/${plateDir}/${anim}/steel.png`;
    }
    if (itemId === "golden_boots") {
        return null;
    }
    return null;
}

function getArmsPath(itemId, bt, anim) {
    if (bt === "child") return null;
    const dir = (bt === "female" || bt === "pregnant" || bt === "teen") ? "thin" : "male";
    
    if (itemId === "plate_arms") {
        return `arms/armour/plate/${dir}/${anim}.png`;
    }
    if (itemId === "leather_bracers" || itemId === "plate_bracers") {
        return `arms/bracers/${dir}/${anim}.png`;
    }
    if (itemId === "gloves") {
        return `arms/hands/gloves/${dir}/${anim}.png`;
    }
    return null;
}

function getWeaponPath(itemId, bt, anim) {
    if (bt === "child") return null;
    
    if (itemId === "dagger") {
        return `weapon/sword/dagger/${anim}/dagger.png`;
    }
    if (itemId === "longsword") {
        return `weapon/sword/longsword/${anim}/longsword.png`;
    }
    if (itemId === "rapier") {
        return `weapon/sword/rapier/${anim}/rapier.png`;
    }
    if (itemId === "spear") {
        return `weapon/polearm/spear/foreground/${anim}/steel.png`;
    }
    if (itemId === "bow") {
        if (anim === "walk") {
            return `weapon/ranged/bow/normal/walk/foreground/normal.png`;
        }
        if (anim === "shoot") {
            return `weapon/ranged/bow/normal/universal/foreground/shoot/normal.png`;
        }
        if (anim === "hurt") {
            return `weapon/ranged/bow/normal/universal/foreground/hurt/normal.png`;
        }
        return null;
    }
    if (itemId === "shield_round") {
        if (bt === "teen") return null;
        return `shield/round/${anim}.png`;
    }
    if (itemId === "shield_kite") {
        if (bt === "teen") return null;
        const dir = (bt === "female" || bt === "pregnant") ? "female" : "male";
        return `shield/kite/${dir}/${anim}/kite_gray.png`;
    }
    return null;
}

function getToolPath(itemId, bt, anim) {
    if (bt === "child") return null;
    const gender = (bt === "female" || bt === "pregnant" || bt === "teen") ? "female" : "male";
    
    if (itemId === "woodaxe") {
        return `tools/smash/universal/${gender}/${anim}/axe.png`;
    }
    if (itemId === "pickaxe") {
        return `tools/smash/universal/${gender}/${anim}/pickaxe.png`;
    }
    if (itemId === "hoe") {
        return `tools/thrust/foreground/${anim}/hoe.png`;
    }
    if (itemId === "wateringcan") {
        return `tools/thrust/foreground/${anim}/watering.png`;
    }
    return null;
}

function getHairPath(hairId, bt, anim) {
    if (bt === "child") {
        if (hairId === "jewfro") return `hair/jewfro/child/${anim}.png`;
        if (hairId === "wavy") return `hair/wavy/child/${anim}.png`;
        if (hairId === "swoop") return `hair/swoop_side/child/${anim}.png`;
        return null;
    }
    
    const fgStyles = [
        "bangslong2",
        "braids",
        "ponytail",
        "ponytail2",
        "princess",
        "shoulderl",
        "shoulderr",
        "wavy",
        "xlong"
    ];
    
    let folder = hairId;
    if (hairId === "braids") folder = "braid";
    else if (hairId === "curly") folder = "curly_long";
    else if (hairId === "messy2") folder = "long_messy2";
    else if (hairId === "xlong") folder = "curls_large_xlong";
    
    const unsupported = ["bob2", "mohawk", "longknot", "shortknot"];
    if (unsupported.includes(hairId)) return null;
    
    if (fgStyles.includes(hairId)) {
        return `hair/${folder}/adult/fg/${anim}.png`;
    }
    return `hair/${folder}/adult/${anim}.png`;
}

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
                            bt === "child" ? null : `head/nose/big/adult/${anim}.png`,
                    },
                    {
                        id: "buttonnose",
                        label: "Button Nose",
                        getPath: (bt, anim) =>
                            bt === "child" ? null : `head/nose/button/adult/${anim}.png`,
                    },
                    {
                        id: "straightnose",
                        label: "Straight Nose",
                        getPath: (bt, anim) =>
                            bt === "child" ? null : `head/nose/straight/adult/${anim}.png`,
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
                            bt === "child"
                                ? `eyes/human/child/${anim}/blue.png`
                                : `eyes/human/adult/neutral/default/${anim}/blue.png`,
                    },
                    {
                        id: "eyes_brown",
                        label: "Brown Eyes",
                        getPath: (bt, anim) =>
                            bt === "child"
                                ? `eyes/human/child/${anim}/brown.png`
                                : `eyes/human/adult/neutral/default/${anim}/brown.png`,
                    },
                    {
                        id: "eyes_green",
                        label: "Green Eyes",
                        getPath: (bt, anim) =>
                            bt === "child"
                                ? `eyes/human/child/${anim}/green.png`
                                : `eyes/human/adult/neutral/default/${anim}/green.png`,
                    },
                    {
                        id: "eyes_gray",
                        label: "Gray Eyes",
                        getPath: (bt, anim) =>
                            bt === "child"
                                ? `eyes/human/child/${anim}/gray.png`
                                : `eyes/human/adult/neutral/default/${anim}/gray.png`,
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
            { id: "bangs", label: "Bangs", getPath: (bt, anim) => getHairPath("bangs", bt, anim) },
            { id: "bangslong", label: "Bangs Long", getPath: (bt, anim) => getHairPath("bangslong", bt, anim) },
            { id: "bangslong2", label: "Bangs Long 2", getPath: (bt, anim) => getHairPath("bangslong2", bt, anim) },
            { id: "bangsshort", label: "Bangs Short", getPath: (bt, anim) => getHairPath("bangsshort", bt, anim) },
            { id: "bedhead", label: "Bedhead", getPath: (bt, anim) => getHairPath("bedhead", bt, anim) },
            { id: "bob", label: "Bob", getPath: (bt, anim) => getHairPath("bob", bt, anim) },
            { id: "bob2", label: "Bob 2", getPath: (bt, anim) => getHairPath("bob2", bt, anim) },
            { id: "braids", label: "Braids", getPath: (bt, anim) => getHairPath("braids", bt, anim) },
            { id: "buzzcut", label: "Buzzcut", getPath: (bt, anim) => getHairPath("buzzcut", bt, anim) },
            { id: "cornrows", label: "Cornrows", getPath: (bt, anim) => getHairPath("cornrows", bt, anim) },
            { id: "curly", label: "Curly", getPath: (bt, anim) => getHairPath("curly", bt, anim) },
            { id: "curtains", label: "Curtains", getPath: (bt, anim) => getHairPath("curtains", bt, anim) },
            { id: "jewfro", label: "Jewfro", getPath: (bt, anim) => getHairPath("jewfro", bt, anim) },
            { id: "longhawk", label: "Longhawk", getPath: (bt, anim) => getHairPath("longhawk", bt, anim) },
            { id: "longknot", label: "Long Knot", getPath: (bt, anim) => getHairPath("longknot", bt, anim) },
            { id: "loose", label: "Loose", getPath: (bt, anim) => getHairPath("loose", bt, anim) },
            { id: "messy1", label: "Messy", getPath: (bt, anim) => getHairPath("messy1", bt, anim) },
            { id: "messy2", label: "Messy 2", getPath: (bt, anim) => getHairPath("messy2", bt, anim) },
            { id: "mohawk", label: "Mohawk", getPath: (bt, anim) => getHairPath("mohawk", bt, anim) },
            { id: "natural", label: "Natural", getPath: (bt, anim) => getHairPath("natural", bt, anim) },
            { id: "page", label: "Page", getPath: (bt, anim) => getHairPath("page", bt, anim) },
            { id: "page2", label: "Page 2", getPath: (bt, anim) => getHairPath("page2", bt, anim) },
            { id: "parted", label: "Parted", getPath: (bt, anim) => getHairPath("parted", bt, anim) },
            { id: "pixie", label: "Pixie", getPath: (bt, anim) => getHairPath("pixie", bt, anim) },
            { id: "plain", label: "Plain", getPath: (bt, anim) => getHairPath("plain", bt, anim) },
            { id: "ponytail", label: "Ponytail", getPath: (bt, anim) => getHairPath("ponytail", bt, anim) },
            { id: "ponytail2", label: "Ponytail 2", getPath: (bt, anim) => getHairPath("ponytail2", bt, anim) },
            { id: "princess", label: "Princess", getPath: (bt, anim) => getHairPath("princess", bt, anim) },
            { id: "shorthawk", label: "Shorthawk", getPath: (bt, anim) => getHairPath("shorthawk", bt, anim) },
            { id: "shortknot", label: "Short Knot", getPath: (bt, anim) => getHairPath("shortknot", bt, anim) },
            { id: "shoulderl", label: "Shoulder Left", getPath: (bt, anim) => getHairPath("shoulderl", bt, anim) },
            { id: "shoulderr", label: "Shoulder Right", getPath: (bt, anim) => getHairPath("shoulderr", bt, anim) },
            { id: "spiked", label: "Spiked", getPath: (bt, anim) => getHairPath("spiked", bt, anim) },
            { id: "spiked2", label: "Spiked 2", getPath: (bt, anim) => getHairPath("spiked2", bt, anim) },
            { id: "swoop", label: "Swoop", getPath: (bt, anim) => getHairPath("swoop", bt, anim) },
            { id: "unkempt", label: "Unkempt", getPath: (bt, anim) => getHairPath("unkempt", bt, anim) },
            { id: "wavy", label: "Wavy", getPath: (bt, anim) => getHairPath("wavy", bt, anim) },
            { id: "xlong", label: "Extra Long", getPath: (bt, anim) => getHairPath("xlong", bt, anim) },
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
                    bt === "child" ? null : `hat/cloth/bandana/adult/${anim}.png`,
            },
            {
                id: "chain_helmet",
                label: "Chain Helmet",
                getPath: (bt, anim) =>
                    bt === "child" ? null : `hat/helmet/mail/adult/${anim}.png`,
            },
            {
                id: "leather_cap",
                label: "Leather Cap",
                getPath: (bt, anim) =>
                    bt === "child" ? null : `hat/cloth/leather_cap/adult/${anim}.png`,
            },
            {
                id: "plate_helmet",
                label: "Plate Helmet",
                getPath: (bt, anim) =>
                    bt === "child" ? null : `hat/helmet/bascinet/adult/${anim}.png`,
            },
            {
                id: "tiara",
                label: "Tiara",
                getPath: (bt, anim) =>
                    bt === "child" ? null : `hat/formal/tiara/adult/${anim}.png`,
            },
            {
                id: "hood_chain",
                label: "Hood (Chain)",
                getPath: () => null,
            },
            {
                id: "hood_cloth",
                label: "Hood (Cloth)",
                getPath: (bt, anim) =>
                    bt === "child" ? null : `hat/cloth/hood/adult/${anim}.png`,
            },
            {
                id: "hood_robe",
                label: "Hood (Robe)",
                getPath: () => null,
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
                getPath: (bt, anim) => getTorsoPath("chain_mail_shirt", bt, anim),
            },
            {
                id: "leather_armor",
                label: "Leather Armor",
                getPath: (bt, anim) => getTorsoPath("leather_armor", bt, anim),
            },
            {
                id: "plate_armor",
                label: "Plate Armor",
                getPath: (bt, anim) => getTorsoPath("plate_armor", bt, anim),
            },
            {
                id: "longsleeve_laced",
                label: "Longsleeve (Laced)",
                getPath: (bt, anim) => getTorsoPath("longsleeve_laced", bt, anim),
            },
            {
                id: "longsleeve_white",
                label: "Longsleeve (White)",
                getPath: (bt, anim) => getTorsoPath("longsleeve_white", bt, anim),
            },
            {
                id: "shirt_sleeveless",
                label: "Sleeveless Shirt",
                getPath: (bt, anim) => getTorsoPath("shirt_sleeveless", bt, anim),
            },
            {
                id: "vest_leather",
                label: "Leather Vest",
                getPath: (bt, anim) => getTorsoPath("vest_leather", bt, anim),
            },
            {
                id: "robe",
                label: "Robe",
                getPath: (bt, anim) => getTorsoPath("robe", bt, anim),
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
                getPath: (bt, anim) => getLegsPath("pants_white", bt, anim),
            },
            {
                id: "pants_teal",
                label: "Teal Pants",
                getPath: (bt, anim) => getLegsPath("pants_teal", bt, anim),
            },
            {
                id: "pants_red",
                label: "Red Pants",
                getPath: (bt, anim) => getLegsPath("pants_red", bt, anim),
            },
            {
                id: "legion_skirt",
                label: "Legion Skirt",
                getPath: (bt, anim) => getLegsPath("legion_skirt", bt, anim),
            },
            {
                id: "robe_skirt",
                label: "Robe Skirt",
                getPath: (bt, anim) => getLegsPath("robe_skirt", bt, anim),
            },
            {
                id: "plate_legs",
                label: "Plate Legs",
                getPath: (bt, anim) => getLegsPath("plate_legs", bt, anim),
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
                getPath: (bt, anim) => getFeetPath("shoes_brown", bt, anim),
            },
            {
                id: "shoes_black",
                label: "Black Shoes",
                getPath: (bt, anim) => getFeetPath("shoes_black", bt, anim),
            },
            {
                id: "boots_tall",
                label: "Tall Boots",
                getPath: (bt, anim) => getFeetPath("boots_tall", bt, anim),
            },
            {
                id: "plate_boots",
                label: "Plate Boots",
                getPath: (bt, anim) => getFeetPath("plate_boots", bt, anim),
            },
            {
                id: "golden_boots",
                label: "Golden Boots",
                getPath: (bt, anim) => getFeetPath("golden_boots", bt, anim),
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
                getPath: (bt, anim) => getArmsPath("plate_arms", bt, anim),
            },
            {
                id: "leather_bracers",
                label: "Leather Bracers",
                getPath: (bt, anim) => getArmsPath("leather_bracers", bt, anim),
            },
            {
                id: "plate_bracers",
                label: "Plate Bracers",
                getPath: (bt, anim) => getArmsPath("plate_bracers", bt, anim),
            },
            {
                id: "gloves",
                label: "Gloves",
                getPath: (bt, anim) => getArmsPath("gloves", bt, anim),
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
                getPath: (bt, anim) => getWeaponPath("dagger", bt, anim),
            },
            {
                id: "longsword",
                label: "Longsword",
                getPath: (bt, anim) => getWeaponPath("longsword", bt, anim),
            },
            {
                id: "rapier",
                label: "Rapier",
                getPath: (bt, anim) => getWeaponPath("rapier", bt, anim),
            },
            {
                id: "spear",
                label: "Spear",
                getPath: (bt, anim) => getWeaponPath("spear", bt, anim),
            },
            {
                id: "bow",
                label: "Bow",
                getPath: (bt, anim) => getWeaponPath("bow", bt, anim),
            },
            {
                id: "shield_round",
                label: "Round Shield",
                getPath: (bt, anim) => getWeaponPath("shield_round", bt, anim),
            },
            {
                id: "shield_kite",
                label: "Kite Shield",
                getPath: (bt, anim) => getWeaponPath("shield_kite", bt, anim),
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
                getPath: (bt, anim) => getToolPath("woodaxe", bt, anim),
            },
            {
                id: "pickaxe",
                label: "Pickaxe",
                getPath: (bt, anim) => getToolPath("pickaxe", bt, anim),
            },
            {
                id: "hoe",
                label: "Hoe",
                getPath: (bt, anim) => getToolPath("hoe", bt, anim),
            },
            {
                id: "wateringcan",
                label: "Watering Can",
                getPath: (bt, anim) => getToolPath("wateringcan", bt, anim),
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
