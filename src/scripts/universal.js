// Make the universal ready for firebase deployment.

// PREREQUISITES : This script must be called just after
// The client code is generated :
// ng run revendic:ssr-client --configuration=production
// The server code is also generated :
// ng run revendic:ssr-server

// now we need to copy to <root>/dist/ssr
// and remove index.html
// and create a index2.html page

const fs = require('fs-extra');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');
const dist = path.resolve(rootDir, './dist');

try {
    fs.mkdirpSync(dist);
    fs.copySync(path.resolve(rootDir, './functions/dist/browser'), path.resolve(rootDir, './dist/ssr'));
    fs.renameSync(path.resolve(rootDir, './dist/ssr/index.html'), path.resolve(rootDir, './dist/ssr/not-found.html'));
    console.log('success!');
} catch (err) {
    console.error(err);
}
