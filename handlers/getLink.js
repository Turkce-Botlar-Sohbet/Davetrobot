module.exports = async (ctx) => {
    if (ctx.chat.type !== 'private') return null;
    try {
        const user = await ctx.telegram.getChatMember(process.env.CHAT_ID, ctx.chat.id)
        if (user.status === 'kicked') {
            await ctx.replyWithHTML(process.env.BAN_MESSAGE)
        } else {
            const chatLink = await ctx.telegram.exportChatInviteLink(process.env.CHAT_ID);
            await ctx.replyWithHTML(process.env.START_MESSAGE, {
                reply_to_message_id: ctx.message.message_id, reply_markup: {
                    inline_keyboard: [[
                        {
                            text: process.env.BUTTON_MESSAGE,
                            url: `${chatLink}`
                        }
                    ]]
                }
            });
        }

    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

