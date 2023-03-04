const { EmbedBuilder } = require("discord.js");
const { Database } = require("st.db");

const GSetup = new Database("./settings/models/setup.json", { databaseInObject: true });

module.exports = {
    name: ["nowplaying"],
    description: "display the song currently playing",
    category: "music",
    run: async (client, interaction) => {
		await interaction.deferReply({ ephemeral: false });

        const db = await GSetup.get(interaction.guild.id);
        if (db.setup_enable === true) return interaction.editReply("command is disabled | already have song request channel!");

        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.editReply(`There is nothing in the queue right now!`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("you need to be in a same/voice channel.")

        const uni = `${queue.songs[0].playing ? '⏸️ |' : '🔴 |'}`;
        const part = Math.floor((queue.currentTime / queue.songs[0].duration) * 30);

        const embed = new EmbedBuilder()
            .setAuthor({ name: queue.songs[0].playing ? 'song paused...' : 'now playing...', iconURL: "https://cdn.discordapp.com/emojis/741605543046807626.gif"})
            .setColor(client.color)
            .setDescription(`**[${queue.songs[0].name}](${queue.songs[0].url})**`)
            .setThumbnail(`${queue.songs[0].thumbnail}`)
            .addFields({ name: 'uploader:', value: `[${queue.songs[0].uploader.name}](${queue.songs[0].uploader.url})`, inline: true })
            .addFields({ name: 'requester:', value: `${queue.songs[0].user}`, inline: true })
            .addFields({ name: 'volume:', value: `${queue.volume}%`, inline: true })
            .addFields({ name: 'views', value: `${queue.songs[0].views}`, inline: true })
            .addFields({ name: 'likes:', value: `${queue.songs[0].likes}`, inline: true })
            .addFields({ name: 'filters:', value: `${queue.filters.names.join(', ') || "normal"}`, inline: true })
            .addFields({ name: `current duration: \`[${queue.formattedCurrentTime} / ${queue.songs[0].formattedDuration}]\``, value: `\`\`\`${uni} ${'─'.repeat(part) + '🎶' + '─'.repeat(30 - part)}\`\`\``, inline: false })
            .setTimestamp()

        interaction.editReply({ embeds: [embed] });
    }
}
