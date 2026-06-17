import fs from 'fs';

const treeData = JSON.parse(fs.readFileSync('./tree.json', 'utf8'));

function listFiles(pattern) {
    console.log(`\nFiles matching "${pattern}":`);
    const files = treeData.tree
        .filter(node => node.path.includes(pattern) && node.type === 'blob')
        .map(node => node.path);
    files.sort();
    files.slice(0, 30).forEach(f => console.log(`  ${f}`));
    if (files.length > 30) {
        console.log(`  ... and ${files.length - 30} more`);
    }
}

listFiles('spritesheets/body/bodies/male/');
listFiles('spritesheets/head/ears/');
listFiles('spritesheets/hair/bangs/');
