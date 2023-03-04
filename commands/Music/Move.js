const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: ["music", "move"],
    description: "move position song in queue",
    category: "music",
    options: [
        {
            name: "queue",
            description: "the queue of the song",
            type: ApplicationCommandOptionType.Integer,
            required: true,
        },
        {
            name: "position",
            description: "the position in queue want to move to",
            type: ApplicationCommandOptionType.Integer,
            required: true,
        }
    ],
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const tracks = interaction.options.getInteger("queue");
        const position = interaction.options.getInteger("position");

        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.editReply(`there is nothing in the queue right now!`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("you need to be in a same/voice channel.")

        if (tracks == 0) return interaction.editReply(`cannot move a song already playing.`);
        if (position == 0) return interaction.editReply(`cannot move to this position a song already playing.`);
        if (tracks > queue.songs.length) return interaction.editReply(`queue | song not found.`);
        if (position > queue.songs.length) return interaction.editReply(`position | song not found.`);

        const song = queue.songs[tracks];

        await queue.songs.splice(tracks);
        await queue.addToQueue(song, position);

        const embed = new EmbedBuilder()
            .setDescription(`**Moved • [${song.name}](${song.url})** to ${position}`)
            .setColor(client.color)

        interaction.editReply({ embeds: [embed] });
    }
}