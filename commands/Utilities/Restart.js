const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: ["utilities", "restart"],
    description: "shutdown bot.",
    category: "utilities",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });
        if(interaction.user.id != client.owner) return interaction.channel.send("you are not the client owner!")

        const embed = new EmbedBuilder()
            .setDescription("**account is**: `shutting down...`")
            .setColor(client.color);

        await interaction.editReply({ embeds: [embed] });
        process.exit();
    }
};