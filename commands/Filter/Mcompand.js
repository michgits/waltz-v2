const { EmbedBuilder } = require('discord.js');
const delay = require('delay');

module.exports = {
    name: ["filter", "mcompand"],
    description: "turning on the mcompand filter",
    category: "filter",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });
        
        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.editReply(`there is nothing in the queue right now!`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("you need to be in a same/voice channel.")

        queue.filters.add("mcompand")

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'turned on: mcompand', iconURL: 'https://cdn.discordapp.com/emojis/758423098885275748.gif'})
            .setColor(client.color);

        await delay(5000);
        interaction.editReply({ content: ' ', embeds: [embed] })
    }
}; /// testing version