const https = require('https');

const options = {
    hostname: 'api.github.com',
    path: '/repos/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/contents/spritesheets/feet/shoes/basic',
    headers: { 'User-Agent': 'Node.js' }
};

https.get(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        try {
            console.log("basic contents:");
            console.log(JSON.parse(data).map(f => f.name));
        } catch(e) {}
    });
});
