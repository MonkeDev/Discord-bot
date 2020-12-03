const { inspect } = require("util");

const baseCmd = require("../../../Structors/Command");

module.exports = class Help extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "remove-case",
            alli: ["removecase"],
            category: "Moderation",
            description: "Allows you to remove a case from a user.",
            usage: "remove-case <id>",
            cooldown: 5000,
            mPerms: ["manageMessages"]
        })
    }

    async run(msg, args, data){
        
        if(!args[0]) return msg.reply("Please provide a case ID.");

        let foundCase = data.guild.cases.find(x => x.id == args[0]);
        if(!foundCase) return msg.reply(`**${args[0]}** is not a valid case ID.`);
        
        data.guild.cases = data.guild.cases.filter(x => x.id != args[0]);
        await this.bot.updateGuildDataCache(data.guild.id, data.guild);

        msg.channel.sendGreenEmbed(`Case **${args[0]}** from <@!${foundCase.userID}> has been removed!`);
        

    }
}