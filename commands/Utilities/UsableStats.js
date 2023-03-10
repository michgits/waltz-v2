const { EmbedBuilder } = require("discord.js");
const { Database } = require("st.db");

const BStats = new Database("./settings/models/stats.json", { databaseInObject: true });

module.exports = {
    name: ["usablestats"],
    description: "display most used commands stats",
    category: "utilities",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const all = BStats.all().slice(0, 10);

        all.sort((a, b) => {
            return b.data - a.data;
        });

        var index = 0;

        for (let i = 0; i < all.length; i++) {
            const total = all[i].data;
            index = (index + total)
        }

        const TopUsable = [];
        for (let i = 0; i < all.length; i++) {
            const name = all[i].ID;
            const usable = all[i].data;

            TopUsable.push(
                `**${i + 1}.** ${name} | **Usable:** \`${usable}\`
                `)
        }

        const str = TopUsable.join('');

        const embed = new EmbedBuilder()
            .setColor(client.color)
            .setAuthor({ name: `most used commands!`, iconURL: interaction.guild.iconURL({ dynamic: true })})
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }))
            .setDescription(`${str == '' ? '  No Usable' : '\n' + str}`)
            .setFooter({ text: `total command • ${BStats.all().length} | total usable • ${index}` })


        return interaction.editReply({ embeds: [embed] })
    }
}