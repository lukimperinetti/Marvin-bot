/**
 * Loads slash commands for the bot.
 * @param {Discord.Client} bot - The Discord bot client.
 */

const Discord = require("discord.js");
const { REST } = require('@discordjs/rest');
const { Routes } = require("discord.js");

module.exports = async (bot) => {
  let commands = [];

  bot.commands.forEach(async (command) => {
    let slashCommand = new Discord.SlashCommandBuilder()
      .setName(command.name)
      .setDescription(command.description)
      .setDMPermission(command.dm)
      .setDefaultMemberPermissions(
        command.permissions === "Aucune" ? null : command.permissions
      );

    if (command.options?.length >= 1) {
      for (let i = 0; i < command.options.length; i++) {
        slashCommand[
          `add${
            command.options[i].type.slice(0, 1).toLowerCase() +
            command.options[i].type.slice(1, command.options[i].type.length)
          }Options`
        ]((option) =>
          option
            .setName(command.options[i].name)
            .setDescription(command.options[i].description)
            .setRequired(command.options[i].required)
        );
      }
    }

    await commands.push(slashCommand);
  });
  const rest = new REST({ version: "10" }).setToken(bot.token);

  await rest.put(Routes.applicationCommands(bot.user.id), { body: commands });
  await console.log("Slash commands loaded.");
}
