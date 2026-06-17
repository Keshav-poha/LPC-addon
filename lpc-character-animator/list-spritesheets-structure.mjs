import fs from 'fs';

const treeData = JSON.parse(fs.readFileSync('./tree.json', 'utf8'));

const prefixes = new Set();
for (const node of treeData.tree) {
    if (node.path.startsWith('spritesheets/')) {
        const parts = node.path.split('/');
        // we want up to depth 3 (e.g. spritesheets/category/subcategory)
        if (parts.length > 2) {
            prefixes.add(parts.slice(0, 3).join('/'));
        }
    }
}

console.log('Unique 3-depth directories under spritesheets/:');
Array.from(prefixes).sort().forEach(p => console.log(`  ${p}`));
