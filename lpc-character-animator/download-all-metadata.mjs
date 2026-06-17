import fs from 'fs';

async function download(name) {
    const url = `https://liberatedpixelcup.github.io/Universal-LPC-Spritesheet-Character-Generator/${name}`;
    try {
        const res = await fetch(url);
        console.log(`GET ${url} -> status ${res.status}`);
        if (res.ok) {
            const text = await res.text();
            fs.writeFileSync(name, text);
            console.log(`  Saved to ${name}`);
        }
    } catch (e) {
        console.log(`GET ${url} failed:`, e.message);
    }
}

async function run() {
    await download('layers-metadata.js');
    await download('credits-metadata.js');
}

run();
