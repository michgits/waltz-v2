const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: ["music", "remove"],
    description: "remove song from queue",
    category: "music",
    options: [
        {
            name: "position",
            description: "the position in queue want to remove",
            type: ApplicationCommandOptionType.Integer,
            required: true,
        }
    ],
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const tracks = interaction.options.getInteger("position");
        
        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.editReply(`there is nothing in the queue right now!`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("you need to be in a same/voice channel.")

        if (tracks == 0) return interaction.editReply(`cannot remove a song that's already playing.`);
        if (tracks > queue.songs.length) return interaction.editReply(`song not found.`);

        const song = queue.songs[tracks];

        await queue.songs.splice(tracks, 1);

        const embed = new EmbedBuilder()
            .setColor(client.color)
            .setDescription(`**removed • [${song.name}](${song.url})** \`${song.formattedDuration}\` • ${song.user}`)

        interaction.editReply({ content: " ", embeds: [embed] });
    }
}