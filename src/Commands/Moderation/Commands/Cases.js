const { inspect } = require("util");


module.exports = class Help extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "cases",
            category: "Moderation",
            description: "Allows you to see all cases for a user.",
            usage: "cases <user>",
            cooldown: 3000,
        })
    }

    async run(msg, args, data){
        
        let member = msg.mentions[0] || msg.channel.guild.members.get(args[0]) || msg.member;

        let filteredCases = data.guild.cases.filter(x => x.userID == member.id);
        if(filteredCases.length == 0) return msg.reply(`${member.tag} has no cases!`);
        let caseNumberArray = [];
        for(let i = 0; i < filteredCases.length; i++){
            caseNumberArray.push(filteredCases[i].id);
        }
        msg.channel.send({embed: {
            color: this.bot.constants.Colors.main,
            title: `Case id(s) for ${member.tag}`,
            description: `\`${caseNumberArray.join("`, `")}\``
        }})


    }
}