const prettyMs = require("pretty-ms");
const baseCmd = require("../../../Structors/Command");
module.exports = class Help extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "userinfo",
            alli: ["memberinfo", "user", "member"],
            category: "Misc",
            description: "Give you some info on a user/member",
            usage: "userinfo [user]"
        })
    }

    async run(msg, args, data){

        let member = await msg.channel.guild.members.get( msg.mentions[0] ? msg.mentions[0].id : args[0] );
        if(!member){
            let restUser;
            if(args[0] && !isNaN(args[0])){
                restUser = await this.bot.getRESTUser(args[0]);
            }
            if(restUser){
                member = restUser;
                member.isRestUser = true;
            }
            
        }
        if(!member) member = msg.member;



        let toSend = {
            content: `Info on ${member.tag}`,
            embed: {
                color: this.bot.constants.Colors.main,
                author: {
                    name: member.tag,
                    icon_url: member.avatarURL
                },
                description: `<@!${member.id}>, ${member.id}`,
                fields: []
            }

        }

        toSend.embed.fields.push({name: `Created`, value: prettyMs(Date.now() - member.createdAt)});
        if(!member.isRestUser){

            let perms = "";
            Object.keys(member.permissions.json).forEach(perm => {
                perms += ", " + perm
            })

            toSend.embed.fields.push({name: 'Joined', value: prettyMs(Date.now() - member.joinedAt)});
            toSend.embed.fields.push({name: 'Highest role', value: `<@&${member.highestRole.id}>`});
            toSend.embed.fields.push({name: 'Permissions', value: `${member.permissions.json.administrator ? "Administrator" : perms.slice(2)}`})
        }



        msg.channel.send(toSend);

    

        
    }
}