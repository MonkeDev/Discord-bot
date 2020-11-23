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