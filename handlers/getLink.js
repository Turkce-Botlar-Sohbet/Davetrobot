const Chat = process.env.CHAT_ID.split(';');
const { Markup } = require('telegraf')
const AntiFlood = require('../utils/antiflood.js')
const af = new AntiFlood()

module.exports = async (ctx) => {
    if (!af.isFlooding(ctx.from.id)) {
        if (ctx.chat.type !== 'private') return null;
        try {
            const user = await ctx.telegram.getChatMember(Chat[0], ctx.chat.id)
            if (user.status === 'kicked') {
                await ctx.replyWithHTML(process.env.BAN_MESSAGE)
            } else {
                let date = ctx.message.date + 60
                let chatLink = await Promise.all(Chat.map(async (a, i) => {
                    return ctx.telegram.createChatInviteLink(a, { creates_join_request: true, expire_date: date })
                }))

                for (let i of chatLink) {
                    await ctx.replyWithHTML(i.invite_link)
                }
            }

        } catch (error) {
            ctx.reply(`${error}`);
        }
    }
};
