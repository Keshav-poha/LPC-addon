import fs from 'fs';

const treeData = JSON.parse(fs.readFileSync('./tree.json', 'utf8'));

const terms = ['torso', 'legs', 'weapons', 'tools', 'ears', 'nose', 'pants', 'shirt', 'sword', 'dagger', 'spear', 'shield', 'axe', 'watering'];

console.log('Searching for any .png files containing the terms:');
for (const term of terms) {
    const matches = treeData.tree
        .filter(node => node.type === 'blob' && node.path.endsWith('.png') && node.path.includes(term))
        .map(node => node.path);
    console.log(`Term "${term}": ${matches.length} matches.`);
    if (matches.length > 0) {
        matches.slice(0, 5).forEach(p => console.log(`  ${p}`));
    }
}
