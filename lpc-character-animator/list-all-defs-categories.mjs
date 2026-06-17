import fs from 'fs';

const treeData = JSON.parse(fs.readFileSync('./tree.json', 'utf8'));

const categories = ['torso', 'legs', 'feet', 'arms', 'weapons', 'tools'];

console.log('Listing JSON definitions by category:');
for (const cat of categories) {
    const list = treeData.tree
        .filter(node => node.type === 'blob' && node.path.startsWith(`sheet_definitions/${cat}/`))
        .map(node => node.path);
    console.log(`\nCategory "${cat}" (${list.length} files):`);
    list.sort().forEach(p => console.log(`  ${p}`));
}
