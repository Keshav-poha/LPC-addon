import fs from 'fs';

const treeData = JSON.parse(fs.readFileSync('./tree.json', 'utf8'));

console.log('Counting files under spritesheets/:');
const pngs = treeData.tree.filter(node => node.type === 'blob' && node.path.startsWith('spritesheets/') && node.path.endsWith('.png'));
console.log(`Found ${pngs.length} total .png files.`);

console.log('\nRandom sample of 100 .png paths:');
const sample = [];
const step = Math.max(1, Math.floor(pngs.length / 100));
for (let i = 0; i < pngs.length && sample.length < 100; i += step) {
    sample.push(pngs[i].path);
}
sample.forEach(p => console.log(`  ${p}`));
