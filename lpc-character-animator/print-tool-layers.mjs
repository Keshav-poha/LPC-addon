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

const itemLayers = parseJsConst('layers-metadata.js', 'itemLayers');
const itemMetadata = parseJsConst('downloaded-metadata.js', 'itemMetadata');

const tools = ['tool_rod', 'tool_smash', 'tool_thrust', 'tool_whip'];

for (const t of tools) {
    console.log(`\n================== ${t} ==================`);
    console.log('Metadata:', JSON.stringify(itemMetadata[t], null, 2));
    console.log('Layers:', JSON.stringify(itemLayers[t], null, 2));
}
