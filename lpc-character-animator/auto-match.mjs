import fs from 'fs';

// Helper to parse JS files that define a single const and export it
function parseJsConst(filename, constName) {
    const content = fs.readFileSync(filename, 'utf8');
    const startText = `const ${constName} = `;
    const startIdx = content.indexOf(startText);
    if (startIdx === -1) {
        throw new Error(`Failed to find variable ${constName} in ${filename}`);
    }
    const valStart = startIdx + startText.length;
    // Find the ending semicolon before export
    const exportIdx = content.indexOf(`export {`, valStart);
    let jsonStr = '';
    if (exportIdx !== -1) {
        jsonStr = content.substring(valStart, exportIdx).trim();
        if (jsonStr.endsWith(';')) {
            jsonStr = jsonStr.substring(0, jsonStr.length - 1).trim();
        }
    } else {
        // Fallback to bracket matching
        const firstBrace = content.indexOf('{', valStart);
        const lastBrace = content.lastIndexOf('}');
        jsonStr = content.substring(firstBrace, lastBrace + 1);
    }
    
    // Safely evaluate the JS object literal (since we trust the source of these files)
    try {
        const fn = new Function(`return (${jsonStr})`);
        return fn();
    } catch (e) {
        console.error(`Failed to evaluate JS literal:`, e);
        throw e;
    }
}

const itemMetadata = parseJsConst('downloaded-metadata.js', 'itemMetadata');
const itemLayers = parseJsConst('layers-metadata.js', 'itemLayers');

console.log(`Loaded ${Object.keys(itemMetadata).length} items from downloaded-metadata.js`);
console.log(`Loaded ${Object.keys(itemLayers).length} layers from layers-metadata.js`);

// Let's search for some of our items in the loaded metadata
const ourItems = [
    // Headwear
    { id: 'bandana', search: ['bandana'] },
    { id: 'chain_helmet', search: ['mail', 'helmet'] },
    { id: 'leather_cap', search: ['cap_leather'] },
    { id: 'plate_helmet', search: ['helmet_plate'] },
    { id: 'tiara', search: ['tiara'] },
    { id: 'hood_chain', search: ['hood_chain'] },
    { id: 'hood_cloth', search: ['hood_cloth'] },
    { id: 'hood_robe', search: ['robe_hood'] },

    // Torso
    { id: 'chain_mail_shirt', search: ['chainmail', 'torso'] },
    { id: 'leather_armor', search: ['armour_leather'] },
    { id: 'plate_armor', search: ['armour_plate', 'torso'] },
    { id: 'longsleeve_laced', search: ['laced'] },
    { id: 'longsleeve_white', search: ['longsleeve'] },
    { id: 'shirt_sleeveless', search: ['sleeveless'] },
    { id: 'vest_leather', search: ['vest'] },
    { id: 'robe', search: ['robe', 'torso'] },

    // Legs
    { id: 'pants_white', search: ['pants'] },
    { id: 'pants_teal', search: ['pants'] },
    { id: 'pants_red', search: ['pants'] },
    { id: 'legion_skirt', search: ['legion', 'skirt'] },
    { id: 'robe_skirt', search: ['robe_skirt'] },
    { id: 'plate_legs', search: ['plate_legs'] },

    // Feet
    { id: 'shoes_brown', search: ['shoes_basic'] },
    { id: 'shoes_black', search: ['shoes_revised'] },
    { id: 'boots_tall', search: ['boots_tall'] },
    { id: 'plate_boots', search: ['boots_plate'] },
    { id: 'golden_boots', search: ['boots_golden'] },

    // Arms
    { id: 'plate_arms', search: ['arms_armour'] },
    { id: 'leather_bracers', search: ['bracers'] },
    { id: 'plate_bracers', search: ['bracers'] },
    { id: 'gloves', search: ['gloves'] },

    // Weapons
    { id: 'dagger', search: ['dagger'] },
    { id: 'longsword', search: ['longsword'] },
    { id: 'rapier', search: ['rapier'] },
    { id: 'spear', search: ['spear'] },
    { id: 'bow', search: ['bow'] },
    { id: 'shield_round', search: ['shield_round'] },
    { id: 'shield_kite', search: ['shield_kite'] },

    // Tools
    { id: 'woodaxe', search: ['woodaxe', 'waraxe', 'axe'] },
    { id: 'pickaxe', search: ['pickaxe', 'smash'] },
    { id: 'hoe', search: ['hoe', 'thrust'] },
    { id: 'wateringcan', search: ['watering'] },
];

console.log('\n--- MAPPED PATHS ---');
for (const ourItem of ourItems) {
    // Find all matches in itemMetadata that satisfy search tokens
    let matches = Object.keys(itemMetadata).filter(key => {
        return ourItem.search.every(tok => key.toLowerCase().includes(tok.toLowerCase()));
    });

    if (matches.length === 0) {
        // Fallback: search anywhere in itemMetadata keys
        matches = Object.keys(itemMetadata).filter(key => {
            return key.toLowerCase().includes(ourItem.id.toLowerCase());
        });
    }

    console.log(`\nItem ID in our code: "${ourItem.id}"`);
    console.log(`  Matching keys in metadata: ${matches.join(', ')}`);
    
    for (const match of matches) {
        const layers = itemLayers[match];
        if (layers) {
            console.log(`  Metadata Key: "${match}"`);
            console.log(`    layer_1: ${JSON.stringify(layers.layer_1, null, 2)}`);
            if (layers.layer_2) console.log(`    layer_2: ${JSON.stringify(layers.layer_2, null, 2)}`);
        }
    }
}
