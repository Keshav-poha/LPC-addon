import fs from 'fs';

const treeData = JSON.parse(fs.readFileSync('./tree.json', 'utf8'));

const keywords = ['mail', 'chest', 'laced', 'robe', 'skirt', 'pants', 'plate', 'chain', 'dress'];

console.log('Searching for clothing/weapons files in spritesheets/...');
for (const kw of keywords) {
    const matches = treeData.tree
        .filter(node => node.type === 'blob' && node.path.startsWith('spritesheets/') && node.path.toLowerCase().includes(kw))
        .map(node => node.path);
    console.log(`Keyword "${kw}": ${matches.length} matches.`);
    if (matches.length > 0) {
        matches.slice(0, 5).forEach(p => console.log(`  ${p}`));
    }
}
