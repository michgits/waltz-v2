const { EmbedBuilder } = require('discord.js');
const { Database } = require("st.db");

const GVoice = new Database("./settings/models/voice.json", { databaseInObject: true });

module.exports = {
    name: ["music", "247"],
    description: "24/7 in voice channel",
    category: "music",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.editReply(`there is nothing in the queue right now!`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("you need to be in a same/voice channel.")

        const db = await GVoice.get(interaction.guild.id);

        if (db.voice_enable === true) {
            await client.createDVoice(interaction);

            const embed = new EmbedBuilder()
                .setDescription(`\`🌙\` | *24/7 mode has been:* \`deactivated\``)
                .setColor(client.color);

            interaction.editReply({ embeds: [embed] });
        } else if (db.voice_enable === false) {
            await client.createEVoice(interaction);

            const embed = new EmbedBuilder()
                .setDescription(`\`🌕\` | *24/7 mode has been:* \`activated\``)
                .setColor(client.color);

            interaction.editReply({ embeds: [embed] });
        }
    }
}