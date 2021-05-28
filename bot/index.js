require('dotenv').config({path: './.env'});;
const bot = require('./bot');
const {
    handleGetLink
} = require('../handlers');

bot.start(handleGetLink);


