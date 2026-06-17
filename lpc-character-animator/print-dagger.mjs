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
const itemLayers = parseJsConst('layers-metadata.js', 'itemLayers');

console.log('Dagger Metadata:', JSON.stringify(itemMetadata['weapon_sword_dagger'], null, 2));
console.log('Dagger Layers:', JSON.stringify(itemLayers['weapon_sword_dagger'], null, 2));
