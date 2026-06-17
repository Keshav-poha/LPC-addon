import fs from 'fs';

const logContent = fs.readFileSync('C:\\Users\\Keshav\\.gemini\\antigravity-ide\\brain\\5959d861-4731-4436-bd15-067bcca0a8fd\\.system_generated\\tasks\\task-538.log', 'utf8');

const failures = [];
const lines = logContent.split('\n');
for (const line of lines) {
    if (line.includes('Failed to load from')) {
        // Example line:   [head/nose][bignose] BT: child -> Failed to load from ...
        const match = line.match(/\s+\[([^\]]+)\]\[([^\]]+)\] BT: (\w+)/);
        if (match) {
            failures.push({
                cat: match[1],
                item: match[2],
                bt: match[3]
            });
        }
    }
}

// Group by category/item
const grouped = {};
for (const fail of failures) {
    const key = `${fail.cat}:${fail.item}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(fail.bt);
}

console.log('--- Missing Body Types by Item ---');
for (const [key, bts] of Object.entries(grouped)) {
    console.log(`${key} missing body types: ${bts.join(', ')}`);
}
