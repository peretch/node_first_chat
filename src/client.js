const readline = require('readline');
const io = require('socket.io-client');
const client = io('http://localhost:3000/');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let username = '';

client.on('connect', () => {
    if (username.length) {
        return process.exit(0);
    }

    rl.question(`What's your name? `, (answer) => {
        username = answer;
        client.emit('username', username);
        rl.setPrompt(`[${username}]: `);
        rl.prompt();
    });

    rl.on('line', (payload) => {
        client.emit('message', payload);
        rl.prompt();
    });
});