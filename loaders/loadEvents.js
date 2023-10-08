/**
 * Loads all event files from the events directory and binds them to the bot.
 * @param {Object} bot - The Discord bot object.
 * @returns {Promise<void>} - A Promise that resolves when all events have been loaded.
 */

const fs = require("fs");

module.exports = async (bot) => {
  fs.readdirSync("./events")
    .filter((f) => f.endsWith(".js"))
    .forEach((files) => {
      let event = require(`../events/${files}`);
      bot.on(files.split(".js").join(""), event.bind(null, bot));
      console.log(`Event ${files.split(".js").join("")} successfully loaded !`);
    });
};
