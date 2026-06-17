import fs from 'fs';

async function download() {
    try {
        console.log('Fetching original package.json...');
        const res = await fetch('https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/package.json');
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();
        fs.writeFileSync('original_package.json', JSON.stringify(data, null, 2));
        console.log('Saved to original_package.json');
    } catch (e) {
        console.error('Download failed:', e);
    }
}

download();
