const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const delay = require('delay');

module.exports = {
    name: ["filter", "custom"],
    description: "select your own filter",
    category: "filter",
    options: [
        {
            name: 'args',
            description: 'type a filter.',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const args = interaction.options.getString('args');
        
        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.editReply(`there is nothing in the queue right now!`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("you need to be in a same/voice channel.")

        if (args === "off" && queue.filters.size) queue.filters.clear();
        else if (Object.keys(client.distube.filters).includes(args)) {
            if (queue.filters.has(args)) queue.filters.remove(args)
            else queue.filters.add(args)
        } else if (args[0]) interaction.editReply(`invalid filter!`)

        const embed = new EmbedBuilder()
            .setAuthor({ name: `currently filtered`, iconURL: `https://cdn.discordapp.com/emojis/741605543046807626.gif`})
            .setDescription(`\🎲 **filter:** \`${queue.filters.names.join(", ") || "normal"}\``)
            .setFooter({ text: `🔩 **example:** \`/filter 3d\``})
            .setTimestamp()
            .setColor(client.color);

        await delay(3000)
        interaction.editReply({ content: ' ', embeds: [embed] })
    } 
}; // testing version