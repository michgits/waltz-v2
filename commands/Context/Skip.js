const { EmbedBuilder, ApplicationCommandType } = require('discord.js');

module.exports = { 
    name: ["context | skip"],
    type: ApplicationCommandType.Message,
    category: "context",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.editReply(`there is nothing in the queue right now!`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("you need to be in a same/voice channel.")

        if (queue.songs.length === 1 && queue.autoplay === false) {
            const embed = new EmbedBuilder()
                .setColor(client.color)
                .setDescription("\`🚨\` | **there are no** `songs` **in queue**")

            interaction.editReply({ embeds: [embed] });
        } else { 
            await client.distube.skip(interaction);
            
            const embed = new EmbedBuilder()
                .setColor(client.color)
                .setDescription("\`⏭\` | **song has been:** `skipped`")

            interaction.editReply({ embeds: [embed] });
        }
    }
}