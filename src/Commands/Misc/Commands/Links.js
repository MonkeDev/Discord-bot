const prettyMs = require("pretty-ms");

const baseCmd = require("../../../Structors/Command");
module.exports = class extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "links",
            alli: ["invite", "support", "github"],
            dms: true,
            category: "Misc",
            description: "Gives you all of my links",
            usage: "links"
        })
    }

    async run(msg, args, data){

        let embed = {
            color: this.bot.constants.Colors.main,
            title: `Links`,
            fields: [],
        }
        let config = this.bot.constants.Config;

        embed.fields.push({name: 'Support server', value: `[Here](${config.supportServer})`, inline: true});
        embed.fields.push({name: `Invite link`, value: `[Here](${config.inviteLink})`, inline: true});
        embed.fields.push({name: 'GitHub repository', value: `[Here](${config.githubLink})`, inline: true})

        msg.channel.send({embed: embed});
    

        
    }
}