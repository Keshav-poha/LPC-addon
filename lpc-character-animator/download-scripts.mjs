import fs from 'fs';

async function download(urlPath, savePath) {
    try {
        console.log(`Fetching ${urlPath}...`);
        const res = await fetch(`https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/${urlPath}`);
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.text();
        fs.writeFileSync(savePath, data);
        console.log(`Saved to ${savePath}`);
    } catch (e) {
        console.error(`Download failed for ${urlPath}:`, e);
    }
}

async function run() {
    await download('scripts/generate_sources.js', 'generate_sources.js');
    await download('scripts/generateSources/items.js', 'generate_sources_items.js');
    await download('scripts/generateSources/aliases.js', 'generate_sources_aliases.js');
}

run();
