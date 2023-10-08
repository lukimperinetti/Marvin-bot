/**
 * Handles the message creation event.
 * @param {Discord.Client} bot - The Discord client instance.
 * @param {Discord.Message} message - The message object.
 */

const Discord = require('discord.js');

module.exports = async (bot, message) => {

    let prefix = "!";

    let messageArray = message.content.split(" ");
    let commandName = messageArray[0].slice(prefix.length);
    let cmd = messageArray.slice(1);

    if (!message.content.startsWith(prefix)) return;

    let commands = require(`../commands/${commandName}.js`);

    if (!commands) return message.channel.send("This command doesn't exist");

    commands.run(bot, message, cmd);
}