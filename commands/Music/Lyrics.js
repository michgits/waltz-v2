const lyricsfinder = require('lyrics-finder');
const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = { 
    name: ["music", "lyrics"],
    description: "display lyrics of a song",
    category: "music",
    options: [
        {
            name: "song",
            description: "the song you want to find lyrics for",
            type: ApplicationCommandOptionType.String,
            required: false,
        }
    ],
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const song = interaction.options.getString("song");

        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.editReply(`there is nothing in the queue right now!`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("you need to be in a same/voice channel.")

        let csong = queue.songs[0];
        if (!song && csong) song = csong.name;

        let lyrics = null;

        try {
            lyrics = await lyricsfinder(song, "");
            if (!lyrics) return interaction.editReply("couldn't find any lyrics for that song!");
        } catch (err) {
            console.log(err);
            interaction.editReply("couldn't find any lyrics for that song!");
        }
        let lyricsEmbed = new EmbedBuilder()
            .setColor(client.color)
            .setTitle(`Lyrics`)
            .setDescription(`**${song}**\n${lyrics}`)
            .setFooter({ text: `Requested by ${interaction.author.username}`})
            .setTimestamp();

        if (lyrics.length > 2048) {
            lyricsEmbed.setDescription("lyrics too long to display!");
        }

        interaction.editReply({ embeds: [lyricsEmbed] }).then(n => {
            var total = queue.songs[0].duration * 1000;
            var current = queue.currentTime * 1000;
            let time = total - current;
            setTimeout(() => { 
                msg.delete(); 
            }, time);
        });
    }
};