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
    console.log('Testing GitHub CDN URLs for Weapon materials:');
    const materials = ['steel', 'iron', 'wood', 'bronze', 'silver', 'gold', 'base', 'default', 'normal', 'metal'];
    
    // Dagger
    for (const mat of materials) {
        const url = `https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/spritesheets/weapon/sword/dagger/male/walk/${mat}.png`;
        const ok = await check(url);
        if (ok) break;
    }

    // Longsword
    for (const mat of materials) {
        const url = `https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/spritesheets/weapon/sword/longsword/male/walk/${mat}.png`;
        const ok = await check(url);
        if (ok) break;
    }

    // Spear
    for (const mat of materials) {
        const url = `https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/spritesheets/weapon/polearm/spear/foreground/walk/${mat}.png`;
        const ok = await check(url);
        if (ok) break;
    }

    // Bow
    for (const mat of materials) {
        const url = `https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/spritesheets/weapon/ranged/bow/normal/universal/foreground/walk/${mat}.png`;
        const ok = await check(url);
        if (ok) break;
    }

    // Tool Smash
    for (const mat of materials) {
        const url = `https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/spritesheets/tool/smash/universal/male/walk/${mat}.png`;
        const ok = await check(url);
        if (ok) break;
    }
}

run();
