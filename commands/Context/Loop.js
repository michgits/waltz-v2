const { EmbedBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
    name: ["context | loop"],
    type: ApplicationCommandType.Message,
    category: "context",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.editReply(`there is nothing in the queue right now!`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("you need to be in a same/voice channel.")

        if (queue.repeatMode === 2) {
            await client.distube.setRepeatMode(interaction, 0);

            const embed = new EmbedBuilder()
                .setColor(client.color)
                .setDescription(`\`🔁\` | **song is not looped:** \`All\``)

            interaction.editReply({ embeds: [embed] });
        } else {
            await client.distube.setRepeatMode(interaction, 2);
            
            const embed = new EmbedBuilder()
                .setColor(client.color)
                .setDescription(`\`🔁\` | **song is looped:** \`All\``)

            interaction.editReply({ embeds: [embed] });
        }
	}
};