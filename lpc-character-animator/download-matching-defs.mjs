import fs from 'fs';
import { CATEGORIES } from './src/data/sheet-definitions.js';

const treeData = JSON.parse(fs.readFileSync('./tree.json', 'utf8'));
const defFiles = treeData.tree
    .filter(node => node.type === 'blob' && node.path.startsWith('sheet_definitions/'))
    .map(node => node.path);

console.log(`Found ${defFiles.length} sheet definition files in tree.json`);

const itemDefMap = {};

// Helper to find definition file matching search tokens
function findDefFile(tokens) {
    const matches = defFiles.filter(p => {
        return tokens.every(tok => p.toLowerCase().includes(tok.toLowerCase()));
    });
    if (matches.length > 0) {
        // Return the shortest match or one with most specific structure
        return matches.sort((a,b) => a.length - b.length)[0];
    }
    return null;
}

// Map each category item to a set of search tokens in sheet_definitions/
for (const cat of CATEGORIES) {
    if (cat.id === 'body') continue;
    
    const catId = cat.id;
    if (cat.items) {
        for (const item of cat.items) {
            if (item.id === 'none') continue;
            let tokens = [catId, item.id];
            
            // Adjust tokens for overrides
            if (item.id === 'chain_mail_shirt') tokens = ['torso', 'chain', 'mail'];
            else if (item.id === 'leather_armor') tokens = ['torso', 'leather', 'chest'];
            else if (item.id === 'plate_armor') tokens = ['torso', 'plate', 'chest'];
            else if (item.id === 'longsleeve_laced') tokens = ['torso', 'longsleeve', 'laced'];
            else if (item.id === 'longsleeve_white') tokens = ['torso', 'longsleeve', 'white'];
            else if (item.id === 'shirt_sleeveless') tokens = ['torso', 'sleeveless'];
            else if (item.id === 'vest_leather') tokens = ['torso', 'vest'];
            else if (item.id === 'robe') tokens = ['torso', 'clothes_robe'];
            
            else if (item.id === 'pants_white') tokens = ['legs', 'pants', 'white'];
            else if (item.id === 'pants_teal') tokens = ['legs', 'pants', 'teal'];
            else if (item.id === 'pants_red') tokens = ['legs', 'pants', 'magenta'];
            else if (item.id === 'legion_skirt') tokens = ['legs', 'skirt', 'legion'];
            else if (item.id === 'robe_skirt') tokens = ['legs', 'skirt', 'robe_skirt'];
            else if (item.id === 'plate_legs') tokens = ['legs', 'armor', 'plate_legs'];
            
            else if (item.id === 'shoes_brown') tokens = ['feet', 'shoes_basic']; // basic shoes (brown)
            else if (item.id === 'shoes_black') tokens = ['feet', 'shoes_revised']; // revised shoes
            else if (item.id === 'boots_tall') tokens = ['feet', 'boots_tall'];
            else if (item.id === 'plate_boots') tokens = ['feet', 'boots', 'plate'];
            else if (item.id === 'golden_boots') tokens = ['feet', 'boots', 'golden'];
            
            else if (item.id === 'plate_arms') tokens = ['arms', 'plate'];
            else if (item.id === 'leather_bracers') tokens = ['arms', 'bracers'];
            else if (item.id === 'plate_bracers') tokens = ['arms', 'bracers']; // wait, let's look for bracers
            else if (item.id === 'gloves') tokens = ['arms', 'gloves'];
            
            else if (item.id === 'bandana') tokens = ['headwear', 'bandana'];
            else if (item.id === 'chain_helmet') tokens = ['headwear', 'mail']; // mail helmet
            else if (item.id === 'leather_cap') tokens = ['headwear', 'leather_cap'];
            else if (item.id === 'plate_helmet') tokens = ['headwear', 'plate'];
            else if (item.id === 'tiara') tokens = ['headwear', 'tiara'];
            else if (item.id === 'hood_chain') tokens = ['headwear', 'hood_chain'];
            else if (item.id === 'hood_cloth') tokens = ['headwear', 'hood'];
            else if (item.id === 'hood_robe') tokens = ['headwear', 'robe_hood'];

            else if (item.id === 'dagger') tokens = ['weapons', 'dagger'];
            else if (item.id === 'longsword') tokens = ['weapons', 'longsword'];
            else if (item.id === 'rapier') tokens = ['weapons', 'rapier'];
            else if (item.id === 'spear') tokens = ['weapons', 'spear'];
            else if (item.id === 'bow') tokens = ['weapons', 'bow_normal'];
            else if (item.id === 'shield_round') tokens = ['weapons', 'shield_round'];
            else if (item.id === 'shield_kite') tokens = ['weapons', 'shield_kite'];

            else if (item.id === 'woodaxe') tokens = ['weapons', 'waraxe']; // wood axe?
            else if (item.id === 'pickaxe') tokens = ['tools', 'pickaxe']; // wait, is it weapons?
            else if (item.id === 'hoe') tokens = ['tools', 'hoe'];
            else if (item.id === 'wateringcan') tokens = ['tools', 'wateringcan'];

            const match = findDefFile(tokens);
            if (match) itemDefMap[`${catId}:${item.id}`] = match;
            else console.warn(`No match for category item ${catId}:${item.id} with tokens: ${tokens.join(', ')}`);
        }
    }

    if (cat.subcategories) {
        for (const sub of cat.subcategories) {
            const subId = sub.id;
            for (const item of sub.items) {
                if (item.id === 'none') continue;
                let tokens = [subId, item.id];
                if (subId === 'ears') tokens = ['head/ears', item.id.replace('ears', '')];
                else if (subId === 'nose') tokens = ['head/nose', item.id.replace('nose', '')];
                else if (subId === 'eyes') tokens = ['eye']; // eyes are resolved differently because they are grouped
                
                const match = findDefFile(tokens);
                if (match) itemDefMap[`${catId}/${subId}:${item.id}`] = match;
                else console.warn(`No match for subcategory item ${catId}/${subId}:${item.id} with tokens: ${tokens.join(', ')}`);
            }
        }
    }
}

// Save map of items to download
fs.writeFileSync('item-def-map.json', JSON.stringify(itemDefMap, null, 2));
console.log('Saved item definition file mapping to item-def-map.json');
