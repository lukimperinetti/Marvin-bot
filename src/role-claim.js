const { Client, MessageReaction, User } = require("discord.js");
const firstMessage = require("./first-message");

const ROLE_CHANNEL_ID = "1176266826515239023";
//'1175077693918818355';

const emojis = {
  // emojiName: 'roleID'
  // mc_diamond: '1175078347550769232',
  // shield: '1172451982317985835'
  alert: "alert",
  twitter: "nouveau rôle",
};

/**
 *
 * @param {MessageReaction} reaction
 * @param {User} user
 * @param {Boolean} add
 */
const handleReaction = (reaction, user, add) => {
  console.log("Reaction handled:", reaction.emoji.name, user.username);

  const { guild } = reaction.message;
  const roleName = emojis[reaction.emoji.name];

  console.log("Role Name:", roleName);

  const role = guild.roles.cache.find((role) => role.name === roleName);

  console.log("Role:", role);

  const member = guild.members.cache.find((member) => member.id === user.id);

  console.log("Member:", member);

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

  let text = "Choisissez vos rôles :\n\n";

  for (const key in emojis) {
    const emoji = getEmoji(key);
    if (!emoji) return;
    reactions.push(emoji);
    text += `${emoji} : ${emojis[key]}\n`;
  }

  firstMessage(channel, text, reactions);

  client.on("messageReactionAdd", (reaction, user) => {
    console.log('toto');
    if (reaction.message.channel.id === channel.id) {
      handleReaction(reaction, user, true);
      console.log("Reaction added:", reaction.emoji.name, user.username);
    }
  });

  client.on("messageReactionRemove", (reaction, user) => {
    if (reaction.message.channel.id === channel.id) {
      handleReaction(reaction, user, false);
      console.log("Reaction removed:", reaction.emoji.name, user.username);
    }
  });
};
