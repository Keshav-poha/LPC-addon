import fs from 'fs';

const treeData = JSON.parse(fs.readFileSync('./tree.json', 'utf8'));

const topLevel = new Set();
for (const node of treeData.tree) {
    if (node.path.startsWith('spritesheets/')) {
        const parts = node.path.split('/');
        if (parts.length > 1) {
            topLevel.add(parts[1]);
        }
    }
}

console.log('Top-level folders under spritesheets/:', Array.from(topLevel).sort());
