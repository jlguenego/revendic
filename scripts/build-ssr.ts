const child = require('child_process');
const path = require('path');
const fs = require('fs-extra');

const spawn = child.spawn;

// At this time,
// env are :
// - production
// - preprod (default)

if (process.argv.length < 4) {
    throw `
Error: Missing arguments.


Usage: build-ssr.ts <firebaseCommand> <environment>

firebaseCommand = serve or deploy
environment = production or preprod`
}

const firebaseCommand = process.argv[2] || 'serve';
const env = process.argv[3] || 'preprod';

console.log('firebaseCommand', firebaseCommand);
console.log('environment', env);
const projectDir = path.resolve(__dirname, '..');
// Deployment

// Build Universal app
function runCommand(name, args) {
    return new Promise((resolve, reject) => {
        const prog = spawn(name, args, {
            cwd: projectDir,
            stdio: 'inherit',
            shell: true,
        });
        prog.on('error', reject);
        prog.on('close', code => (+code > 0) ? reject() : resolve());
    });
}

function adjustFile() {
    const dist = path.resolve(projectDir, './dist');
    const ssrDir = path.resolve(projectDir, './dist/ssr');
    
    try {
        fs.mkdirpSync(dist);
        fs.emptyDirSync(ssrDir);
        fs.copySync(path.resolve(projectDir, './functions/dist/browser'), ssrDir);
        fs.renameSync(path.resolve(projectDir, './dist/ssr/index.html'), path.resolve(projectDir, './dist/ssr/not-found.html'));
        fs.copyFileSync(path.resolve(projectDir, `./functions/secret.${env}.json`), path.resolve(projectDir, './functions/secret.json'));
        console.info('success!');
    } catch (err) {
        console.error(err);
    }
}

async function main() {
    try {
        await runCommand('ng', ['run', 'revendic:ssr-client', `--configuration=${env}`]);
        await runCommand('ng', ['run', 'revendic:ssr-server', `--configuration=${env}`]);
        adjustFile();
        await runCommand('firebase', [firebaseCommand]);
    } catch (error) {
        console.log('error', error);
    }
}
main();





