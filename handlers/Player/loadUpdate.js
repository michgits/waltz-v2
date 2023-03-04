const { EmbedBuilder } = require("discord.js");
const { Database } = require("st.db");

const db = new Database("./settings/models/setup.json", { databaseInObject: true });

module.exports = async (client) => {

    client.UpdateQueueMsg = async function (queue) {
        const CheckDB = await db.has(queue.textChannel.guild.id);
        if(!CheckDB) return;

        const data = await db.get(queue.textChannel.guild.id);
        if (data.setup_enable === false) return;

        const channel = await client.channels.cache.get(data.setup_ch);
        if (!channel) return;

        const playMsg = await channel.messages.fetch(data.setup_msg, { cache: false, force: true });
        if (!playMsg) return;

        const songStrings = [];
        const queuedSongs = queue.songs.map((song, i) => `*\`${i + 1} • ${song.name} • [${song.formattedDuration}]\`* • \`${song.user.tag}\``);

        songStrings.push(...queuedSongs);

        const Str = songStrings.slice(0, 10).join('\n');

        const cSong = queue.songs[0];

        const played = queue.playing ? `starting playing...` : `song paused...`;

        const embed = new EmbedBuilder()
            .setAuthor({ name: `${played}`, iconURL: "https://cdn.discordapp.com/emojis/741605543046807626.gif" })
            .setDescription(`[${cSong.name}](${cSong.url}) \`[${cSong.formattedDuration}]\` • ${cSong.user}`) // [${cSong.title}](${cSong.uri}) \`[${formatDuration(cSong.duration)}]\` • ${cSong.requester}
            .setColor(client.color)
            .setImage(`https://img.youtube.com/vi/${cSong.id}/sddefault.jpg`)
            .setFooter({ text: `${queue.songs.length} • song's in queue | volume • ${queue.volume}% | ${queue.formattedDuration} • total duration` }) //${queue.queue.length} • Song's in Queue | Volume • ${queue.volume}% | ${qDuration} • Total Duration

        return playMsg.edit({ 
            content: `**__queue list:__**\n${Str == '' ? `join a voice channel and queue songs by name or url in here.` : '\n' + Str}`, 
            embeds: [embed],
            components: [client.enSwitch, client.enSwitch2] 
        }).catch((e) => {});
    };

    client.UpdateMusic = async function (queue) {
        const CheckDB = await db.has(queue.textChannel.guild.id);
        if(!CheckDB) return;

        const data = await db.get(queue.textChannel.guild.id);

        if (data.setup_enable === false) return;

        const channel = await client.channels.cache.get(data.setup_ch);
        if (!channel) return;

        const playMsg = await channel.messages.fetch(data.setup_msg, { cache: false, force: true });
        if (!playMsg) return;

        const queueMsg = `**__queue list:__**\njoin a voice channel and queue songs by name or url in here.`;

        const playEmbed = new EmbedBuilder()
          .setColor(client.color)
          .setAuthor({ name: `no song playing currently.` })
          .setImage(`https://us-east-1.tixte.net/uploads/michu.needs.rest/bg.jpg`)
          .setDescription(`>>> [invite](https://discord.com/api/oauth2/authorize?client_id=1076044895061561424&permissions=8&scope=bot)`)
          .setFooter({ text: `prefix is: /` });

        return playMsg.edit({ 
            content: `${queueMsg}`, 
            embeds: [playEmbed], 
            components: [client.diSwitch, client.diSwitch2] 
        }).catch((e) => {});
    };
};