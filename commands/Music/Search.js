const { PermissionsBitField, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");
const { Database } = require("st.db");
const ytsr = require("@distube/ytsr");

const GSetup = new Database("./settings/models/setup.json", { databaseInObject: true });

module.exports = {
    name: ["search"],
    description: "search song and play music",
    category: "music",
    options: [
        {
            name: "search",
            type: ApplicationCommandOptionType.String,
            description: "the song to play",
            required: true
        }
    ],
    run: async (client, interaction) => {
        const string = interaction.options.getString("search");

        const db = await GSetup.get(interaction.guild.id);
        if (db.setup_enable === true) return interaction.reply("command is disabled | already have song request channel!");

        await interaction.reply(`🔍 **searching...** \`${string}\``);

        const message = await interaction.fetchReply();
        await client.createPlay(interaction, message.id);

        const { channel } = interaction.member.voice;
        if (!channel) return interaction.editReply("you need to be in voice channel.")
        if (!channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.Flags.Connect)) return interaction.editReply(`i don't have perms \`CONNECT\` in ${channel.name} to join voice!`);
        if (!channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.Flags.Speak)) return interaction.editReply(`i don't have perms \`SPEAK\` in ${channel.name} to join voice!`);

        const row = new  ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId("one")
            .setEmoji("1️⃣")
            .setStyle(ButtonStyle.Secondary)
        )
        .addComponents(
          new ButtonBuilder()
            .setCustomId("two")
            .setEmoji("2️⃣")
            .setStyle(ButtonStyle.Secondary)
        )
        .addComponents(
          new ButtonBuilder()
            .setCustomId("three")
            .setEmoji("3️⃣")
            .setStyle(ButtonStyle.Secondary)
        )
        .addComponents(
          new ButtonBuilder()
            .setCustomId("four")
            .setEmoji("4️⃣")
            .setStyle(ButtonStyle.Secondary)
        )
        .addComponents(
          new ButtonBuilder()
            .setCustomId("five")
            .setEmoji("5️⃣")
            .setStyle(ButtonStyle.Secondary)
        )

        const options = {
            member: interaction.member,
            textChannel: interaction.channel,
            interaction,
        }

        const res = await ytsr(string, { safeSearch: true, limit: 5 });

        let index = 1;
        const result = res.items.slice(0, 5).map(x => `**(${index++}.) [${x.name}](${x.url})** author: \`${x.author}\``).join("\n")

        const embed = new EmbedBuilder()
            .setAuthor({ name: `song selection...`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
            .setColor(client.color)
            .setDescription(result)
            .setFooter({ text: `please response in 30s` })

        await message.edit({ content: " ", embeds: [embed], components: [row] });

        const collector = interaction.channel.createMessageComponentCollector({ filter: (m) => m.user.id === interaction.user.id, time: 30000, max: 1 });

        collector.on('collect', async (interaction) => {
            const id = interaction.customId;
            const loader = new EmbedBuilder()
                .setDescription("**loading please wait....**")


            if(id === "one") {
                await message.edit({ embeds: [loader], components: [] });
                await client.distube.play(interaction.member.voice.channel, res.items[0].url, options);
            } else if(id === "two") {
                await message.edit({ embeds: [loader], components: [] });
                await client.distube.play(interaction.member.voice.channel, res.items[1].url, options);
            } else if(id === "three") {
                await message.edit({ embeds: [loader], components: [] });
                await client.distube.play(interaction.member.voice.channel, res.items[2].url, options);
            } else if(id === "four") {
                await message.edit({ embeds: [loader], components: [] });
                await client.distube.play(interaction.member.voice.channel, res.items[3].url, options);
            } else if(id === "five") {
                await message.edit({ embeds: [loader], components: [] });
                await client.distube.play(interaction.member.voice.channel, res.items[4].url, options);
            }
        });

        collector.on('end', async (collected, reason) => {
            if(reason === "time") {
                message.edit({ content: `no response`, embeds: [], components: [] });
            }
        });
    }
}
