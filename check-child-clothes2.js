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
        "feet/shoes/child/walk.png",
        "feet/shoes/child/walk/brown.png",
        "feet/shoes/basic/child/walk.png",
        "feet/shoes/basic/child/walk/brown.png",
        "torso/clothes/child/walk/white.png",
        "torso/clothes/shirt/child/walk/red.png",
        "torso/clothes/shirt/child/walk/teal.png"
    ];

    for (const path of pathsToCheck) {
        const url = `${CDN_BASE}/${path}`;
        const exists = await checkUrl(url);
        console.log(`[${exists ? 'EXISTS' : 'MISSING'}] ${path}`);
    }
}
main();
