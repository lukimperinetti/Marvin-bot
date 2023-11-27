const { TextChannel, Message, Collection } = require("discord.js");

const TIMEOUT = 500;

/**
 *
 * @param {Message} message
 * @param {Array} reactions
 */
const addReactions = (message, reactions) => {
  message.react(reactions[0]);
  reactions.shift();
  if (reactions.length > 0) {
    setTimeout(() => addReactions(message, reactions), TIMEOUT);
  }
};

const initFirtMessage = async (channel, text, reactions) => {
  await channel.send(text).then((message) => {
    addReactions(message, reactions);
  });
};

/**
 *
 * @param {Collection<String,Message>} messages
 * @param {String} text
 * @param {Array} reactions
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
