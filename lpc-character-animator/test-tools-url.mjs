async function check(url) {
    try {
        const res = await fetch(url, { method: 'HEAD' });
        console.log(`${url} -> status ${res.status}`);
    } catch (e) {
        console.error(`${url} failed:`, e);
    }
}

async function run() {
    console.log('Testing GitHub CDN URLs for Tools:');
    await check('https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/spritesheets/tools/smash/universal/male/walk.png');
    await check('https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/spritesheets/tools/thrust/foreground/walk.png');
    await check('https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/spritesheets/tools/whip/walk.png');
    await check('https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/spritesheets/tools/rod/foreground/walk.png');
}

run();
