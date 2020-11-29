const baseCmd = require("../../../Structors/Command");

module.exports = class Help extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "profile",
            dms: true,
            category: "Profile",
            description: "See your profile",
            usage: "profile [user]",
            cooldown: 1
        })
    }

    async run(msg, args, data){

        let embed = {
            author: { 
                name: msg.member.activeName,
                icon_url: msg.author.avatarURL
            },
            color: data.author.profile.embedColor,
            fields: []
        }
        
        msg.channel.send({embed: embed})
    }
}