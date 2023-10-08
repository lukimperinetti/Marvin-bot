const Discord = require("discord.js");

module.exports = async (bot, interaction) => {
  if (interaction.type === Discord.InteractionType.ApplicationCommand) {
    let commands = require(`../commands/${interaction.commandName}.js`);
    commands.run(bot, interaction, commands.options);
  }
};
