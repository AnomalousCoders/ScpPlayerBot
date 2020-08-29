const Discord = require('discord.js');
const client = new Discord.Client();
const MD5 = require("crypto-js/md5");
const { token, ip, port } = require('./config.json');

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);
    console.log('Successfully started up!\n\n');
    await client.user.setPresence({activity: {name: 'Startet...', type: 'PLAYING'}, status: 'idle'});
})

client.login(token);

