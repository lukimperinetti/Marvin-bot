/**
 * Load all commands from the commands folder and add them to the bot's commands collection.
 * @param {Object} bot - The Discord bot object.
 * @throws {TypeError} Will throw an error if a command file has an invalid name.
 */

const fs = require("fs"); 


module.exports = async (bot) => {
  fs.readdirSync("./commands")
    .filter((f) => f.endsWith(".js"))
    .forEach((files) => {
      let command = require(`../commands/${files}`);
      if (
        !command.name ||
        typeof command.name !== "string" ||
        command.name.trim().length === 0
      ) {
        throw new TypeError(
          `Command ${files.slice(0, files.length - 3)} has an invalid name`
        );
      }
      bot.commands.set(command.name, command);
      console.log(`command ${files} successfully loaded !`);
    });
};
