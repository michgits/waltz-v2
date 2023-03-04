const { EmbedBuilder, AttachmentBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    name: ["utilities", "setup"],
    description: "setup channel song request",
    category: "utilities",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return interaction.editReply(`you don't have permission.`);

        await interaction.guild.channels.create({
            name: "song-request",
            type: 0,
            topic: `⏯ *pause/resume the song.*\n⬅ *previous the song.*\n⏹ *stop the song.*\n➡ *skip the song.*\n🔁 *loop/unloop the song.*`,
            parent_id: interaction.channel.parentId,
            user_limit: 3,
            rate_limit_per_user: 3, 
        }).then(async (channel) => {
            const attachment = new AttachmentBuilder("./settings/images/banner.png", { name: "setup.png" });

            const content = `**__queue list:__**\njoin a voice channel and queue songs by name or url in here.`;

            const embed = new EmbedBuilder()
                .setColor(client.color)
                .setAuthor({ name: `no song playing currently.` })
                .setImage(`https://us-east-1.tixte.net/uploads/michu.needs.rest/bg.jpg`)
                .setDescription(`>>> [invite](https://discord.com/api/oauth2/authorize?client_id=1076044895061561424&permissions=8&scope=bot)`)
                .setFooter({ text: `prefix is: /` });

            // SEND BANNER FIRST!
            await channel.send({ files: [attachment] });
            await channel.send({ content: `${content}`, embeds: [embed], components: [client.diSwitch, client.diSwitch2] }).then(async (message) => {

            // Create database!
            await client.createSetup(interaction, channel.id, message.id); // Can find on handlers/loadDatabase.js
                
            const embed = new EmbedBuilder()
                .setDescription(`*succesfully setup music system in* ${channel}`)
                .setColor(client.color);

            return interaction.followUp({ embeds: [embed] });
            })
        });
    }
};