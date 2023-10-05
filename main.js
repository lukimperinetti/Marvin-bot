const Discord = require("discord.js");
const intents = new Discord.IntentsBitField(3276799); // Create a new intents object
const bot = new Discord.Client({ intents }); // Create a new bot client and allow it to interact with Discord
const loadCommands = require("./loaders/loadCommands.js");
const config = require("./config.js");

bot.commands = new Discord.Collection();

bot.login(config.token);
loadCommands(bot);

bot.on("messageCreate", async (message) => {
  if (message.content === "!ping")
    return bot.commands.get("ping").run(bot, message);
});

bot.on("ready", () => {
  console.log(`${bot.user.tag} est bien en ligne`);
});
