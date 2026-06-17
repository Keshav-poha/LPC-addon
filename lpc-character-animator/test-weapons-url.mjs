async function check(url) {
    try {
        const res = await fetch(url, { method: 'HEAD' });
        console.log(`${url} -> status ${res.status}`);
    } catch (e) {
        console.error(`${url} failed:`, e);
    }
}

async function run() {
    console.log('Testing GitHub CDN URLs for Weapons/Tools:');
    // Dagger
    await check('https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/spritesheets/weapon/sword/dagger/male/walk.png');
    // Longsword
    await check('https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/spritesheets/weapon/sword/longsword/male/walk.png');
    // Spear
    await check('https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/spritesheets/weapon/polearm/spear/foreground/walk.png');
    // Shield round
    await check('https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/spritesheets/shield/round/walk.png');
    // Bow normal
    await check('https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/spritesheets/weapon/ranged/bow/normal/universal/foreground/walk.png');
    // Tool smash
    await check('https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/spritesheets/tools/smash/universal/male/walk.png');
    // Tool smash (alternative singular)
    await check('https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/spritesheets/tool/smash/universal/male/walk.png');
}

run();
