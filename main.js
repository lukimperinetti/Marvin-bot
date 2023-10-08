
const Discord = require("discord.js");
const intents = new Discord.IntentsBitField(3276799); // Create a new intents object
const bot = new Discord.Client({ intents }); // Create a new bot client and allow it to interact with Discord
const loadCommands = require("./loaders/loadCommands.js");
const loadEvents = require("./loaders/loadEvents.js");
const config = require("./config.js");

bot.commands = new Discord.Collection();

bot.login(config.token);
loadCommands(bot);
loadEvents(bot);