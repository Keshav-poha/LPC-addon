import fs from 'fs';

async function download() {
    try {
        console.log('Fetching state.js...');
        const res = await fetch('https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/scripts/generateSources/state.js');
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.text();
        fs.writeFileSync('generate_sources_state.js', data);
        console.log('Saved to generate_sources_state.js');
    } catch (e) {
        console.error('Download failed:', e);
    }
}

download();
