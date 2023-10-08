require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

/**
 * The bitfield representing the intents the client is using.
 * Intent = set of permissions that your bot needs to run properly
 * remember that a guild is a server in discord
 * @external Intents
 * @see {@link https://discord.com/developers/docs/topics/gateway#gateway-intents}
 */


const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', message => {
    if (message.content === 'ping') {
        message.reply('🏓 Pong !');
    }
    if (message.content === 'Marvin ?') {
        message.reply('Oui maître ?');
    }
});

client.login(process.env.TOKEN);