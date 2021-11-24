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
                     const invite = await ctx.telegram.createChatInviteLink(a, { creates_join_request: true, expire_date: date })
                     return invite.invite_link
                }))

                let getChatTitle = await Promise.all(Chat.map(async (a, i) => {
                    const getChat = await ctx.telegram.getChat(a)
                    return getChat.title
                }))

                i = 0
                await ctx.replyWithHTML(
                    process.env.START_MESSAGE,
                    Markup.inlineKeyboard(`${chatLink}`.match(/(?:(?:https?):\/\/)?[\w/\-?=%.]+\.[\w/\-\+&?=%.]+/g).map(x => [Markup.button.url(`${getChatTitle[i++]}`, x)])))
            }

        } catch (error) {
            ctx.reply(`${error}`);
        }
    }
};
