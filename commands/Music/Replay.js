const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: ["music", "replay"],
    description: "replay the current song",
    category: "music",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.editReply(`there is nothing in the queue right now!`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("you need to be in a same/voice channel.")

        await queue.seek(0)

        const embed = new EmbedBuilder()
            .setColor(client.color)
            .setDescription("\`🔁\` | **song has been:** `replayed`")

        interaction.editReply({ embeds: [embed] });
        
    }
}
