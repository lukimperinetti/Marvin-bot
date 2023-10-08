const Discord = require('discord.js');
const loadSlashCommands = require('../loaders/loadSlashCommands');

module.exports = async bot => {

    await loadSlashCommands(bot);

    console.log(`${bot.user.tag} is online`);
}