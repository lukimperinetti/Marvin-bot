require("dotenv").config();
const { Client, IntentsBitField, TextChannel } = require("discord.js");
const https = require("https");
const cron = require("node-cron");
const moment = require("moment-timezone");

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
  console.log(`Logged in as ${client.user.tag}`);
  console.log(
    "Fuseau horaire actuel :",
    process.env.TZ || new Date().toString()
  );
});

client.on("messageCreate", (message) => {
  if (message.content.toLowerCase() === "marvin ?") {
    message.reply("Oui maître ?");
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  const { commandName } = interaction;

  //run every day at 8:00 AM the command "gif" in a specific channel:
  cron.schedule("0 * * * *", () => {
    // pour 8h en france ?
    const time = moment().tz("Europe/Paris").format("HH:mm");
    console.log("Running Cron Job at", time);
    if (time === "21:20") {
      // if (commandName === "gif") {
      const url = `https://tenor.googleapis.com/v2/search?q=bonjour&key=${process.env.TENOR_API_KEY}&limit=8`;

      https
        .get(url, (response) => {
          let data = "";

          response.on("data", (chunk) => {
            data += chunk;
          });

          response.on("end", () => {
            const json = JSON.parse(data);
            const index = Math.floor(Math.random() * json.results.length);

            // Find the "général" channel in the guild (server)
            const guild = interaction.guild;
            const generalChannel = guild.channels.cache.find(
              (channel) => channel.name === "général"
            );

            if (generalChannel instanceof TextChannel) {
              generalChannel.send(json.results[index].url);
            } else {
              interaction.reply("I could not find the 'général' text channel.");
            }
          });
        })
        .on("error", (error) => {
          console.error(error);
          interaction.reply("An error occurred while fetching the GIF.");
        });
    }
  });
});

client.login(process.env.TOKEN);
