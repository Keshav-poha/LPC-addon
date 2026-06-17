import { CATEGORIES, BODY_TYPES } from './src/data/sheet-definitions.js';
import { ANIMATIONS } from './src/data/animation-map.js';

const CDN_BASE = "https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/spritesheets";

const bodyTypes = BODY_TYPES.map(bt => bt.id);

// We will test 'walk.png' as the primary check since almost all sheets have walk
// For weapons/tools/shields, we will also check combat-related ones if walk is missing
const testAnimations = ['walk', 'idle', 'spellcast', 'slash'];

async function checkUrl(url) {
    try {
        const res = await fetch(url, { method: 'HEAD' });
        return res.ok;
    } catch (e) {
        return false;
    }
}

// Concurrency pool
async function runWithConcurrency(tasks, limit) {
    const results = [];
    const executing = [];
    for (const task of tasks) {
        const p = Promise.resolve().then(() => task());
        results.push(p);
        if (limit <= tasks.length) {
            const e = p.then(() => executing.splice(executing.indexOf(e), 1));
            executing.push(e);
            if (executing.length >= limit) {
                await Promise.race(executing);
            }
        }
    }
    return Promise.all(results);
}

async function validate() {
    console.log('Building verification task list...');
    const tasks = [];
    const results = [];

    function addCheck(catId, itemId, bt, getPathFn) {
        tasks.push(async () => {
            let found = false;
            let lastUrl = '';
            for (const anim of testAnimations) {
                const relativePath = getPathFn(bt, anim);
                if (!relativePath) continue;
                
                const url = `${CDN_BASE}/${relativePath}`;
                lastUrl = url;
                const ok = await checkUrl(url);
                if (ok) {
                    found = true;
                    break;
                }
            }
            results.push({ catId, itemId, bt, found, lastUrl });
        });
    }

    // 1. Check Body
    const bodyCat = CATEGORIES.find(c => c.id === 'body');
    if (bodyCat && bodyCat.getPath) {
        for (const bt of bodyTypes) {
            addCheck('body', bt, bt, bodyCat.getPath);
        }
    }

    // 2. Loop through all categories
    for (const cat of CATEGORIES) {
        if (cat.id === 'body') continue;
        
        if (cat.items) {
            for (const item of cat.items) {
                if (item.id === 'none') continue;
                const getPathFn = item.getPath || cat.getPath;
                if (getPathFn) {
                    for (const bt of bodyTypes) {
                        addCheck(cat.id, item.id, bt, getPathFn);
                    }
                }
            }
        }
        
        if (cat.subcategories) {
            for (const sub of cat.subcategories) {
                if (sub.items) {
                    for (const item of sub.items) {
                        if (item.id === 'none') continue;
                        const getPathFn = item.getPath || sub.getPath || cat.getPath;
                        if (getPathFn) {
                            for (const bt of bodyTypes) {
                                addCheck(`${cat.id}/${sub.id}`, item.id, bt, getPathFn);
                            }
                        }
                    }
                }
            }
        }
    }

    console.log(`Running ${tasks.length} checks with concurrency limit of 50...`);
    const startTime = Date.now();
    await runWithConcurrency(tasks, 50);
    console.log(`Completed in ${((Date.now() - startTime) / 1000).toFixed(2)}s`);

    const missing = results.filter(r => !r.found);
    const found = results.filter(r => r.found);

    console.log(`\nVerification Summary:`);
    console.log(`Successful path groups: ${found.length}`);
    console.log(`Failed path groups (404 for all test animations): ${missing.length}`);

    if (missing.length > 0) {
        console.log('\nFailed Paths Details:');
        missing.forEach(m => {
            console.log(`  [${m.catId}][${m.itemId}] BT: ${m.bt} -> Failed to load from ${m.lastUrl}`);
        });
    } else {
        console.log('All path templates load successfully!');
    }
}

validate();
