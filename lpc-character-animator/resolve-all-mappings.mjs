import fs from 'fs';
import { CATEGORIES, BODY_TYPES } from './src/data/sheet-definitions.js';

const treeData = JSON.parse(fs.readFileSync('./tree.json', 'utf8'));
const files = treeData.tree.filter(n => n.type === 'blob').map(n => n.path);

const bodyTypes = BODY_TYPES.map(bt => bt.id);

console.log('Resolving actual file paths from tree.json...');

function findPathInTree(keywords, bodyType, anim) {
    // Search tree for a path that starts with spritesheets/, contains all keywords, contains bodyType (or adult/child if appropriate), and ends with anim.png or anim/<color>.png
    // Keywords can be like ['hair', 'bangs']
    
    // Convert bodyType to adult/child for head/hair/eyes/nose/ears/hat
    const isAgeGroupBased = keywords.some(k => ['hair', 'head', 'hat', 'eyes', 'ears', 'nose'].includes(k));
    const ageGroup = bodyType === 'child' ? 'child' : 'adult';
    const btSearch = isAgeGroupBased ? ageGroup : bodyType;

    const candidates = files.filter(p => {
        if (!p.startsWith('spritesheets/')) return false;
        
        // Must contain all keywords
        for (const kw of keywords) {
            if (!p.toLowerCase().includes(kw.toLowerCase())) return false;
        }

        // Must contain body type/age group
        if (!p.includes(`/${btSearch}/`)) return false;

        // Must contain animation
        if (!p.includes(`/${anim}.png`) && !p.includes(`/${anim}/`)) return false;

        return true;
    });

    if (candidates.length > 0) {
        // Return the first one, stripped of spritesheets/ prefix
        return candidates[0].replace('spritesheets/', '');
    }
    return null;
}

const itemMappings = {};

// Let's test with the 'walk' animation
const testAnim = 'walk';

for (const cat of CATEGORIES) {
    itemMappings[cat.id] = {};
    
    if (cat.id === 'body') {
        const mappings = {};
        for (const bt of bodyTypes) {
            const found = findPathInTree(['body', 'bodies'], bt, testAnim);
            mappings[bt] = found;
        }
        itemMappings[cat.id]['body'] = mappings;
        continue;
    }

    if (cat.items) {
        for (const item of cat.items) {
            if (item.id === 'none') continue;
            const mappings = {};
            // Gather keywords
            let kws = [cat.id, item.id];
            if (cat.id === 'headwear') kws = ['hat', item.id];
            
            // Adjust keywords for specific items if they fail or we know their alias
            if (item.id === 'chain_mail_shirt') kws = ['hat', 'helmet', 'mail']; // wait, no, torso chain mail
            
            for (const bt of bodyTypes) {
                // Try to find with item.id
                let found = findPathInTree(kws, bt, testAnim);
                
                // Retry with relaxed keywords if not found
                if (!found) {
                    if (item.id === 'chain_mail_shirt') {
                        found = findPathInTree(['hat', 'helmet', 'mail'], bt, testAnim); // try helmet mail just in case
                    } else if (item.id === 'leather_cap') {
                        found = findPathInTree(['hat', 'cloth', 'cap'], bt, testAnim);
                    } else if (item.id === 'bandana') {
                        found = findPathInTree(['hat', 'bandana'], bt, testAnim);
                    } else if (item.id === 'chain_helmet') {
                        found = findPathInTree(['hat', 'helmet', 'mail'], bt, testAnim);
                    } else if (item.id === 'plate_helmet') {
                        found = findPathInTree(['hat', 'helmet', 'plate'], bt, testAnim);
                    } else if (item.id === 'tiara') {
                        found = findPathInTree(['hat', 'formal', 'tiara'], bt, testAnim);
                    } else if (item.id === 'hood_chain') {
                        found = findPathInTree(['hat', 'helmet', 'hood_chain'], bt, testAnim);
                    } else if (item.id === 'hood_cloth') {
                        found = findPathInTree(['hat', 'cloth', 'hood'], bt, testAnim);
                    } else if (item.id === 'hood_robe') {
                        found = findPathInTree(['hat', 'cloth', 'robe_hood'], bt, testAnim);
                    }
                }
                mappings[bt] = found;
            }
            itemMappings[cat.id][item.id] = mappings;
        }
    }

    if (cat.subcategories) {
        for (const sub of cat.subcategories) {
            itemMappings[`${cat.id}/${sub.id}`] = {};
            for (const item of sub.items) {
                if (item.id === 'none') continue;
                const mappings = {};
                for (const bt of bodyTypes) {
                    let kws = [sub.id, item.id];
                    if (sub.id === 'eyes') kws = ['eyes', 'human', item.id.replace('eyes_', '')];
                    if (sub.id === 'ears') kws = ['ears', item.id.replace('ears', '')];
                    if (sub.id === 'nose') kws = ['nose', item.id.replace('nose', '')];
                    
                    let found = findPathInTree(kws, bt, testAnim);
                    mappings[bt] = found;
                }
                itemMappings[`${cat.id}/${sub.id}`][item.id] = mappings;
            }
        }
    }
}

// Print report
for (const [catKey, items] of Object.entries(itemMappings)) {
    console.log(`\n================== ${catKey} ==================`);
    for (const [itemKey, bts] of Object.entries(items)) {
        console.log(`  Item: ${itemKey}`);
        for (const [bt, p] of Object.entries(bts)) {
            console.log(`    BT: ${bt} -> ${p ? p : 'NOT FOUND'}`);
        }
    }
}
