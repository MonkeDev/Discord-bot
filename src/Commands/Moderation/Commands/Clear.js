const { inspect } = require("util");

const baseCmd = require("../../../Structors/Command");

module.exports = class Help extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "clear",
            category: "Moderation",
            description: "Mass deletes messages in a channel",
            usage: "clear <amout> [filter]",
            cooldown: 5000,
            bPerms: ["manageMessages"], 
            mPerms: ["manageMessages"]
        })
    }

    async run(msg, args, data){
        //purge(limit, filter, before, after, reason)

        
        
        
    }
}