/**
 * Discord.js module
 * @external Discord
 * @see {@link https://discord.js.org/#/docs/main/stable/general/welcome}
 */

/**
 * The intents object for the bot
 * @type {Discord.Intents}
 */
const intents = new Discord.IntentsBitField(3276799);

/**
 * The bot client
 * @type {Discord.Client}
 */
const bot = new Discord.Client({ intents });

/**
 * Loads all the commands for the bot
 * @type {Function}
 */
const loadCommands = require("./loaders/loadCommands.js");

/**
 * Loads all the events for the bot
 * @type {Function}
 */
const loadEvents = require("./loaders/loadEvents.js");

/**
 * The configuration object for the bot
 * @type {Object}
 */
const config = require("./config.js");

/**
 * A collection of all the bot commands
 * @type {Discord.Collection}
 */
bot.commands = new Discord.Collection();

/**
 * Logs the bot in with the provided token
 */
bot.login(config.token);

// Load all the commands and events
loadCommands(bot);
loadEvents(bot);