const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue) => {
    await client.UpdateMusic(queue);

    const embed = new EmbedBuilder()
        .setColor('#CFD5EA')
        .setDescription(`**channel is empty!**`)

    queue.textChannel.send({ embeds: [embed] })
}