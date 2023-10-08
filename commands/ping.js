const Discord = require("discord.js");

/**
 * Represents a command to check the bot's ping.
 * @typedef {Object} PingCommand
 * @property {string} name - The name of the command.
 * @property {Function} run - The function that runs the command.
 */

/**
 * A command to check the bot's ping.
 * @type {PingCommand}
 */
/**
 * Runs the ping command.
 * @param {Discord.Client} bot - The Discord bot client.
 * @param {Discord.Message} message - The message that triggered the command.
 */
module.exports = {
  name: "ping",
  description: "Check the bot's ping.",
  permission: 'Aucune',
  dm: true,

  async run(bot, message) {
    await message.channel.send(`🏓 Pong ! \`${bot.ws.ping}\``);
  },
};
