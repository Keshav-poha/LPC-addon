import fs from 'fs';

const treeData = JSON.parse(fs.readFileSync('./tree.json', 'utf8'));

console.log('Searching for filenames containing "1h" or "watering" or "combat"...');

const matches = treeData.tree
    .filter(node => node.type === 'blob' && node.path.startsWith('spritesheets/'))
    .map(node => node.path);

const checkPatterns = ['1h', 'combat', 'watering', 'slash', 'halfslash', 'backslash'];

for (const pattern of checkPatterns) {
    const list = matches.filter(p => p.toLowerCase().includes(pattern));
    console.log(`\nPattern "${pattern}" matched ${list.length} files. Examples:`);
    list.slice(0, 10).forEach(p => console.log(`  ${p}`));
}
