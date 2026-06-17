import fs from 'fs';

const treeData = JSON.parse(fs.readFileSync('./tree.json', 'utf8'));

console.log('Listing all files in sheet_definitions/ inside tree.json:');
const files = treeData.tree
    .filter(node => node.type === 'blob' && node.path.startsWith('sheet_definitions/'))
    .map(node => node.path);

files.sort();
console.log(`Found ${files.length} total definition files.`);
files.forEach(f => console.log(`  ${f}`));
