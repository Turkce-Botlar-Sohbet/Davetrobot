const Chat = process.env.CHAT_ID.split(';');

module.exports = async (ctx) => {
    if (ctx.chat.type !== 'private') return null;
    try {
        const user = await ctx.telegram.getChatMember(Chat[0], ctx.chat.id)
        if (user.status === 'kicked') {
            await ctx.replyWithHTML(process.env.BAN_MESSAGE)
        } else {
            for (let i in Chat) {
                await ctx.telegram.getChat(Chat[i]).then(async function (result) {
                const chatLink = await ctx.telegram.exportChatInviteLink(Chat[i]);
                await ctx.replyWithHTML(process.env.START_MESSAGE, {
                     reply_markup: {
                        inline_keyboard: [[
                            {
                                text: `${result.title}`,
                                url: `${chatLink}`
                            }
                        ]]
                      }
                   })
                })
              }

         }

    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

