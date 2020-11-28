const prettyMs = require("pretty-ms");

const baseCmd = require("../../../Structors/Command");
module.exports = class Help extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "check-premium",
            alli: ["checkpremium"],
            dms: true,
            category: "Misc",
            description: "Check if you have bought premium for me :heart:",
            usage: "check-premium",
            cooldown: 15000,
            premCooldown: 5000
        })
    }

    async run(msg, args, data){

        if(msg.channel.guild.id != this.bot.constants.Config.supportServerId) return msg.reply("You can only use this command in my support server")

        if(msg.member.roles.includes(this.bot.constants.Config.prem1Role)){
            if(data.author.prem.tier == 1){
                data.author.prem.tier = 2
                msg.reply("Congratulations, You now have premium perks :partying_face:");
            }else{
                msg.reply("you already have premium perks :partying_face: ")
            }
        }else{
            if(data.author.prem.tier == 2){
                data.author.prem.tier = 1;
                msg.reply("Yikes, You just lost premium perks");
                setTimeout(() => {
                    this.bot.updateUserDataCahe(data.author.id, data.author).catch(() => {null});
                }, 5000)
            }else{
                msg.reply("You do not have premium perks");
            }
        }
         
    }
}