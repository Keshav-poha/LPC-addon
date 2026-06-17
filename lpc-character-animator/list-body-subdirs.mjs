import fs from 'fs';

const treeData = JSON.parse(fs.readFileSync('./tree.json', 'utf8'));

const subdirs = new Set();
for (const node of treeData.tree) {
    if (node.path.startsWith('spritesheets/body/')) {
        const parts = node.path.split('/');
        // parts[0] = 'spritesheets', parts[1] = 'body', parts[2] = subdir
        if (parts.length > 2) {
            subdirs.add(parts[2]);
        }
    }
}

console.log('Subdirectories under spritesheets/body/:', Array.from(subdirs).sort());
