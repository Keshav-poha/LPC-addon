async function tryDownload(url) {
    try {
        const res = await fetch(url);
        console.log(`GET ${url} -> status ${res.status}`);
        if (res.ok) {
            const text = await res.text();
            console.log(`  Success! Length: ${text.length} chars. Sample: ${text.substring(0, 150)}...`);
            return text;
        }
    } catch (e) {
        console.log(`GET ${url} failed:`, e.message);
    }
    return null;
}

async function run() {
    const urls = [
        'https://liberatedpixelcup.github.io/Universal-LPC-Spritesheet-Character-Generator/item-metadata.js',
        'https://liberatedpixelcup.github.io/Universal-LPC-Spritesheet-Character-Generator/dist/item-metadata.js',
        'https://liberatedpixelcup.github.io/Universal-LPC-Spritesheet-Character-Generator/assets/item-metadata.js',
        'https://universal-lpc-sprite-generator.github.io/item-metadata.js',
        'https://universal-lpc-sprite-generator.github.io/dist/item-metadata.js',
        'https://universal-lpc-sprite-generator.github.io/assets/item-metadata.js',
    ];
    for (const url of urls) {
        const text = await tryDownload(url);
        if (text) {
            // Save it
            const fs = await import('fs');
            fs.writeFileSync('downloaded-metadata.js', text);
            console.log('Saved to downloaded-metadata.js');
            break;
        }
    }
}

run();
