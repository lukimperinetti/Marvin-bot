const fs = require("fs"); // Load the File System module

/**
 * line 10 : read all files in the commands folder
 * line 11 : return content of the file
 */

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
      console.log(`command ${files} loaded successfully !`);
    });
};
