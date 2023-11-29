const { Client, MessageReaction, User } = require("discord.js");
const firstMessage = require("./first-message");

const ROLE_CHANNEL_ID = "1175077693918818355";
//'1175077693918818355'; -- discord promo
//1176266826515239023 --discord debug Luk

const emojis = {
  // emojiName: 'roleName : Emoji ok'
  mc_diamond: '💎 Minecraft 💎',
  Anonymous_Hacker: '🛡️ Cybersec 🛡️',
  VR: '🥽 XR 🥽',
  Robot_icon: '🦾 IA 🦾',
  manager: '🧑‍💼 Management 🧑‍💼',
  harddrive: '💽 Big Data 💽',
  aesthetic_cloud: '☁️ Cloud ☁️',
  arduino: '🕹️ IoT 🕹️'
};

/**
 *
 * @param {MessageReaction} reaction
 * @param {User} user
 * @param {Boolean} add
 */
const handleReaction = (reaction, user, add) => {
  const { guild } = reaction.message;
  const roleName = emojis[reaction.emoji.name];

  const role = guild.roles.cache.find((role) => role.name === roleName);

  const member = guild.members.cache.find((member) => member.id === user.id);

  if (add) {
    member.roles
      .add(role)
      .then(() => {
        console.log("Role added successfully.");
      })
      .catch((error) => {
        console.error("Error adding role:", error);
      });
  } else {
    member.roles
      .remove(role)
      .then(() => {
        console.log("Role removed successfully.");
      })
      .catch((error) => {
        console.error("Error removing role:", error);
      });
  }
};

/**
 *
 * @param {Client} client
 */
module.exports = (client) => {
  const channel = client.channels.cache.find(
    (channel) => channel.id === ROLE_CHANNEL_ID
  );
  const getEmoji = (emojiName) =>
    client.emojis.cache.find((emoji) => emoji.name === emojiName);
  const reactions = [];

  let text = "Choisissez vos parcours / jeux en utilisant les emojis : \n\n";

  for (const key in emojis) {
    const emoji = getEmoji(key);
    if (!emoji) return;
    reactions.push(emoji);
    text += `${emoji} : ${emojis[key]}\n`;
  }

  firstMessage(channel, text, reactions);

  client.on("messageReactionAdd", (reaction, user) => {
    try {
      if (reaction.message.channel.id === channel.id) {
        handleReaction(reaction, user, true);
        console.log("Reaction added:", reaction.emoji.name, user.username);
      }
    } catch (error) {
      console.error("Error in messageReactionAdd event:", error);
    }
  });

  client.on("messageReactionRemove", (reaction, user) => {
    try {
      if (reaction.message.channel.id === channel.id) {
        handleReaction(reaction, user, false);
        console.log("Reaction removed:", reaction.emoji.name, user.username);
      }
    } catch (error) {
      console.error("Error in messageReactionRemove event:", error);
    }
  });
};
