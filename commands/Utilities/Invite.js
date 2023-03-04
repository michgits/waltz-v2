const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: ["utilities", "invite"],
    description: "invite bot to your server",
    category: "utilities",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const embed = new EmbedBuilder()
        .setColor(client.color)
        .setAuthor({ name: "invite!"})
        .setDescription("```invite me to your server!```")
        .setTimestamp()
        .setFooter({ text: `requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL()});

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("invite")
                    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=2184310032&scope=bot%20applications.commands`)
                    .setEmoji("🔗")
                    .setStyle(ButtonStyle.Link)
            )
        
        interaction.editReply({ embeds: [embed], components: [row] });
    }
}
