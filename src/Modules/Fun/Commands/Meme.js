const prettyMs = require("pretty-ms");

const baseCmd = require("../../../Structors/Command");
module.exports = class Help extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "meme",
            dms: true,
            category: "Fun",
            description: "Sends a random meme from reddit",
            usage: "meme"
        })
    }

    async run(msg, args, data){

        let sub = this.bot.getRandomArrayElement(['meme', 'memes', 'dankmemes', 'dankmeme'])
        console.log(sub)
        
    }
}