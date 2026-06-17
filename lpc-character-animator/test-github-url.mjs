async function check(url) {
    try {
        const res = await fetch(url, { method: 'HEAD' });
        console.log(`${url} -> status ${res.status}`);
    } catch (e) {
        console.error(`${url} failed:`, e);
    }
}

async function run() {
    console.log('Testing GitHub CDN URLs for Head (Ears/Nose):');
    // Ears
    await check('https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/spritesheets/head/ears/big/adult/walk.png');
    // Nose
    await check('https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/spritesheets/head/nose/big/adult/walk.png');
}

run();
