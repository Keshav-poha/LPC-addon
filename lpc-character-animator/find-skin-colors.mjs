import fs from 'fs';

const treeData = JSON.parse(fs.readFileSync('./tree.json', 'utf8'));

console.log('Searching for files matching skin colors under body/...');
const skinTerms = ['light', 'dark', 'olive', 'tanned', 'orc', 'elf', 'red', 'gray', 'brown'];

const bodyFiles = treeData.tree
    .filter(node => node.type === 'blob' && node.path.startsWith('spritesheets/body/'))
    .map(node => node.path);

console.log(`Total body files: ${bodyFiles.length}`);

for (const term of skinTerms) {
    const matches = bodyFiles.filter(p => p.toLowerCase().includes(term));
    console.log(`Term "${term}": ${matches.length} files. Examples:`);
    if (matches.length > 0) {
        matches.slice(0, 5).forEach(p => console.log(`  ${p}`));
    }
}
