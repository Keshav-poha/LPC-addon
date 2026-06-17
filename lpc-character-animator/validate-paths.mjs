import fs from 'fs';
import path from 'path';
import { CATEGORIES, BODY_TYPES } from './src/data/sheet-definitions.js';
import { ANIMATIONS } from './src/data/animation-map.js';

// Load tree.json
console.log('Loading tree.json...');
const treeData = JSON.parse(fs.readFileSync('./tree.json', 'utf8'));
const fileSet = new Set();
for (const node of treeData.tree) {
    if (node.path.startsWith('spritesheets/')) {
        // Strip 'spritesheets/' prefix
        fileSet.add(node.path.replace('spritesheets/', ''));
    }
}
console.log(`Loaded ${fileSet.size} spritesheet files from tree.json`);

const animations = Object.keys(ANIMATIONS);
const bodyTypes = BODY_TYPES.map(bt => bt.id);

console.log('Validating paths...');
const missing = [];
const checked = [];

function checkPath(categoryName, itemName, bt, anim, pathVal) {
    if (!pathVal) return;
    checked.push({ categoryName, itemName, bt, anim, pathVal });
    if (!fileSet.has(pathVal)) {
        missing.push({ categoryName, itemName, bt, anim, pathVal });
    }
}

// 1. Check Body Category (which has global getPath)
const bodyCat = CATEGORIES.find(c => c.id === 'body');
if (bodyCat && bodyCat.getPath) {
    for (const bt of bodyTypes) {
        for (const anim of animations) {
            const p = bodyCat.getPath(bt, anim);
            checkPath('body', bt, bt, anim, p);
        }
    }
}

// 2. Loop through all categories
for (const cat of CATEGORIES) {
    if (cat.id === 'body') continue;
    
    // Check items if category has items
    if (cat.items) {
        for (const item of cat.items) {
            if (item.id === 'none') continue;
            const getPathFn = item.getPath || cat.getPath;
            if (getPathFn) {
                for (const bt of bodyTypes) {
                    for (const anim of animations) {
                        const p = getPathFn(bt, anim);
                        checkPath(cat.id, item.id, bt, anim, p);
                    }
                }
            }
        }
    }
    
    // Check subcategories
    if (cat.subcategories) {
        for (const sub of cat.subcategories) {
            if (sub.items) {
                for (const item of sub.items) {
                    if (item.id === 'none') continue;
                    const getPathFn = item.getPath || sub.getPath || cat.getPath;
                    if (getPathFn) {
                        for (const bt of bodyTypes) {
                            for (const anim of animations) {
                                const p = getPathFn(bt, anim);
                                checkPath(`${cat.id}/${sub.id}`, item.id, bt, anim, p);
                            }
                        }
                    }
                }
            }
        }
    }
}

console.log(`Validation complete. Total paths checked: ${checked.length}`);
console.log(`Total missing paths: ${missing.length}`);

if (missing.length > 0) {
    console.log(`\nSample of missing paths (first 50):`);
    missing.slice(0, 50).forEach(m => {
        console.log(`[${m.categoryName}][${m.itemName}] BT: ${m.bt}, Anim: ${m.anim} -> ${m.pathVal}`);
    });
    
    // Let's also write the full missing list to a file for easy debugging
    fs.writeFileSync('missing-paths.json', JSON.stringify(missing, null, 2));
    console.log('\nFull list written to missing-paths.json');
} else {
    console.log('All paths are correct and load perfectly!');
}
