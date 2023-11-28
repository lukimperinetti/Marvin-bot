const { TextChannel, Message, Collection } = require("discord.js");

const TIMEOUT = 500;

/**
 * Adds reactions to a message.
 * @param {Message} message - The message to add reactions to.
 * @param {Array} reactions - An array of reactions to add.
 */
const addReactions = (message, reactions) => {
  message.react(reactions[0]);
  reactions.shift();
  if (reactions.length > 0) {
    setTimeout(() => addReactions(message, reactions), TIMEOUT);
  }
};

/**
 * Initializes the first message in a channel.
 * @param {Channel} channel - The channel to send the message in.
 * @param {string} text - The text content of the message.
 * @param {Array<string>} reactions - The reactions to add to the message.
 * @returns {Promise<void>} - A promise that resolves when the message is sent and reactions are added.
 */
const initFirtMessage = async (channel, text, reactions) => {
  await channel.send(text).then((message) => {
    addReactions(message, reactions);
  });
};

/**
 * Edits the first message in the given array of messages with the provided text and reactions.
 * @param {Array} messages - The array of messages.
 * @param {string} text - The new text for the first message.
 * @param {Array} reactions - The reactions to add to the first message.
 */
const editFirstMessage = (messages, text, reactions) => {
  for (const message of messages) {
    message[1].edit(text);
    addReactions(message, reactions);

    if (reactions) {
      addReactions(message[1], reactions);
    }
  }
};

/**
 *
 * @param {TextChannel} channel
 * @param {String} text
 * @param {Array} reactions
 */
module.exports = (channel, text, reactions) => {
  channel.messages.fetch().then((messages) => {
    if (messages.size === 0) {
      // Create a new message
      initFirtMessage(channel, text, reactions);
    } else if (messages.size === 1) {
      // Edit the existing message
      editFirstMessage(channel, text, reactions);
    }
  });
};
