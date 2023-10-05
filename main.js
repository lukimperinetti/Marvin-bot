const Discord = require('discord.js'); // Load the discord.js library
const bot = new Discord.Client({intents: 3276799}); // Create a new bot client and allow it to interact with Discord
const config = require('./config.js'); // Load the config file

bot.login(config.token); // Login to the bot using the token provided in the config file

bot.on('ready', () => { // When the bot is ready
    console.log(`${bot.user.tag} est bien en ligne`); // Log "I am ready!"
});