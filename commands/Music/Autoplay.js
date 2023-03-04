const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: ["music", "autoplay"],
    description: "toggle autoplay music in guild.",
    category: "music",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });
        
        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.editReply(`there is nothing in the queue right now!`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("you need to be in a same/voice channel.")

        if (!queue.autoplay) {
            await client.distube.toggleAutoplay(interaction);
    
            const embed = new EmbedBuilder()
                .setColor(client.color)
                .setDescription(`\`📻\` | *autoplay has been:* \`activated\``);

            interaction.editReply({ embeds: [embed] });
        } else {
            await client.distube.toggleAutoplay(interaction);

            const embed = new EmbedBuilder()
                .setColor(client.color)
                .setDescription(`\`📻\` | *autoplay has been:* \`deactivated\``);

            interaction.editReply({ embeds: [embed] });
        }
    }
}
