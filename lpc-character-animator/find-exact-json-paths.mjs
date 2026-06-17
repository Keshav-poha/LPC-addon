import fs from 'fs';

const treeData = JSON.parse(fs.readFileSync('./tree.json', 'utf8'));
const defFiles = treeData.tree
    .filter(node => node.type === 'blob' && node.path.startsWith('sheet_definitions/'))
    .map(node => node.path);

const terms = [
    'bob', 'longknot', 'mohawk', 'shortknot',
    'cap', 'plate', 'helmet', 'hood', 'robe',
    'mail', 'leather', 'chest', 'longsleeve', 'sleeveless', 'vest',
    'pants', 'skirt', 'legion', 'shoes', 'boots', 'bracers', 'gloves',
    'pickaxe', 'hoe', 'watering'
];

console.log('Searching sheet_definitions/ for terms:');
for (const term of terms) {
    const matches = defFiles.filter(p => p.toLowerCase().includes(term.toLowerCase()));
    console.log(`Term "${term}": ${matches.length} matches.`);
    if (matches.length > 0) {
        matches.slice(0, 5).forEach(p => console.log(`  ${p}`));
    }
}
