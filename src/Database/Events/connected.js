const mongo = require('mongoose');
module.exports = class{
    constructor(bot){
        this.bot = bot;
    }

    async run(){
        this.bot.connect();
        console.log("Mongo is now connected");
    }
}