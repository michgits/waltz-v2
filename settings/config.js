require("dotenv").config();

module.exports = {
    TOKEN: process.env.TOKEN || "",  // your bot token
    OWNER_ID: process.env.OWNER_ID || "", // your client id
    EMBED_COLOR: process.env.EMBED_COLOR || "#CFD5EA", // embed message color

    // default autocomplete search
    SEARCH_DEFAULT: ["rap", "hip hop", "lo fi"],
    // leave voice empty
    LEAVE_EMPTY: parseInt(process.env.LEAVE_EMPTY || "120000"), // 1000 = 1 sec

    // spotify support playlist more 100+ tracks || false = default || can get from here: https://developer.spotify.com/dashboard/applications
    SPOTIFY_TRACKS: parseBoolean(process.env.SPOTIFY_TRACKS || true),
    SPOTIFY_ID: process.env.SPOTIFY_ID || "",
    SPOTIFY_SECRET: process.env.SPOTIFY_SECRET ||""
}

function parseBoolean(ask) {
    if (typeof (ask) === 'string') {
        ask = ask.trim().toLowerCase();
    }
    switch (ask) {
        case true:
        case "true":
            return true;
        default:
            return false;
    }
}