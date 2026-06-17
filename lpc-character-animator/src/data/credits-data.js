/**
 * LPC Credits Data
 *
 * This module provides license and attribution information for LPC sprites.
 * Based on the CREDITS.csv from the Universal LPC Spritesheet Character Generator.
 *
 * Per LPC licensing requirements, users MUST credit authors when using non-CC0 artwork.
 * This add-on surfaces credits for every sprite layer used in the generated character.
 */

/**
 * Core body credits - these apply to all body type sprites
 */
export const BODY_CREDITS = {
    authors: [
        "bluecarrot16",
        "JaidynReiman",
        "Benjamin K. Smith (BenCreating)",
        "Evert",
        "Eliza Wyatt (ElizaWy)",
        "TheraHedwig",
        "MuffinElZangano",
        "Durrani",
        "Johannes Sjölund (wulax)",
        "Stephen Challener (Redshrike)",
        "Pierre Vigier (pvigier)",
        "Matthew Krohn (makrohn)",
        "Nila122",
        "kheftel",
        "Sander Frenken (castelonia)",
        "dalonedrau",
    ],
    licenses: ["OGA-BY 3.0", "CC-BY-SA 3.0", "GPL 3.0"],
    urls: [
        "https://opengameart.org/content/liberated-pixel-cup-lpc-base-assets-sprites-map-tiles",
        "https://opengameart.org/content/lpc-medieval-fantasy-character-sprites",
        "https://opengameart.org/content/lpc-revised-character-basics",
        "https://opengameart.org/content/lpc-character-bases",
    ],
};

/**
 * Generic credits map for sprite categories.
 * Maps category path prefixes to their credits info.
 */
export const CREDITS_MAP = {
    "body/": {
        ...BODY_CREDITS,
        notes: "See details at https://opengameart.org/content/lpc-character-bases",
    },
    "hair/": {
        authors: [
            "bluecarrot16",
            "Manuel Riecke (MrBeast)",
            "Joe White",
            "Mandi Paugh",
            "ElizaWy",
            "Stephen Challener (Redshrike)",
            "JaidynReiman",
            "Johannes Sjölund (wulax)",
            "Nila122",
        ],
        licenses: ["OGA-BY 3.0", "CC-BY-SA 3.0", "GPL 3.0"],
        urls: [
            "https://opengameart.org/content/lpc-character-bases",
            "https://opengameart.org/content/liberated-pixel-cup-lpc-base-assets-sprites-map-tiles",
        ],
    },
    "head/": {
        authors: [
            "bluecarrot16",
            "ElizaWy",
            "Benjamin K. Smith (BenCreating)",
            "Stephen Challener (Redshrike)",
        ],
        licenses: ["OGA-BY 3.0", "CC-BY-SA 3.0", "GPL 3.0"],
        urls: [
            "https://opengameart.org/content/lpc-character-bases",
        ],
    },
    "headwear/": {
        authors: [
            "Johannes Sjölund (wulax)",
            "Stephen Challener (Redshrike)",
            "bluecarrot16",
        ],
        licenses: ["CC-BY-SA 3.0", "GPL 3.0"],
        urls: [
            "https://opengameart.org/content/lpc-medieval-fantasy-character-sprites",
        ],
    },
    "torso/": {
        authors: [
            "Johannes Sjölund (wulax)",
            "bluecarrot16",
            "Matthew Krohn (makrohn)",
            "Stephen Challener (Redshrike)",
            "Luke Mehl",
            "Lanea Zimmerman (Sharm)",
            "ElizaWy",
        ],
        licenses: ["CC-BY-SA 3.0", "GPL 3.0"],
        urls: [
            "https://opengameart.org/content/lpc-medieval-fantasy-character-sprites",
            "https://opengameart.org/content/liberated-pixel-cup-lpc-base-assets-sprites-map-tiles",
        ],
    },
    "legs/": {
        authors: [
            "bluecarrot16",
            "Johannes Sjölund (wulax)",
            "Stephen Challener (Redshrike)",
            "Matthew Krohn (makrohn)",
            "Luke Mehl",
            "ElizaWy",
        ],
        licenses: ["CC-BY-SA 3.0", "GPL 3.0"],
        urls: [
            "https://opengameart.org/content/lpc-medieval-fantasy-character-sprites",
            "https://opengameart.org/content/liberated-pixel-cup-lpc-base-assets-sprites-map-tiles",
        ],
    },
    "feet/": {
        authors: [
            "Johannes Sjölund (wulax)",
            "bluecarrot16",
            "Stephen Challener (Redshrike)",
            "ElizaWy",
        ],
        licenses: ["CC-BY-SA 3.0", "GPL 3.0"],
        urls: [
            "https://opengameart.org/content/lpc-medieval-fantasy-character-sprites",
        ],
    },
    "arms/": {
        authors: [
            "Johannes Sjölund (wulax)",
            "bluecarrot16",
            "Stephen Challener (Redshrike)",
        ],
        licenses: ["CC-BY-SA 3.0", "GPL 3.0"],
        urls: [
            "https://opengameart.org/content/lpc-medieval-fantasy-character-sprites",
        ],
    },
    "weapons/": {
        authors: [
            "Johannes Sjölund (wulax)",
            "bluecarrot16",
            "Stephen Challener (Redshrike)",
            "Matthew Krohn (makrohn)",
            "Shaun Williams",
            "Daniel Eddeland (daneeklu)",
        ],
        licenses: ["CC-BY-SA 3.0", "GPL 3.0"],
        urls: [
            "https://opengameart.org/content/lpc-medieval-fantasy-character-sprites",
        ],
    },
    "tools/": {
        authors: [
            "bluecarrot16",
            "Johannes Sjölund (wulax)",
            "Daniel Eddeland (daneeklu)",
        ],
        licenses: ["CC-BY-SA 3.0", "GPL 3.0"],
        urls: [
            "https://opengameart.org/content/lpc-farming-tilesets-magic-animations-and-ui-elements",
        ],
    },
};

/**
 * Get credits for a specific sprite path
 */
export function getCreditsForPath(spritePath) {
    for (const [prefix, credits] of Object.entries(CREDITS_MAP)) {
        if (spritePath.startsWith(prefix)) {
            return credits;
        }
    }
    return BODY_CREDITS; // fallback
}

/**
 * Aggregate credits from multiple sprite paths (deduplicate authors)
 */
export function aggregateCredits(spritePaths) {
    const allAuthors = new Set();
    const allLicenses = new Set();
    const allUrls = new Set();

    for (const path of spritePaths) {
        if (!path) continue;
        const credits = getCreditsForPath(path);
        credits.authors.forEach((a) => allAuthors.add(a));
        credits.licenses.forEach((l) => allLicenses.add(l));
        credits.urls.forEach((u) => allUrls.add(u));
    }

    return {
        authors: Array.from(allAuthors),
        licenses: Array.from(allLicenses),
        urls: Array.from(allUrls),
    };
}

/**
 * Format credits as plain text for clipboard / download
 */
export function formatCreditsText(credits) {
    let text = "=== LPC Sprite Credits ===\n\n";
    text += "This character sprite was generated using assets from the\n";
    text += "Liberated Pixel Cup (LPC) project.\n\n";
    text += "Authors:\n";
    credits.authors.forEach((a) => {
        text += `  - ${a}\n`;
    });
    text += "\nLicenses:\n";
    credits.licenses.forEach((l) => {
        text += `  - ${l}\n`;
    });
    text += "\nSource URLs:\n";
    credits.urls.forEach((u) => {
        text += `  - ${u}\n`;
    });
    text += "\nGenerated by LPC Character Animator for Adobe Express\n";
    text += "https://github.com/liberatedpixelcup/Universal-LPC-Spritesheet-Character-Generator\n";
    return text;
}
