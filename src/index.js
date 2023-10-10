require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");
const https = require("https");

/**
 * The bitfield representing the intents the client is using.
 * Intent = set of permissions that your bot needs to run properly
 * remember that a guild is a server in discord
 * @external Intents
 * @see {@link https://discord.com/developers/docs/topics/gateway#gateway-intents}
 */

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (message) => {
  if (message.content.toLowerCase() === "marvin ?") {
    message.reply("Oui maître ?");
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  console.log(interaction.commandName);
  const https = require("https");

  if (interaction.commandName === "gif") {
    const url = `https://tenor.googleapis.com/v2/search?q=hello&key=${process.env.TENOR_API_KEY}&limit=8`;
    https
      .get(url, (response) => {
        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });
        response.on("end", () => {
          const json = JSON.parse(data);
          const index = Math.floor(Math.random() * json.results.length)
          interaction.reply(json.results[index].url);
        });
      })
      .on("error", (error) => {
        console.error(error);
      });
  }
});

client.login(process.env.TOKEN);
