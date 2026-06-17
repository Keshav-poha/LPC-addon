import fs from 'fs';

async function download() {
    try {
        console.log('Fetching sheet definition...');
        const res = await fetch('https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/sheet_definitions/arms/arms_armour.json');
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();
        fs.writeFileSync('arms_armour.json', JSON.stringify(data, null, 2));
        console.log('Saved to arms_armour.json');
    } catch (e) {
        console.error('Download failed:', e);
    }
}

download();
