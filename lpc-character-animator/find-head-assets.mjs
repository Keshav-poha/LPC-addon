import fs from 'fs';

const treeData = JSON.parse(fs.readFileSync('./tree.json', 'utf8'));

const pngs = treeData.tree
    .filter(node => node.type === 'blob' && node.path.startsWith('spritesheets/'))
    .map(node => node.path);

console.log('Searching for ear/nose pngs...');
const ears = pngs.filter(p => p.toLowerCase().includes('ear'));
const noses = pngs.filter(p => p.toLowerCase().includes('nose'));

console.log(`Found ${ears.length} ear files.`);
ears.slice(0, 10).forEach(e => console.log(`  ${e}`));

console.log(`Found ${noses.length} nose files.`);
noses.slice(0, 10).forEach(n => console.log(`  ${n}`));
