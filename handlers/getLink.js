const Chat = process.env.CHAT_ID.split(';');
const { Markup } = require('telegraf')


module.exports = async (ctx) => {
    if (ctx.chat.type !== 'private') return null;
    try {
        const user = await ctx.telegram.getChatMember(Chat[0], ctx.chat.id)
        if (user.status === 'kicked') {
            await ctx.replyWithHTML(process.env.BAN_MESSAGE)
        } else {
            
            let chatLink = await Promise.all(Chat.map(async (a, i) => {
                return ctx.telegram.exportChatInviteLink(`${a}`)
            }))
            i = 0
            await ctx.replyWithHTML(
                process.env.START_MESSAGE,
                Markup.inlineKeyboard(`${chatLink}`.match(/(?:(?:https?):\/\/)?[\w/\-?=%.]+\.[\w/\-&?=%.]+/g).map(x => [Markup.button.url('k/g ' + ++i, x)])))
         }

    } catch (error) {
        console.log(`Error: ${error}`);
    }
};
