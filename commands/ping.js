const Discord = require('discord.js');

module.exports = {
    name: "ping",
    async run(bot, message) {
        await message.channel.send(`🏓 Pong ! \`${bot.ws.ping}\``);
    }
}