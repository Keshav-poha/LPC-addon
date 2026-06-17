import fs from 'fs';

const treeData = JSON.parse(fs.readFileSync('./tree.json', 'utf8'));

const patterns = ['woodaxe', 'pickaxe', 'hoe', 'wateringcan', 'bow', 'shield', 'dagger', 'spear', 'rapier', 'longsword'];

console.log('Searching for weapons and tools patterns...');
for (const pat of patterns) {
    const list = treeData.tree
        .filter(node => node.type === 'blob' && node.path.includes(pat))
        .map(node => node.path);
    console.log(`Pattern "${pat}" found ${list.length} matches.`);
    if (list.length > 0) {
        list.slice(0, 5).forEach(p => console.log(`  ${p}`));
    }
}
