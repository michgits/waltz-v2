const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: ["music", "skipto"],
    description: "skips to a certain song in the queue",
    category: "music",
    options: [
        {
            name: "position",
            description: "the position of the song in the queue",
            type: ApplicationCommandOptionType.Integer,
            required: true,
        }
    ],
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const args = interaction.options.getInteger("position");

        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.editReply(`there is nothing in the queue right now!`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("you need to be in a same/voice channel.");

        if ((args > queue.songs.length) || (args && !queue.songs[args])) return interaction.editReply("song not found.");

        await client.distube.jump(interaction, args)
        
        const embed = new EmbedBuilder()
            .setColor(client.color)
            .setDescription(`\`⏭\` | **skipped to:** ${args}`)

        interaction.editReply({ embeds: [embed] });
    }
}
