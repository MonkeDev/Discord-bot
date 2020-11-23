const baseCmd = require("../../../Structors/Command");
module.exports = class Help extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "help",
            dms: true
        })
    }

    async run(msg){
        msg.channel.send("hello")
    }
}
/*
module.exports = class{
    constructor(bot){
        this.bot = bot;

        this.name = "help";
        this.alli = [];

        this.dms = true;

        this.helpEmbed = {
            title: 'Help command'
        }
    }

    async run(msg){
        msg.channel.send("hello")
    }

}
*/