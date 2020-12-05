const { inspect } = require("util");

const baseCmd = require("../../../Structors/Command");

module.exports = class extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "view-case",
            alli: ["viewcase"],
            category: "Moderation",
            description: "Allows you to see a case",
            usage: "view-case <id>",
            cooldown: 3000,
            mPerms: ["manageMessages"]
        })
    }

    async run(msg, args, data){
        
        if(!args[0]) return msg.reply("Please provide a case ID.");

        let foundCase = data.guild.cases.find(x => x.id == args[0]);
        if(!foundCase) return msg.reply(`**${args[0]}** is not a valid case ID.`);
        
        msg.channel.send({
            content: `Case #${foundCase.id}`,
            embed: {
                title: `User ID: ${foundCase.userID}`,
                description: `<@!${foundCase.userID}>`,
                fields: [
                    {
                        name: '__***Action***__',
                        value: foundCase.action || "Not provided",
                    },
                    {
                        name: '__***Reason***__',
                        value: foundCase.reason
                    }
                ],
                color: this.bot.constants.Colors.main
            }
        })

    }
}