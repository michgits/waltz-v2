const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: ["music", "leave"],
    description: "make the bot leave the voice channel",
    category: "music",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const queue = client.distube.getQueue(interaction);
		if (!queue) return interaction.editReply(`there is nothing in the queue right now!`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("you need to be in a same/voice channel.")

        await client.distube.voices.leave(interaction.guild);

        const embed = new EmbedBuilder()
            .setDescription(`\`🚫\` | **left:** | \`${channel.name}\``)
            .setColor(client.color)

        interaction.editReply({ embeds : [embed] });
    }
}
