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

const keys = ['weapon_sword_dagger', 'weapon_sword_longsword', 'weapon_ranged_bow_normal', 'tool_smash', 'tool_thrust'];

const treeData = JSON.parse(fs.readFileSync('./tree.json', 'utf8'));
const files = treeData.tree.filter(n => n.type === 'blob').map(n => n.path);

for (const k of keys) {
    console.log(`\n================== ${k} ==================`);
    const meta = itemMetadata[k];
    const layers = itemLayers[k];
    console.log('Metadata:', JSON.stringify(meta, null, 2));
    console.log('Layers:', JSON.stringify(layers, null, 2));
    
    // Find all files in tree.json that match layers.layer_1 path
    if (layers && layers.layer_1) {
        const pathPrefix = layers.layer_1.male || layers.layer_1.female;
        if (pathPrefix) {
            console.log(`Searching tree.json for files matching: "spritesheets/${pathPrefix}"`);
            const matchedFiles = files.filter(f => f.startsWith(`spritesheets/${pathPrefix}`));
            console.log(`Found ${matchedFiles.length} files:`);
            matchedFiles.slice(0, 10).forEach(f => console.log(`  ${f}`));
            if (matchedFiles.length > 10) console.log(`  ... and ${matchedFiles.length - 10} more`);
        }
    }
}
