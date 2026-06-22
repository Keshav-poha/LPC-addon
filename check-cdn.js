const https = require('https');

const BODY_TYPES = ["male", "female", "muscular", "pregnant", "teen", "child"];
const ANIMATIONS = [
    "idle", "walk", "run", "jump", "sit", "emote", "climb",
    "spellcast", "thrust", "slash", "shoot", "hurt", "combat",
    "1h_slash", "1h_backslash", "1h_halfslash", "watering"
];

const ANIMATION_FOLDER_MAP = {
    "1h_slash": "backslash",
    "1h_backslash": "backslash",
    "1h_halfslash": "halfslash",
    "watering": "thrust",
    "combat": "combat_idle"
};

const CDN_BASE = "https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/spritesheets";

async function checkUrl(url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            resolve(res.statusCode === 200);
            res.resume(); // consume response data to free up memory
        }).on('error', () => {
            resolve(false);
        });
    });
}

async function main() {
    const incompatible = [];
    
    for (const bt of BODY_TYPES) {
        for (const anim of ANIMATIONS) {
            const mappedAnim = ANIMATION_FOLDER_MAP[anim] || anim;
            const url = `${CDN_BASE}/body/bodies/${bt}/${mappedAnim}.png`;
            const exists = await checkUrl(url);
            if (!exists) {
                console.log(`[MISSING] Body: ${bt}, Animation: ${anim} (Path: body/bodies/${bt}/${mappedAnim}.png)`);
                incompatible.push({ bt, anim });
            }
        }
    }
    
    console.log("Summary of incompatible pairs:");
    console.log(JSON.stringify(incompatible, null, 2));
}

main();
