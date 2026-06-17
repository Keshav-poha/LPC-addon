import fs from 'fs';

async function download(urlPath, savePath) {
    try {
        console.log(`Fetching ${urlPath}...`);
        const res = await fetch(`https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/${urlPath}`);
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();
        fs.writeFileSync(savePath, JSON.stringify(data, null, 2));
        console.log(`Saved to ${savePath}`);
    } catch (e) {
        console.error(`Download failed for ${urlPath}:`, e);
    }
}

async function run() {
    await download('sheet_definitions/head/ears/head_ears_big.json', 'head_ears_big.json');
    await download('sheet_definitions/head/nose/head_nose_big.json', 'head_nose_big.json');
}

run();
