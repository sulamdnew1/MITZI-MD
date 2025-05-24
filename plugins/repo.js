const fetch = require('node-fetch');
const config = require('../config');    
const { cmd } = require('../command');

cmd({
    pattern: "repo",
    desc: "get bot repo.",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, sender, pushname, reply }) => {
    try {
        const channel = '𝐌𝐈𝐓𝐙𝐈-𝐌𝐃';
        const repolink = `
*😈 : 𝐌𝐈𝐓𝐙𝐈-𝐌𝐃 REPOSTORI*
*╭┈───────────╴╴╴•⟢*
*│https://github.com/sulamdnew1/MITZI-MD*
*╰┈───────────╴╴╴•⟢*
*😈 : 𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋*
*╭┈───────────╴╴╴•⟢*
*│https://whatsapp.com/channel/0029VbABmxmEKyZFaI2KG13x*
*╰┈───────────╴╴╴•⟢*
*😈 : 𝐂𝐎𝐍𝐓𝐀𝐂𝐓*
*╭┈───────────╴╴╴•⟢*
*│wa.me/94726561647*
*╰┈───────────╴╴╴•⟢*

> 𝐏𝙾𝚆𝙴𝚁𝙳 𝐁𝚈 𝐌𝐈𝐓𝐙𝐈-𝐌𝐃
`;

        return await conn.sendMessage(from, { 
            image: { url: "https://i.ibb.co/LhX6KHW7/SulaMd.jpg" },
            caption: repolink,contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363418505945149@newsletter',
                    newsletterName: '𝐌𝐈𝐓𝐙𝐈-𝐌𝐃',
                    serverMessageId: -1
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
