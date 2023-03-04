const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: ["music", "resume"],
    description: "resume the music",
    category: "music",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.editReply(`there is nothing in the queue right now!`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("you need to be in a same/voice channel.")
		
		if (queue.paused) { 
			await client.distube.resume(interaction);

			const embed = new EmbedBuilder()
				.setColor(client.color)
				.setDescription(`\`⏯\` | **song has been:** \`resumed\``);

			interaction.editReply({ embeds: [embed] });
			client.UpdateQueueMsg(queue);
		} else {
			await client.distube.pause(interaction);

			const embed = new EmbedBuilder()
				.setColor(client.color)
				.setDescription(`\`⏯\` | **song has been:** \`paused\``);

			interaction.editReply({ embeds: [embed] });
			client.UpdateQueueMsg(queue);
		}
    }
}
