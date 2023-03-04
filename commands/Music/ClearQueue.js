const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: ["music", "clearqueue"],
    description: "clear song in queue",
    category: "music",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });
        
        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.editReply(`there is nothing in the queue right now!`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("you need to be in a same/voice channel.")

        await queue.songs.splice(1, queue.songs.length);
        await client.UpdateQueueMsg(queue);
        
        const embed = new EmbedBuilder()
            .setDescription(`\`📛\` | *queue has been:* \`cleared\``)
            .setColor(client.color);

        interaction.editReply({ embeds: [embed] });
    }
}
