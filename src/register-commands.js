require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

/**
 * Array of command objects.
 * @type {Array<Object>}
 */
const commands = [
  {
    name: "gif",
    description: "Add gif",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("registering slash commands...");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );
    console.log("Successfully registered application commands.");
  } catch (error) {
    console.log(`Error while registering application commands: ${error}`);
  }
})();
