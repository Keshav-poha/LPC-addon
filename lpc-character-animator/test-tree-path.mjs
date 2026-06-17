import fs from 'fs';

const treeData = JSON.parse(fs.readFileSync('./tree.json', 'utf8'));

const target = 'spritesheets/torso/clothes/longsleeve/longsleeve/male/walk.png';
const found = treeData.tree.find(node => node.path === target);

console.log(`Path "${target}" in tree.json:`, found ? 'FOUND' : 'NOT FOUND');

console.log('Total entries in tree.json:', treeData.tree.length);

const subpathCheck = 'spritesheets/torso';
const hasSubpath = treeData.tree.some(node => node.path.startsWith(subpathCheck));
console.log(`Any path starting with "${subpathCheck}" in tree.json:`, hasSubpath ? 'YES' : 'NO');
