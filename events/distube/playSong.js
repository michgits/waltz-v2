const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { Database } = require("st.db");

const GSetup = new Database("./settings/models/setup.json", { databaseInObject: true });

module.exports = async (client, queue, track) => {
  
  await client.UpdateQueueMsg(queue);
  await client.addChart(track.id);

  const db = await GSetup.get(queue.textChannel.guild.id);
  if (db.setup_enable === true) return;

  var newQueue = client.distube.getQueue(queue.id)
  var data = disspace(newQueue, track)

  const nowplay = await queue.textChannel.send(data)

  const filter = (message) => {
    if (message.guild.members.me.voice.channel && message.guild.members.me.voice.channelId === message.member.voice.channelId) return true;
    else {
      message.reply({ content: "you need to be in a same/voice channel.", ephemeral: true });
    }
  };
  const collector = nowplay.createMessageComponentCollector({ filter, time: 120000 });

  collector.on('collect', async (message) => {
    const id = message.customId;
    const queue = client.distube.getQueue(message.guild.id);
    if (id === "pause") {
      if (!queue) {
        collector.stop();
      }
      if (queue.paused) {
        await client.distube.resume(message.guild.id);
        const embed = new EmbedBuilder()
          .setColor("#CFD5EA")
          .setDescription(`\`⏯\` | **song has been:** \`resumed\``);

        message.reply({ embeds: [embed], ephemeral: true });
      } else {
        await client.distube.pause(message.guild.id);
        const embed = new EmbedBuilder()
          .setColor("#CFD5EA")
          .setDescription(`\`⏯\` | **song has been:** \`paused\``);

        message.reply({ embeds: [embed], ephemeral: true });
      }
    } else if (id === "skip") {
      if (!queue) {
        collector.stop();
      }
      if (queue.songs.length === 1 && queue.autoplay === false) {
        const embed = new EmbedBuilder()
          .setColor("#CFD5EA")
          .setDescription("\`🚨\` | **there are no** `songs` **in queue**")

        message.reply({ embeds: [embed], ephemeral: true });
      } else {
        await client.distube.skip(message)
            const embed = new EmbedBuilder()
              .setColor("#CFD5EA")
              .setDescription("\`⏭\` | **song has been:** `skipped`")

            nowplay.edit({ components: [] });
            message.reply({ embeds: [embed], ephemeral: true });
      }
    } else if (id === "stop") {
      if (!queue) {
        collector.stop();
      }
      await client.distube.voices.leave(message.guild);
      const embed = new EmbedBuilder()
        .setDescription(`\`🚫\` | **song has been:** | \`stopped\``)
        .setColor('#CFD5EA');

      await nowplay.edit({ components: [] });
      message.reply({ embeds: [embed], ephemeral: true });
    } else if (id === "loop") {
      if (!queue) {
        collector.stop();
      }
      if (queue.repeatMode === 0) {
        client.distube.setRepeatMode(message.guild.id, 1);
        const embed = new EmbedBuilder()
          .setColor("#CFD5EA")
          .setDescription(`\`🔁\` | **song is looped:** \`current\``)

        message.reply({ embeds: [embed], ephemeral: true });
      } else {
        client.distube.setRepeatMode(message.guild.id, 0);
        const embed = new EmbedBuilder()
          .setColor("#CFD5EA")
          .setDescription(`\`🔁\` | **song is not looped:** \`current\``)

        message.reply({ embeds: [embed], ephemeral: true });
      }
    } else if (id === "previous") {
      if (!queue) {
        collector.stop();
      }
      if (queue.previousSongs.length == 0) {
        const embed = new EmbedBuilder()
          .setColor("#CFD5EA")
          .setDescription("\`🚨\` | **there are no** `previous` **songs**")

        message.reply({ embeds: [embed], ephemeral: true });
      } else {
        await client.distube.previous(message)
        const embed = new EmbedBuilder()
          .setColor("#CFD5EA")
          .setDescription("\`⏮\` | **song has been:** `previous`")

        await nowplay.edit({ components: [] });
        message.reply({ embeds: [embed], ephemeral: true });
      }
    } else if (id === "shuffle") {
      if (!queue) {
        collector.stop();
      }
      await client.distube.shuffle(message);
      const embed = new EmbedBuilder()
          .setColor(client.color)
          .setDescription(`\`🔀\` | **song has been:** \`shuffled\``);

      message.reply({ embeds: [embed], ephemeral: true });
    } else if (id === "voldown") {
      if (!queue) {
        collector.stop();
      }
      await client.distube.setVolume(message, queue.volume - 5);
      const embed = new EmbedBuilder()
          .setColor(client.color)
          .setDescription(`\`🔊\` | **decreased volume to:** \`${queue.volume}\`%`)

      message.reply({ embeds: [embed], ephemeral: true });
    } else if (id === "clear") {
      if (!queue) {
        collector.stop();
      }
      await queue.songs.splice(1, queue.songs.length);
      await client.UpdateQueueMsg(queue);
      
      const embed = new EmbedBuilder()
          .setDescription(`\`📛\` | **queue has been:** \`cleared\``)
          .setColor(client.color);

      message.reply({ embeds: [embed], ephemeral: true });
    } else if (id === "volup") {
      if (!queue) {
        collector.stop();
      }
      await client.distube.setVolume(message, queue.volume + 5);
      const embed = new EmbedBuilder()
          .setColor(client.color)
          .setDescription(`\`🔊\` | **increase volume to:** \`${queue.volume}\`%`)

      message.reply({ embeds: [embed], ephemeral: true });
    } else if (id === "queue") {
      if (!queue) {
        collector.stop();
      }
      const pagesNum = Math.ceil(queue.songs.length / 10);
      if(pagesNum === 0) pagesNum = 1;
  
      const songStrings = [];
      for (let i = 1; i < queue.songs.length; i++) {
        const song = queue.songs[i];
        songStrings.push(
          `**${i}.** [${song.name}](${song.url}) \`[${song.formattedDuration}]\` • ${song.user}
          `);
      };

      const pages = [];
      for (let i = 0; i < pagesNum; i++) {
        const str = songStrings.slice(i * 10, i * 10 + 10).join('');
        const embed = new EmbedBuilder()
          .setAuthor({ name: `queue - ${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true })})
          .setThumbnail(queue.songs[0].thumbnail)
          .setColor(client.color)
          .setDescription(`**currently playing:**\n**[${queue.songs[0].name}](${queue.songs[0].url})** \`[${queue.songs[0].formattedDuration}]\` • ${queue.songs[0].user}\n\n**rest of queue**${str == '' ? '  nothing' : '\n' + str }`)
          .setFooter({ text: `page • ${i + 1}/${pagesNum} | ${queue.songs.length} • songs | ${queue.formattedDuration} • total duration`});
        
        pages.push(embed);
      };

      message.reply({ embeds: [pages[0]], ephemeral: true });
    }


  });
  collector.on('end', async (collected, reason) => {
    if (reason === "time") {
      nowplay.edit({ components: [] });
    }
  });
}

function disspace(nowQueue, nowTrack) {
  const embed = new EmbedBuilder()
    .setAuthor({ name: `start playing...`, iconURL: 'https://cdn.discordapp.com/emojis/741605543046807626.gif' })
    .setThumbnail(nowTrack.thumbnail)
    .setColor('#CFD5EA')
    .setDescription(`**[${nowTrack.name}](${nowTrack.url})**`)
    .addFields({ name: `Uploader:`, value: `**[${nowTrack.uploader.name}](${nowTrack.uploader.url})**`, inline: true })
    .addFields({ name: `Requester:`, value: `${nowTrack.user}`, inline: true })
    .addFields({ name: `Current Volume:`, value: `${nowQueue.volume}%`, inline: true })
    .addFields({ name: `Filters:`, value: `${nowQueue.filters.names.join(", ") || "normal"}`, inline: true })
    .addFields({ name: `Autoplay:`, value: `${nowQueue.autoplay ? "activated" : "not active"}`, inline: true })
    .addFields({ name: `Total Duration:`, value: `${nowQueue.formattedDuration}`, inline: true })
    .addFields({ name: `Current Duration: \`[0:00 / ${nowTrack.formattedDuration}]\``, value:`\`\`\`🔴 | 🎶──────────────────────────────\`\`\``, inline: false })
    .setTimestamp()

  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId("pause")
        .setLabel(`pause`)
        .setEmoji("⏯")
        .setStyle(ButtonStyle.Success)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("previous")
        .setLabel(`previous`)
        .setEmoji("⬅")
        .setStyle(ButtonStyle.Primary)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("stop")
        .setLabel(`stop`)
        .setEmoji("✖")
        .setStyle(ButtonStyle.Danger)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("skip")
        .setLabel(`skip`)
        .setEmoji("➡")
        .setStyle(ButtonStyle.Primary)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("loop")
        .setLabel(`loop`)
        .setEmoji("🔄")
        .setStyle(ButtonStyle.Success)
    )

    const row2 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId("shuffle")
        .setLabel(`shuffle`)
        .setEmoji(`🔀`)
        .setStyle(ButtonStyle.Primary)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("voldown")
        .setLabel(`vol -`)
        .setEmoji(`🔉`)
        .setStyle(ButtonStyle.Success)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("clear")
        .setLabel(`clear`)
        .setEmoji(`🗑`)
        .setStyle(ButtonStyle.Secondary)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("volup")
        .setLabel(`vol +`)
        .setEmoji(`🔊`)
        .setStyle(ButtonStyle.Success)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("queue")
        .setLabel(`queue`)
        .setEmoji(`📋`)
        .setStyle(ButtonStyle.Primary)
    )

  return {
    embeds: [embed],
    components: [row, row2]
  }
}