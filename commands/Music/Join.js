const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: ["music", "join"],
    description: "make the bot join the voice channel",
    category: "music",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

		const queue = client.distube.getQueue(interaction);
		if (queue) return interaction.editReply(`i'm already playing in voice channel.`);
		const { channel } = interaction.member.voice;
		if(!channel) return interaction.editReply(`you need to be in voice channel.`);

		await client.distube.voices.join(interaction.member.voice.channel);

		const embed = new EmbedBuilder()
			.setColor(client.color)
			.setDescription(`\`🔊\` | **joined:** \`${channel.name}\``)

		interaction.editReply({ embeds: [embed] });
    }
}
