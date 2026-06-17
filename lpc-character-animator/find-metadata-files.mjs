import fs from 'fs';

const treeData = JSON.parse(fs.readFileSync('./tree.json', 'utf8'));

console.log('Searching for metadata files in the repository...');
const matches = treeData.tree
    .filter(node => node.type === 'blob' && node.path.includes('metadata'))
    .map(node => node.path);

matches.forEach(p => console.log(`  ${p}`));
