## 📑 features
- [x] music system
- [x] filters system
- [x] autocomplete (play, playskip, playtop)
- [x] song request channel
- [x] context message menu
- [x] message button
- [x] database (json)
- [x] easy to use

## 🎶 Support Source
- [x] youtube
- [x] soundcloud
- [x] spotify

## 🛑 requirements

node.js **[Download](https://nodejs.org/dist/v17.0.1/node-v17.0.1-x64.msi)**

discord bot token **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**

## 💌 installation

```
git clone https://github.com/michgits/waltz-v2
cd waltz-v2
npm install
```
after installation finishes you can use `node .` to start the bot. or `run start.bat`

## 📚 configuration

copy or rename `.env.example` to `.env` and fill out the values:

```.env
TOKEN=REPLACE_HERE
OWNER_ID=REPLACE_HERE
EMBED_COLOR=#000001
```

## 📄 features & commands

> note: the default prefix is '/'

💬 **Context Menu**
- Play (Right-Click & Apps > Context | Play) 
- Skip (Right-Click & Apps > Context | Skip) 
- Stop (Right-Click & Apps > Context | Stop) 
- Shuffle (Right-Click & Apps > Context | Shuffle) 
- Loop (Right-Click & Apps > Context | Loop) 

🎶 **Music Commands!** 
- Play (/play [song/url])
- Nowplaying (/music nowplaying)
- Queue (/music queue [page])
- Repeat (/music loop)
- Loopqueue (/music loopqueue)
- Shuffle (/music shuffle)
- Volume control (/music volume [10 - 100])
- Pause (/music pause)
- Resume (/music resume)
- Skip (/music skip)
- Skipto (/music skipto [position])
- ClearQueue (/music clearqueue)
- Join (/music join)
- Leave (/music leave)
- Forward (/music forward [second])
- Seek (/music seek [second])
- Rewind (/music rewind [second])
- Replay (/music replay)
- 247 (/music 247)
- Previous (/music previous)
- Autoplay (/music autoplay)
- Move (/music move [song] [position])
- Remove (/music remove [song])
- PlaySkip (/music playskip [song/url])
- PlayTop (/music playtop [song/url])

⏺ **Filter Commands!**
- Vaporwave (/filter vaporwave)
- Earwax (/filter earwax)
- Nightcore (/filter nightcore)
- 3d (/filter 3d)
- Echo (/filter echo)
- Flanger (/filter flanger)
- Gate (/filter gate)
- Haas (/filter hass)
- Karaoke (/filter karaoke)
- Mcopand (/filter mcopand)
- Phaser (/filter phaser)
- Reverse (/filter reverse)
- Surround (/filter surround)
- Tremolo (/filter tremolo)
- Bassboost (/filter bassboost)
- Earrape (/filter earrape)
- Custom (/filter custom [args])
- Reset (/filter reset)

📑 **Utilities Commands!**
- Help (/help)
- Invite (/utilities invite)
- Restart (/utilities restart)
- Setup (/utilities setup)
