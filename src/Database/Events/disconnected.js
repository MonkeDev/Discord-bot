const mongo = require('mongoose');
module.exports = class{
    constructor(bot){
        this.bot = bot;
    }

    async run(){
        this.bot.disconnect();
        console.log("Mongo is now disconnected");
    }
}