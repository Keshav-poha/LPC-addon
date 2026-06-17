import fs from 'fs';

const treeData = JSON.parse(fs.readFileSync('./tree.json', 'utf8'));

const terms = ['ears', 'nose', 'torso', 'legs', 'pants', 'shirt', 'dress', 'sword', 'axe', 'bow', 'shield', 'robe', 'jacket'];

console.log('Searching for ANY files in the repository containing various terms...');
for (const term of terms) {
    const matches = treeData.tree
        .filter(node => node.type === 'blob' && node.path.includes(term))
        .map(node => node.path);
    console.log(`Term "${term}" found ${matches.length} files. Examples:`);
    if (matches.length > 0) {
        matches.slice(0, 5).forEach(p => console.log(`  ${p}`));
    }
}
