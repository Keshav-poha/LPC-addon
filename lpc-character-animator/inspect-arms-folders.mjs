import fs from 'fs';

const treeData = JSON.parse(fs.readFileSync('./tree.json', 'utf8'));

console.log('Listing files under spritesheets/arms/armour/plate/male/:');
const files = treeData.tree
    .filter(node => node.type === 'blob' && node.path.includes('spritesheets/arms/armour/plate/male/'))
    .map(node => node.path);

files.sort();
files.forEach(f => console.log(`  ${f}`));
