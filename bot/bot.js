const { Telegraf } = require('telegraf')

const BOT_TOKEN     = process.env.BOT_TOKEN || '';
const PORT          = process.env.PORT || 3000;
const URL           = process.env.URL

const bot = new Telegraf(BOT_TOKEN);

// Kodlarda hata çıkarsa bunun sayesinde çalışmaya devam eder.
bot.catch((err) => {
    console.log('Error: ', err)
})

// Botun kullanıcı adını alan bir kod.
bot.telegram.getMe().then(botInfo => {
    bot.options.username = botInfo.username
})

// Heroku sitesinde botunuzun kullanıcı adı gözükür -> kanalbot.herokuapp.com
const cb = function(req, res) {
    res.end(`${bot.options.username}`)
}

if (URL) {
    // Botun Webhook ile çalışmasını sağlar heroku da URL ayarlayın yeterli.
    bot.launch({
        webhook: {
            domain: `${URL}`,
            port: `${PORT}`,
            cb
        }
    }).then(() => {
        console.log(`Bot Start Webhook`)
    })
} else {
    bot.launch().then(() => {
        console.log(`Bot Start Polling => @${bot.botInfo.username}`)
    })
  }

// Bu botumuzu nazikçe durdurmayı etkinleştirir.
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

module.exports = bot;

