const https = require('https');

const CDN_BASE = "https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/spritesheets";

async function checkUrl(url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            resolve(res.statusCode === 200);
            res.resume();
        }).on('error', () => {
            resolve(false);
        });
    });
}

async function main() {
    const pathsToCheck = [
        "torso/clothes/longsleeve/child/walk.png",
        "torso/clothes/shirt/child/walk/white.png",
        "torso/clothes/longsleeve/laced/child/walk/white.png",
        "torso/clothes/sleeveless/child/walk/white.png",
        "torso/clothes/tunic/child/walk/white.png",
        "torso/clothes/dress/child/walk.png",
        "legs/pants/child/walk/white.png",
        "legs/pants/child/walk/red.png",
        "feet/shoes/basic/child/walk.png",
        "feet/shoes/basic/child/walk/brown.png",
        "hat/cloth/bandana/child/walk.png",
        "hat/cloth/cap/child/walk.png"
    ];

    for (const path of pathsToCheck) {
        const url = `${CDN_BASE}/${path}`;
        const exists = await checkUrl(url);
        console.log(`[${exists ? 'EXISTS' : 'MISSING'}] ${path}`);
    }
}

main();
