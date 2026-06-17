import fs from 'fs';

function parseJsConst(filename, constName) {
    const content = fs.readFileSync(filename, 'utf8');
    const startText = `const ${constName} = `;
    const valStart = content.indexOf(startText) + startText.length;
    const exportIdx = content.indexOf(`export {`, valStart);
    let jsonStr = content.substring(valStart, exportIdx).trim();
    if (jsonStr.endsWith(';')) jsonStr = jsonStr.substring(0, jsonStr.length - 1).trim();
    const fn = new Function(`return (${jsonStr})`);
    return fn();
}

const itemMetadata = parseJsConst('downloaded-metadata.js', 'itemMetadata');
const keys = Object.keys(itemMetadata);

const terms = ['axe', 'pick', 'hoe', 'water', 'tool', 'weapon', 'pitchfork', 'hammer'];

console.log('Searching itemMetadata keys:');
for (const term of terms) {
    const matches = keys.filter(k => k.toLowerCase().includes(term.toLowerCase()));
    console.log(`Term "${term}":`, matches);
}
