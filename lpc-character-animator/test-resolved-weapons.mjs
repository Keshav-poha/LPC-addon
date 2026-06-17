async function check(url) {
    try {
        const res = await fetch(url, { method: 'HEAD' });
        console.log(`${url} -> status ${res.status}`);
        return res.ok;
    } catch (e) {
        return false;
    }
}

async function run() {
    console.log('Testing resolved CDN URLs:');
    // Dagger
    await check('https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/spritesheets/weapon/sword/dagger/walk.png');
    // Longsword
    await check('https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/spritesheets/weapon/sword/longsword/walk.png');
    // Spear
    await check('https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/spritesheets/weapon/polearm/spear/foreground/walk.png');
    // Bow
    await check('https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/spritesheets/weapon/ranged/bow/normal/universal/foreground/walk.png');
}

run();
