const https = require('https');

const options = {
    hostname: 'api.github.com',
    path: '/repos/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/contents/spritesheets/feet',
    headers: { 'User-Agent': 'Node.js' }
};

https.get(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        try {
            console.log("feet contents:");
            console.log(JSON.parse(data).map(f => f.name));
        } catch(e) {}
    });
});

const options2 = {
    hostname: 'api.github.com',
    path: '/repos/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/contents/spritesheets/feet/shoes',
    headers: { 'User-Agent': 'Node.js' }
};

https.get(options2, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        try {
            console.log("shoes contents:");
            console.log(JSON.parse(data).map(f => f.name));
        } catch(e) {}
    });
});
