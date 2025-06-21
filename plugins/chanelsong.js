const { cmd, commands } = require('../lib/command');
const yts = require('yt-search');
const ddownr = require('denethdev-ytmp3');

// Function to extract the video ID from youtu.be or YouTube links
function extractYouTubeId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|playlist\?list=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Function to convert any YouTube URL to a full YouTube watch URL
function convertYouTubeLink(q) {
    const videoId = extractYouTubeId(q);
    if (videoId) {
        return `https://www.youtube.com/watch?v=${videoId}`;
    }
    return q;
}

cmd({
    pattern: "csong",
    alias: ["play4"],
    desc: "To download songs as voice notes.",
    react: "🎵",
    category: "download",
    use: ".csong <query>",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("*`Need YT_URL or Title`*");

        // Convert YouTube link if necessary
        q = convertYouTubeLink(q);

        // Search for the video
        const search = await yts(q);
        const data = search.videos[0];
        if (!data) return reply("*`No results found`*");

        const url = data.url;

        // Send initial message with video details
        let desc = `
🎶 *Title:* ${data.title} 🎧

🌐 *Duration:* ${data.timestamp}
📩 *Uploaded On:* ${data.ago}

> MITZI MD
`;
        await conn.sendMessage(from, {
            image: { url: data.thumbnail },
            caption: desc,
            contextInfo: {
                mentionedJid: ['-----'],
                groupMentions: [],
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '---',
                    newsletterName: "MITZI MD",
                    serverMessageId: 999
                }
            }
        }, { quoted: mek });

        // Download the audio as MP3
        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
        const result = await ddownr.download(url, 'mp3');
        const downloadLink = result.downloadUrl;

        // Send the audio as a voice note (PTT)
        await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
        await conn.sendMessage(from, {
            audio: { url: downloadLink },
            mimetype: "audio/mpeg",
            ptt: true
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply("*`Error occurred while downloading`*");
    }
});