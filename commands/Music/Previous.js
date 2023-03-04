const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: ["music", "previous"],
    description: "play the previous song in the queue",
    category: "music",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.editReply(`there is nothing in the queue right now!`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("you need to be in a same/voice channel.")

        if (queue.previousSongs.length == 0) {
            const embed = new EmbedBuilder()
                .setColor(client.color)
                .setDescription("\`🚨\` | **there are no** `previous` **songs**")

            interaction.editReply({ embeds: [embed] });
        } else { 
            await client.distube.previous(interaction);

            const embed = new EmbedBuilder()
                .setColor(client.color)
                .setDescription("\`⏮\` | **song has been:** `previous`")

            interaction.editReply({ embeds: [embed] });
        }        
    }
}
